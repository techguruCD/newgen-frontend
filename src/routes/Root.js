import React, { useState } from "react";
import { Layout, Space } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../util/AuthContext";

import {
  FileDoneOutlined,
  PieChartOutlined,
  SettingOutlined,
  SlidersOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
const { SubMenu } = Menu;
const { Header, Content } = Layout;

const HeaderMenu = () => {
  const { token } = useAuth();

  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item>
        <Link to={"/"}>NEXTGEN</Link>
      </Menu.Item>
      {token && (
        <>
          <Menu.Item
            style={{ float: "right", marginLeft: "auto" }}
          >
          </Menu.Item>
          <Menu.Item icon={<PieChartOutlined />}>
            <Link to={"/portfolio"}>Portfolio</Link>
          </Menu.Item>
          <Menu.Item icon={<SlidersOutlined />}>
            <Link to={"/trade"}>Trade</Link>
          </Menu.Item>
          <Menu.Item icon={<PieChartOutlined />}>
            <Link to={"/dashboard"}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item icon={<SettingOutlined />}>
            <Link to={"/watchlists"}>Watchlists</Link>
          </Menu.Item>
        </>
      )}
      <SubMenu
        style={!token && { float: "right", marginLeft: "auto" }}
        icon={<UserOutlined />}
        title={"Profile"}
        key="sub2"
      >
        <Menu.Item key={"profile:1"}>
          <Link to={"/login"}>Login</Link>
        </Menu.Item>
        <Menu.Item key={"profile:2"}>
          <Link to={"/register"}>Register</Link>
        </Menu.Item>
        {token && (
          <Menu.Item key={"profile:3"}>
            <Link to={"/logout"}>Logout</Link>
          </Menu.Item>
        )}
      </SubMenu>
    </Menu>
  );
};
const Root = () => (
  <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
    <Layout>
      <Header>
        <HeaderMenu />
      </Header>
      <Content style={{ backgroundColor: "white" }}>
        <Outlet></Outlet>
      </Content>
      <Footer style={{ backgroundColor: "white", padding: "1em" }}></Footer>
    </Layout>
  </Space>
);

export default Root;
