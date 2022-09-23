import useFetch from "../../hooks/useFetch";
import AppLoader from "../../components/app-loading";
import UserList from "../../components/user-list";

const url = `http://jsonplaceholder.typicode.com/users`;

interface IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const Users = () => {
  const { data, error } = useFetch<IUsers[]>(url);

  if (error) return <p>There is an error.</p>;
  if (!data) return <AppLoader />;
  //   return <p>{data[0].name}</p>;
  return <UserList userData={data} />;
};

export default Users;
