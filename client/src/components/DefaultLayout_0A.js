import React, { useState } from 'react';
import {
  CopyOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import '../resources/layout.css';
import { Link } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" ><h3>Chivo-POS</h3></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: '/home',
              icon: <HomeOutlined />,
              label: <Link to='/home'>Inicio</Link>,
            },
            {
              key: '/bills',
              icon: <CopyOutlined />,
              label: <Link to='/bills'>Facturas</Link>,
            },
            {
              key: '/items',
              icon: <UnorderedListOutlined />,
              label: <Link to='/items'>Productos</Link>,
            },
            {
              key: '/customers',
              icon: <UserOutlined />,
              label: <Link to='/customers'>Clientes</Link>,
            },
            {
              key: '/logout',
              icon: <LogoutOutlined />,
              label: 'Salir',
            },
            // {
            //   key: '2',
            //   icon: <VideoCameraOutlined />,
            //   label: 'nav 2',
            // },
            // {
            //   key: '3',
            //   icon: <UploadOutlined />,
            //   label: 'nav 3',
            // },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            boxShadow: '0 0 3px #ccc',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '10px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 0 3px #ccc',
          }}
        >{children} {/* Aquí se renderizan los children*/}
          
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
