import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Keyboard from "../components/virtualKeyboard";
import "../resources/VirtualKeyboard.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";

function Items() {
  const [itemsData, setItemsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const getAllItems = () => {
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        console.log("Items fetched: ", response.data);
        setItemsData(response.data); //Actualizar itemsData con los datos recibidos
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllCategories = () => {
    axios
      .get("/api/categories/get-all-categories")
      .then((response) => {
        setCategoriesData(response.data); // Actualizar categoriesData con los datos recibidos
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const { confirm } = Modal;

  const deleteItem = (id) => {
    axios
      .post("/api/items/delete-item", { itemId: id })
      .then((response) => {
        message.success(">El producto se elimino de la base de datos");
        getAllItems();
      })
      .catch((error) => {
        message.error("No se ejecuto la solicitud");
        console.log(error);
      });
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Desea eliminar el producto?",
      content: "Esta accion es definitiva.",
      okText: "Si",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteItem(id);
      },
      onCancel() {
        console.log("Funcion Cancelada");
      },
    });
  };

  useEffect(() => {
    getAllItems();
    getAllCategories();
  }, []);

  useEffect(() => {
    // Inicializa el teclado virtual al cargar el componente
    Keyboard.init();
    // Limpia el teclado al desmontar el componente
    return () => {
      Keyboard.elements.main = null;
      Keyboard.elements.keysContainer = null;
      Keyboard.elements.keys = [];
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
      title: "Imagen",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },

    {
      title: "Precio",
      dataIndex: "price",
    },
    {
      title: "Precio + IVA",
      dataIndex: "priceWIVA" 
    },
    {
      title: "Categoria",
      dataIndex: "category",
    },

    {
      title: "Accion",
      dataIndex: "id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
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
      // Calcular precioConIVA
    const priceWIVA = values.price * 1.13;
    
    // Añadir precioConIVA a los valores
    const updatedValues = {
      ...values,
      priceWIVA,
    };
    if (editingItem === null) {
      axios
        .post("/api/items/add-item", updatedValues)
        .then((response) => {
          message.success("Item added successfully");
          setAddEditModalVisibilty(false);
          getAllItems();
        })
        .catch((error) => {
          message.error("Something went wrong");
          console.log(error);
        });
    } else {
      axios
        .post("/api/items/edit-item", { ...updatedValues, itemId: editingItem.id })
        .then((response) => {
          message.success("Item edited successfully");
          setEditingItem(null);
          setAddEditModalVisibilty(false);
          getAllItems();
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
        <h3>Productos</h3>
        <Button type="primary" onClick={() => setAddEditModalVisibilty(true)}>
          Agregar
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />

      {addEditModalVisibilty && (
        <Modal
          onCancel={() => {
            setEditingItem(null);
            setAddEditModalVisibilty(false);
          }}
          open={addEditModalVisibilty}
          title={`${
            editingItem !== null ? "Editar Producto" : "Agregar nuevo Producto"
          }`}
          footer={false}
          style={{ right: "5%", position: "absolute"}} // Mueve el modal hacia la derecha
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Producto"
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el nombre del Producto",
                },
              ]}
            >
              <Input className="use-keyboard-input" />
            </Form.Item>

            <Form.Item
              name="price"
              label="Precio Sin IVA"
              rules={[{ required: true, message: "Por favor, ingresa el precio del Producto" }]}
            >
              <Input className="use-keyboard-input" />
            </Form.Item>

            <Form.Item 
              name="image" 
              label="ImagenURL"
              rules={[{ required: true, message: "Porfavor, ingresa URL de la imagen" }]}
            >
              <Input className="use-keyboard-input" />
            </Form.Item>

            {/* <Form.Item name="category" label="Categoria" required="true">
              <Select>
                <Select.Option value="frutas">Frutas</Select.Option>
                <Select.Option value="vegetales">Vegetales</Select.Option>
                <Select.Option value="carne">Carne</Select.Option>
              </Select>
            </Form.Item> */}
            <Form.Item name="category" label="Categoría" required="true">
              <Select>
                {categoriesData.map((category) => (
                  <Select.Option value={category.name} key={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
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

export default Items;
