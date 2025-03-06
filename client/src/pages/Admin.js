import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Keyboard from "../components/virtualKeyboard";
import "../resources/VirtualKeyboard.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";

function Admin() {
  const [usersData, setUsersData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const getAllUsers = () => {
    console.log("Fetching all users");
    axios
      .get("/api/users/get-all-users")
      .then((response) => {
        console.log("Users fetched: ", response.data);
        setUsersData(response.data); //Actualizar usersData con los datos recibidos
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { confirm } = Modal;

  const deleteUser = (id) => {
    axios
      .post("/api/users/delete-user", { userId: id })
      .then((response) => {
        message.success(">El usuario se elimino de la base de datos");
        getAllUsers();
      })
      .catch((error) => {
        message.error("No se ejecuto la solicitud");
        console.log(error);
      });
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Desea eliminar el usuario?",
      content: "Esta accion es definitiva.",
      okText: "Si",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteUser(id);
      },
      onCancel() {
        console.log("Funcion Cancelada");
      },
    });
  };

  useEffect(() => {
    getAllUsers();
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
      title: "Nombre",
      dataIndex: "name",
    },

    {
      title: "Alias",
      dataIndex: "alias",
    },

    {
      title: "Password",
      dataIndex: "password",
    },

    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Verificado",
      dataIndex: "verified",
      render: (verified) => (verified ? "Sí" : "No"),
    },

    {
      title: "Accion",
      dataIndex: "id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingUser(record);
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
    if (editingUser === null) {
      axios
        .post("/api/users/add-user", values)
        .then((response) => {
          message.success("Usuario Agregado con Exito");
          setAddEditModalVisibilty(false);
          getAllUsers();
        })
        .catch((error) => {
          message.error("Algo no funciono");
          console.log(error);
        });
    } else {
      axios
        .post("/api/users/edit-user", { ...values, userId: editingUser.id })
        .then((response) => {
          message.success("User edited successfully");
          setEditingUser(null);
          setAddEditModalVisibilty(false);
          getAllUsers();
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
        <h3>Usuarios</h3>
        <Button type="primary" onClick={() => setAddEditModalVisibilty(true)}>
          Agregar
        </Button>
      </div>
      <Table columns={columns} dataSource={usersData} bordered />

      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingUser(null);
            setAddEditModalVisibilty(false);
          }}
          visible={addEditModalVisibilty}
          title={`${
            editingUser !== null ? "Editar Usuario" : "Agregar nuevo Usuario"
          }`}
          footer={false}
          style={{ right: "5%", position: "absolute"}} // Mueve el modal hacia la derecha
        >
          <Form
            initialValues={editingUser}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Usuario"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el nombre del Usuario",
                },
              ]}
            >
              <Input className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="alias"
              label="Alias"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa Alias del Usuario",
                },
              ]}
            >
              <Input className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Por favor, ingresa el password" },
              ]}
            >
              <Input className="use-keyboard-input" />
            </Form.Item>

            <Form.Item name="status" label="Status">
              <Select>
                <Select.Option value="cajero">Cajero</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="verified" label="Verificado">
              <Select>
                <Select.Option value={true}>Si</Select.Option>
                <Select.Option value={false}>No</Select.Option>
              </Select>
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

export default Admin;
