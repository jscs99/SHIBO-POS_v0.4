import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Menu, Button, theme } from "antd";
import {
  CopyOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  AuditOutlined,
  ContainerFilled,
  SettingFilled,
  ToolOutlined,
  CopyFilled,
  VerifiedOutlined,
} from "@ant-design/icons";
import "../resources/layout.css";
// import Keyboard from "../components/virtualKeyboard4";
// import "../resources/VirtualKeyboard.css"; // CSS personalizado para el teclado

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { cartItems, loading } = useSelector((state) => state.root);
  const navigate = useNavigate();
  const userStatus = localStorage.getItem('status');
  const userAlias = localStorage.getItem('alias');


  // const colorBgContainer = "#fff"; // Define el color de fondo del contenedor
  // const borderRadiusLG = "10px";
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // useEffect(() => {
  //   Keyboard.init(); // Inicializa el teclado virtual
  //   // Limpia el teclado al desmontar el componente
  //   return () => {
  //     Keyboard.elements.main = null;
  //     Keyboard.elements.keysContainer = null;
  //     Keyboard.elements.keys = [];
  //     console.log("Teclado reinicializado");
  //   };
  // }, []);

  // const toggle = () => {
  //   setCollapsed(!collapsed);
  // };

  const handleLogout = async () => {
    try {
      // Hacer backup antes de cerrar sesión
      console.log("Cerrando sesión...");
      const response = await fetch("http://localhost:5000/api/backup", { method: "POST" });
      const result = await response.json();
  
      if (response.ok) {
        console.log("Backup realizado con éxito:", result.file);
      } else {
        console.error("Error en el backup:", result.message);
      }
    } catch (error) {
      console.error("Error al ejecutar el backup:", error);
    }
  
    // Ejecutar la lógica de logout
    console.log("La sesión se ha cerrado!");
    localStorage.removeItem("alias");
    navigate("/login");
  };

  // Calcular el total de ítems en el carrito
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const menuItems=[
    {
      key: "/home",
      icon: <HomeOutlined />,
      label: <Link to="/home">Inicio</Link>,
    },
    {
      key: "/cart",
      icon: <ShoppingCartOutlined />,
      label: <Link to="/cart">Carretilla</Link>,
    },
    {
      key: "/bills",
      icon: <CopyOutlined />,
      label: <Link to="/bills">Facturas</Link>,
    },
    {
      key: "",
      icon: <VerifiedOutlined />,
      label: <Link to="">DTE</Link>,
    },
    
    {
      key: "/customers",
      icon: <UserOutlined />,
      label: <Link to="/customers">Clientes</Link>,
    }
  ]
  
  // Condicionalmente agregar los ítem de Admin, Productos, Categorias y Configuración
  if (userStatus === 'admin') {
    menuItems.push({
      key: "/admin",
      icon: <AuditOutlined />,
      label: <Link to="/admin">Admin</Link>,
    },
    {
      key: "/import",
      icon: <ToolOutlined />,
      label: <Link to="/import">Herramientas</Link>,
  },
    {
      key: "/items",
      icon: <UnorderedListOutlined />,
      label: <Link to="/items">Productos</Link>,
    },
    {
      key: "/categories",
      icon: <ContainerFilled />,
      label: <Link to="/categories">Categorias</Link>,
    },
    {
      key: "/setup",
      icon: <SettingFilled />,
      label: <Link to="/setup">Configuracion</Link>,
    },
        
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Salir",
      onClick: handleLogout,
    }

  );
  };

  // Condicionalmente agregar el item de Salir
  if (userStatus === 'cajero') {
    menuItems.push({
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Salir",
      onClick: handleLogout,
    },
    )
  };


  
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h3>Shibo-POS</h3>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname} items={menuItems}
          
        />
        <div style={{ float:'center', color: 'gray', fontSize: 'medium', margin: '20px', position: 'absolute', bottom: '30px' }}>
           <span>{userStatus}</span> | <span>{userAlias}</span> 
        </div>
        <div style={{ float: 'center', color: '#0887ad', fontSize: 'small', margin: '5px', position: 'absolute', bottom: '10px'}}>
          POS System©. Insert, SA de CV</div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            boxShadow: "0 0 3px #ccc",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            className="cart-count d-flex aling-items-center"
            onClick={() => navigate("/cart")}
          >
            <b>
              <p className="mt-3 mr-5">{totalCartItems}</p>
            </b>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          style={{
            margin: "10px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: "0 0 3px #ccc",
          }}
        >
          {children} {/* Aquí se renderizan los children*/}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
