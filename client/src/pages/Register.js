import React, { useEffect } from 'react'
import { Button, Col, Form, Input, Select, message, Row } from "antd";
import Keyboard from "../components/virtualKeyboard";
import "../resources/VirtualKeyboard.css";
import '../resources/authentication.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
function Register() {
  
  const onFinish=(values)=>{
         
         axios.post('/api/users/register' , values).then((res)=>{
          
           message.success('Registration successfull , please wait for verification')
         }).catch(()=>{
         
           message.error('Something went wrong')
         })
  }

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
            <h3>Register</h3>
            <Form.Item name="name" label="Name">
              <Input className="use-keyboard-input" />
            </Form.Item>
            <Form.Item name="alias" label="Alias">
              <Input className="use-keyboard-input" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type='password' className="use-keyboard-input" />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select>
                  <Select.Option value="admin">Administrador</Select.Option>
                  <Select.Option value="cajero">Cajero</Select.Option>
              </Select>
            </Form.Item>
            
            <div className="d-flex justify-content-between align-items-center">
              <Link to='/login'>Already Registed ? Click Here To Login</Link>
              <Button htmlType="submit" type="primary">
                Register
              </Button>
            </div>
          </Form>
          </Col>
        </Row>
    </div>
  )
}

export default Register