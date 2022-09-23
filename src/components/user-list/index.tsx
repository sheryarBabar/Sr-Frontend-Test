import { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Rate, Typography } from "antd";

interface IEditableCell {
  editing: boolean;
  dataIndex: number;
  title: string;
  inputType: string;
  children: JSX.Element;
  restProps: any;
}
interface IUserList {
  userData: any;
}
interface IRecord {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  ratings: number;
}
const originData: any = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({ editing, dataIndex, title, inputType, children, ...restProps }: IEditableCell) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UserList = ({ userData }: IUserList) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(
    userData.map((el: any) => {
      return { ...el, ratings: 0 };
    })
  );
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: IRecord) => record.id === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: string) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "20%",
      editable: true,
    },
    {
      title: "email",
      dataIndex: "email",
      width: "15%",
      editable: true,
    },
    {
      title: "phone",
      dataIndex: "phone",
      width: "20%",
      editable: true,
    },
    {
      title: "website",
      dataIndex: "website",
      width: "15%",
      editable: true,
    },
    {
      title: "ratings",
      dataIndex: "ratings",
      width: "40%",
      editable: true,
      render: (_: any, record: IRecord) => {
        console.log(record.ratings);
        return <Rate disabled defaultValue={record.ratings} />;
      },
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: number, record: IRecord) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)} className='mr-2'>
              Save
            </Typography.Link>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <Typography.Link className='hover:cursor-pointer'>Cancel</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className='p-8'>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName='editable-row'
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default UserList;
