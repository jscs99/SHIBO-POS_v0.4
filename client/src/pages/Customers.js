import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Keyboard from "../components/virtualKeyboard";
import "../resources/VirtualKeyboard.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";

function Customers() {
  const [customersData, setCustomersData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const getAllCustomers = () => {
    axios
      .get("/api/customers/get-all-customers")
      .then((response) => {
        console.log("Customers fetched: ", response.data);
        setCustomersData(response.data); //Actualizar categoriesData con los datos recibidos
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { confirm } = Modal;

  const deleteCustomer = (customerCode) => {
    axios
      .post("/api/customers/delete-customer", { customerId: customerCode})
      .then((response) => {
        message.success("El cliente se elimino de la base de datos");
        getAllCustomers();
      })
      .catch((error) => {
        message.error("No se ejecuto la solicitud");
        console.log(error);
      });
  };
  const showDeleteConfirm = (customerCode) => {
    confirm({
      title: "Desea eliminar el cliente?",
      content: "Esta accion es definitiva.",
      okText: "Si",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteCustomer(customerCode);
      },
      onCancel() {
        console.log("Funcion Cancelada");
      },
    });
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    // Inicializa el teclado virtual al cargar el componente
    Keyboard.init();
    // Limpia el teclado al desmontar el componente
    return () => {
      Keyboard.close();
      console.log("Teclado reinicializado");
    };
  }, []);

  // Efecto para reinicializar el teclado cada vez que se abra el modal
  useEffect(() => {
    if (addEditModalVisibilty) {
      setTimeout(() => {
        Keyboard.init();
      }, 100); // Agrega un pequeño retraso para asegurar que el modal esté completamente abierto
    }
  }, [addEditModalVisibilty]);

  const columns = [
    {
      title: "Codigo",
      dataIndex: "customerCode",
    },
    {
      title: "Nombre",
      dataIndex: "customerName",
    },
    {
      title: "NIT",
      dataIndex: "customerNit",
    },
    {
      title: "NRC",
      dataIndex: "customerNrc",
    },
    {
      title: "Documento",
      dataIndex: "customerDoc",
    },
    {
      title: "Doc. número",
      dataIndex: "customerDocNumber",
    },
    {
      title: "Actividad",
      dataIndex: "customerAeconomic",
    },
    {
      title: "Dirección",
      dataIndex: "customerAddress",
    },
    {
      title: "Correo",
      dataIndex: "customerEmail",
    },
    {
      title: "Teléfono",
      dataIndex: "customerPhone",
    },
    {
      title: "Accion",
      dataIndex: "customerCode",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingCustomer(record);
              setAddEditModalVisibilty(true);
            }}
          />
          ,
          <DeleteOutlined
            className="mx-2"
            onClick={() => showDeleteConfirm(id)}
          />
        </div>
      ),
    },
  ];

  const onFinish = (values) => {
    if (editingCustomer === null) {
      axios
        .post("/api/customers/add-customer", values)
        .then((response) => {
          message.success("El cliente fue agregado con exito");
          setAddEditModalVisibilty(false);
          getAllCustomers();
        })
        .catch((error) => {
          message.error("Algo no funciono");
          console.log(error);
        });
    } else {
      axios
        .post("/api/customers/edit-customer", {
          ...values,
          customerId: editingCustomer.customerCode,
        })
        .then((response) => {
          message.success("El cliente se Edito correctamente");
          setEditingCustomer(null);
          setAddEditModalVisibilty(false);
          getAllCustomers();
        })
        .catch((error) => {
          message.error("Something went wrong");
          console.log(error);
        });
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Clientes</h3>
        <Button type="primary" onClick={() => setAddEditModalVisibilty(true)}>
          Agregar
        </Button>
      </div>
      <Table columns={columns} dataSource={customersData} bordered />

      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingCustomer(null);
            setAddEditModalVisibilty(false);
          }}
          open={addEditModalVisibilty}
          title={`${
            editingCustomer !== null
              ? "Editar Cliente"
              : "Agregar nuevo Cliente"
          }`}
          footer={false}
          style={{ top: "5%", right: "5%", position: "absolute"}} // Mueve el modal hacia la derecha
          bodyStyle={{ overflowY: "auto", maxHeight: "600px" }} // Agrega la barra de scroll
        >
          <Form
            initialValues={editingCustomer}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="customerName"
              label="Nombre"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el nombre de el cliente",
                },
              ]}
            >
              <Input placeholder="Ingresa el nombre del cliente" className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="customerNit"
              label="NIT"
              rules={[
                {
                  required: false,
                  message: "Por favor, ingresa el NIT",
                },
              ]}
            >
              <Input placeholder="Ingresa el NIT del cliente" className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="customerNrc"
              label="NRC"
              rules={[
                {
                  required: false,
                  message: "Por favor, ingresa el NRC",
                },
              ]}
            >
              <Input placeholder="Ingresa el NRC del cliente" className="use-keyboard-input" />
            </Form.Item>

            <Form.Item name="customerDoc" label="Tipo de Documento" required="false">
              <Select>
                <Select.Option value="DUI">DUI</Select.Option>
                <Select.Option value="Pasaporte">Pasaporte</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="customerDocNumber"
              label="Número de Documento"
              rules={[
                {
                  required: false,
                  message: "Por favor, ingresa el número de documento",
                },
              ]}
            >
              <Input placeholder="Ingresa el número de documento" className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="customerAeconomic"
              label="Actividad económica"
              rules={[
                {
                  required: false,
                  message: "Por favor, ingresa la actividad económica",
                },
              ]}
            >
              <Input placeholder="Ingresa la actividad económica" className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="customerAddress"
              label="Dirección"
              rules={[
                {
                  required: false,
                  message: "Por favor, ingresa la dirección",
                },
              ]}
            >
              <Input placeholder="Ingresa la dirección" className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="customerEmail"
              label="Correo"
              rules={[
                {
                  required: false,
                  message: "Por favor, ingresa el correo electrónico",
                },
              ]}
            >
              <Input placeholder="Ingresa el correo electrónico" className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="customerPhone"
              label="Teléfono"
              rules={[
                {
                  required: false,
                  message: "Por favor, ingresa el número de teléfono",
                },
              ]}
            >
              <Input placeholder="Ingresa el número de teléfono" className="use-keyboard-input" />
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

export default Customers;
