import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Keyboard from "../components/virtualKeyboard";
import KeyboardNum from "../components/virtualNumericK";
import "../resources/VirtualKeyboard_Left.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";

function Business() {
  const [businessData, setBusinessData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const getAllBusiness = () => {
    axios
      .get("/api/business/get-all-business")
      .then((response) => {
        console.log("Business fetched: ", response.data);
        setBusinessData(response.data); //Actualizar categoriesData con los datos recibidos
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { confirm } = Modal;

  useEffect(() => {
    getAllBusiness();
  }, []);

  useEffect(() => {
    // Inicializa el teclado virtual al cargar el componente
    Keyboard.init();
    // Limpia el teclado al desmontar el componente
    return () => {
      Keyboard.close(); // Usa la función close para desmontar el teclado virtual;
      console.log("Teclado reinicializado");
    };
  }, []);

  useEffect(() => {
    // Inicializa el teclado virtual al cargar el componente
    KeyboardNum.init();
    // Limpia el teclado al desmontar el componente
    return () => {
      KeyboardNum.close(); // Usa la función close para desmontar el teclado virtual;
      console.log("Teclado reinicializado");
    };
  }, []);

  // Efecto para reinicializar el teclado cada vez que se abra el modal
  useEffect(() => {
    if (addEditModalVisibilty) {
      setTimeout(() => {
        Keyboard.init();
        KeyboardNum.init();
      }, 100); // Agrega un pequeño retraso para asegurar que el modal esté completamente abierto
    }
  }, [addEditModalVisibilty]);

  
  const columns = [
    
    {
      title: "Nombre",
      dataIndex: "name",
    },
    {
        title: "NIT",
        dataIndex: "nit",
    },
    {
        title: "NRC",
        dataIndex: "nrc",
    },
    {
        title: "Sucursal",
        dataIndex: "sucursal",
    },
    {
        title: "Actividad",
        dataIndex: "aeconomic",
    },
    {
        title: "Dirección",
        dataIndex: "address",
    },
    
    {
      title: "Accion",
      dataIndex: "id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingBusiness(record);
              setAddEditModalVisibilty(true);
            }}
          />
          {/*,
           <DeleteOutlined
            className="mx-2"
            onClick={() => showDeleteConfirm(id)}
          /> */}
        </div>
      ),
    },
  ];

  const onFinish = (values) => {
    if (editingBusiness === null) {
      axios
        .post("/api/business/add-business", values)
        .then((response) => {
          message.success("El negocio fue agregado con exito");
          setAddEditModalVisibilty(false);
          getAllBusiness();
        })
        .catch((error) => {
          message.error("Algo no funciono");
          console.log(error);
        });
    } else {
      axios
        .post("/api/business/edit-business", {
          ...values,
          businessId: editingBusiness.id,
        })
        .then((response) => {
          message.success("El negocio se Edito correctamente");
          setEditingBusiness(null);
          setAddEditModalVisibilty(false);
          getAllBusiness();
        })
        .catch((error) => {
          message.error("Algo no funciono");
          console.log(error);
        });
    }
  };

  
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Mi Negocio</h3>
        <Button type="primary" 
            onClick={() => setAddEditModalVisibilty(true)} 
            disabled={businessData.length > 0} // Deshabilitar si ya existe un negocio
        >
            
          Agregar
        </Button>
      </div>
      <Table columns={columns} dataSource={businessData} bordered />

      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingBusiness(null);
            setAddEditModalVisibilty(false);
          }}
          open={addEditModalVisibilty}
          style={{ top: "5%", right: "5%", position: "absolute"}} // Mueve el modal hacia la derecha
          title={`${
            editingBusiness !== null
              ? "Editar Negocio"
              : "Agregar nuevo Negocio"
          }`}
          footer={false}
        >
          <Form
            initialValues={editingBusiness}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Negocio"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el nombre del Negocio",
                },
              ]}
            >
              <Input className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="nit"
              label="NIT"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el NIT",
                },
                
              ]}
            >
              <Input className="use-keyboard-numeric" maxLength={14} placeholder="Ingresa 14 números" />
              
            </Form.Item>

            <Form.Item
              name="nrc"
              label="NRC"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el NRC",
                },
               
              ]}
            >
              <Input className="use-keyboard-numeric" maxLength={4} placeholder="Ingresa 4 números" />
              
            </Form.Item>

            <Form.Item
              name="sucursal"
              label="Sucursal"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el nombre del la sucursal",
                },
              ]}
            >
              <Input className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="aeconomic"
              label="Actividad"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa la actividad economica",
                },
              ]}
            >
              <Input className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Dirección"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa la dirección del Negocio",
                },
              ]}
            >
              <Input className="use-keyboard-input" />
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                GUARDAR
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Business;
