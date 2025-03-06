import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Keyboard from "../components/virtualKeyboard";
import "../resources/VirtualKeyboard.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";

function Categories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const getAllCategories = () => {
    axios
      .get("/api/categories/get-all-categories")
      .then((response) => {
        console.log("Categories fetched: ", response.data);
        setCategoriesData(response.data); //Actualizar categoriesData con los datos recibidos
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { confirm } = Modal;

  const deleteCategory = (id) => {
    axios
      .post("/api/categories/delete-category", { categoryId: id })
      .then((response) => {
        message.success("La categoria se elimino de la base de datos");
        getAllCategories();
      })
      .catch((error) => {
        message.error("No se ejecuto la solicitud");
        console.log(error);
      });
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Desea eliminar la categoria?",
      content: "Esta accion es definitiva.",
      okText: "Si",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteCategory(id);
      },
      onCancel() {
        console.log("Funcion Cancelada");
      },
    });
  };

  useEffect(() => {
    getAllCategories();
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
      title: "NumId",
      dataIndex: "id",
    },
    {
      title: "Nombre",
      dataIndex: "name",
    },
    {
      title: "Imagen",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },
    {
      title: "Accion",
      dataIndex: "id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingCategory(record);
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
    if (editingCategory === null) {
      axios
        .post("/api/categories/add-category", values)
        .then((response) => {
          message.success("La categoria fue agregada con exito");
          setAddEditModalVisibilty(false);
          getAllCategories();
        })
        .catch((error) => {
          message.error("Something went wrong");
          console.log(error);
        });
    } else {
      axios
        .post("/api/categories/edit-category", {
          ...values,
          categoryId: editingCategory.id,
        })
        .then((response) => {
          message.success("La categoria se Edito correctamente");
          setEditingCategory(null);
          setAddEditModalVisibilty(false);
          getAllCategories();
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
        <h3>Categorias</h3>
        <Button type="primary" onClick={() => setAddEditModalVisibilty(true)}>
          Agregar
        </Button>
      </div>
      <Table columns={columns} dataSource={categoriesData} bordered />

      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingCategory(null);
            setAddEditModalVisibilty(false);
          }}
          open={addEditModalVisibilty}
          title={`${
            editingCategory !== null
              ? "Editar Categoria"
              : "Agregar nueva Categoria"
          }`}
          footer={false}
          style={{ left: "15%", position: "absolute"}} // Mueve el modal hacia la derecha
        >
          <Form
            initialValues={editingCategory}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Categoria"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el nombre de la Categoria",
                },
              ]}
            >
              <Input className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="image"
              label="Imagen URL"
              rules={[
                {
                  required: false,
                  message: "Porfavor, ingresa URL de la imagen",
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

export default Categories;
