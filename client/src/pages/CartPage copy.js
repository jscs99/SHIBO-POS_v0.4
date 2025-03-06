import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Keyboard from "../components/virtualKeyboard";
import "../resources/VirtualKeyboard.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { deleteFromCart, updateCart } from "../redux/rootReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { resetCart } from "../redux/rootReducer";

function CartPage() {
  // Seleccionamos el estado de cartItems del root reducer

  const { cartItems } = useSelector((state) => state.root);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [billChargeModal, setBillChargeModal] = useState(false);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [subTotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0); // Nuevo estado para el total

  const increaseQuantity = (record) => {
    dispatch(updateCart({ ...record, quantity: record.quantity + 1 }));
  };

  const decreaseQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch(updateCart({ ...record, quantity: record.quantity - 1 }));
    }
  };

  const deleteItem = (record) => {
    dispatch(deleteFromCart(record));
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/customers/get-all-customers"); // Asegúrate de que la API devuelve los datos correctamente
      setCustomerOptions(response.data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  const handleDropdownVisibleChange = (open) => {
    if (open && customerOptions.length === 0) {
      fetchCustomers();
    }
  };

  const searchCustomer = (value) => {
    axios
      .get("/api/customers/search-customer", { params: { query: value } })
      .then((response) => {
        setCustomerOptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const addCustomer = async (values) => {
  //   return axios
  //     .post("/api/customers/add-customer", values)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       message.error("Error al agregar cliente");
  //       console.log(error);
  //       throw error;
  //     });
  // };

  const addCustomer = async (values) => {
    try {
      const response = await axios.post("/api/customers/add-customer", values);
      console.log("Nuevo cliente creado:", response.data); // Aquí debe aparecer customerCode
      return response.data; // Ahora devuelve el cliente completo
    } catch (error) {
      message.error("Error al agregar cliente");
      console.error("Error en addCustomer:", error);
      throw error;
    }
  };
  

  const saveBill = (customerCode, values) => {
    const reqObject = {
      ...values,
      subTotal,
      cartItems,
      customerCode,
      tax: Number(((subTotal / 100) * 13).toFixed(2)),
      totalAmount: Number(subTotal + Number(((subTotal / 100) * 13).toFixed(2))),
      userAlias: localStorage.getItem('alias'),
    };
    console.log(reqObject);
    axios
      .post("/api/bills/charge-bill", reqObject)
      .then(() => {
        message.success("La Factura se almacenó con éxito");
        dispatch(resetCart());
        navigate("/bills");
      })
      .catch(() => {
        message.error("Algo no funcionó");
      });
  };

  const columns = [
    {
      title: "Producto",
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
      title: "Precio Unit",
      dataIndex: "price",
    },
    {
      title: "Precio con IVA",
      dataIndex: "priceWIVA",
    },
    {
      title: "Cantidad",
      dataIndex: "id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            onClick={() => increaseQuantity(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            onClick={() => decreaseQuantity(record)}
          />
        </div>
      ),
    },

    {
      title: "Acción",
      dataIndex: "id",
      render: (id, record) => (
        <DeleteOutlined onClick={() => deleteItem(record)} />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp = temp + item.price * item.quantity;
    });
    setSubTotal(temp);
    // Calcular total con 13% de impuesto
    const total = temp + (temp * 0.13);
    setTotalAmount(total.toFixed(2)); // Redondear a 2 decimales

  }, [cartItems]);

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
    if (billChargeModal) {
      setTimeout(() => {
        Keyboard.init();
      }, 100);  // Agrega un pequeño retraso para asegurar que el modal esté completamente abierto
    }
  }, [billChargeModal]);

  const onFinish = async (values) => { 
    try {
      let customerCode = selectedCustomer;
  
      if (!selectedCustomer) {
        // Esperamos a que el cliente sea agregado y obtenemos su código
        const newCustomer = await addCustomer(values);
        customerCode = newCustomer.customerCode; 
      }
  
      // Ahora guardamos la factura con el código del cliente
      saveBill(customerCode, values);
    } catch (error) {
      message.error("No se pudo agregar el cliente");
    }
  };
  

  return (
    <DefaultLayout>
      <h3>Carretilla</h3>
      <Table columns={columns} dataSource={cartItems} bordered />
      <hr />
      <div className="d-flex justify-content-end flex-column align-items-end">
        <div className="subtotal">
          {/* <h4> SUB TOTAL : <b>$/-{subTotal}</b></h4> */}
          <h4>  TOTAL : <b>$/-{totalAmount}</b></h4>
        </div>

        <Button type="primary" onClick={() => setBillChargeModal(true)}>
          FACTURAR
        </Button>
      </div>
      <Modal
        title="Seleccionar Cliente"
        open={billChargeModal}
        footer={null}
        onCancel={() => setBillChargeModal(false)}
        style={{ top: "5%", right: "5%", position: "absolute"}} // Mueve el modal hacia la derecha
        bodyStyle={{ overflowY: "auto", maxHeight: "600px" }} // Agrega la barra de scroll
      >
        {" "}
        <Form layout="vertical" onFinish={onFinish}>

        <Form.Item name="customerCode" label="Buscar cliente">
            <Select
            showSearch
            onSearch={searchCustomer}
            onChange={(value) => setSelectedCustomer(value)}
            placeholder="Buscar por Nombre, NIT o NRC"
            onDropdownVisibleChange={handleDropdownVisibleChange} // Carga clientes al abrir
            filterOption={false}
            options={customerOptions.map((customer) => ({
              label: `${customer.customerName} - ${customer.customerDocNumber} - ${customer.customerNit} - ${customer.customerNrc}`,
              value: customer.customerCode,
            }))}
            className="use-keyboard-input"
          />
            
          </Form.Item>
          
          {!selectedCustomer && (
            <>
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
            </>
          )}
        
          <div className="charge-bill-amount">
            <h5>
              SubTotal : <b>{subTotal}</b>
            </h5>
            <h5>
              13% Impuesto : <b>{((subTotal / 100) * 13).toFixed(2)}</b>
            </h5>
            <hr />
            <h2>
              Gran Total : <b>{subTotal + (subTotal / 100) * 13}</b>
            </h2>
          </div>

          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              GENERAR FACTURA
            </Button>
          </div>
        </Form>{" "}
      </Modal>
    </DefaultLayout>
  );
}

export default CartPage;
