import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { AppFooter, AppNavBar } from "../components";

const { Content } = Layout;

const AppLayout = () => {
  return (
    <>
      <AppNavBar />
      <Layout>
        <Content>
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </>
  );
};

export default AppLayout;
