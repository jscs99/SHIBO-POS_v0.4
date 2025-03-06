import React, { useEffect } from 'react'
import { Button, Col, Form, Input, message, Row } from "antd";
import Keyboard from "../components/virtualKeyboard";
import "../resources/VirtualKeyboard.css";
import '../resources/authentication.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
function Login() {


  const navigate = useNavigate()
  const onFinish=(values)=>{
    
    axios.post('/api/users/login' , values).then((res)=>{
     
      message.success('Login con Exito!')
      localStorage.setItem('status' , res.data.status);
      localStorage.setItem('alias' , res.data.alias);

      navigate('/home')
    }).catch(()=>{
     
      message.error('Algo no funciono!')
    })
}

useEffect(() => {
    if(localStorage.getItem('status') && localStorage.getItem('alias')) {
    navigate('/home');
    }
}, [navigate])

useEffect(() => { 
  Keyboard.init(); // Inicializa el teclado virtual cuando el componente se monta }
  return () => {
    Keyboard.close(); // Usa la función close para desmontar el teclado virtual;
  };
  }, []);

  return (
    <div className='authentication'>
        <Row>
          <Col lg={8} xs={22}>
          <Form
            layout="vertical"
            onFinish={onFinish}
          >
            <h1><b>Shibo-POS</b></h1>
            <hr />
            <h3>Login</h3>
          
            <Form.Item name="alias" label="Alias" rules={[{ required: true}]}>
              <Input className="use-keyboard-input" placeholder="Ingresa el Alias del usuario" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true}]}>
              <Input type='password' className="use-keyboard-input" placeholder="Ingresa el password" />
            </Form.Item>

           

            <div className="d-flex justify-content-between align-items-center">
              <Link to='/register'>Not Yet Registered ? Click Here To Register</Link>
              <Button htmlType="submit" type="primary">
                Login
              </Button>
            </div>
          </Form>
          </Col>
        </Row>
    </div>
  )
}

export default Login