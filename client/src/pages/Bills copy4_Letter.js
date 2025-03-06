import React, { useEffect, useRef, useState, useCallback } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";

function Bills() {
  const [billsData, setBillsData] = useState([]);
  const [businessData, setBusinessData] = useState({});
  const [customersData, setCustomersData] = useState([]);
  const [printBillModalVisibility, setPrintBillModalVisibilty] =
    useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const contentRef = useRef(null); // Referencia para el contenido del modal

  const getAllBills = () => {
    axios
      .get("/api/bills/get-all-bills")
      .then((response) => {
        const data = response.data;
        data.reverse();
        setBillsData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBusinessData = () => {
    axios
      .get("/api/business/get-all-business")
      .then((response) => {
       // console.log("Business fetched: ", response.data);
        const business = response.data[0];
        setBusinessData(business); //Actualizar categoriesData con los datos recibidos
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCustomersData = () => {
    axios
      .get("/api/customers/get-all-customers")
      .then((response) => {
        //console.log("Customers fetched: ", response.data);
        setCustomersData(response.data); //Actualizar categoriesData con los datos recibidos
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePrint = () => {
    if (contentRef.current) {
      // Crear una nueva ventana para la impresión
      const printWindow = window.open("", "_blank");
      //const printWindow = window.open("", "_blank", "width=800,height=600");
      if (printWindow) {
        // Obtener el contenido del modal
        const content = contentRef.current.innerHTML;
  
        // Escribir el contenido en la nueva ventana
        printWindow.document.open();
        printWindow.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Documento Tributario Electrónico</title>
          <style>
            // body {
            //   margin: 0;
            //   padding: 0;
            //   display: flex;
            //   justify-content: center;
            //   align-items: center;
            // }
            .bill-model {
              transform: scale(0.7); /* Escala al 90% */
              //transform-origin: top left; /* Ajusta el punto de origen del escalado */
              margin: 0%;
              width: auto;
              height: auto;
              padding: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Opcional para simular bordes */
            }
          </style>
          
          </head>
          <body>
            <div class="bill-model">${content}</div>
          </body>
          </html>
        `);
        printWindow.document.close();
  
        // Copiar los estilos dinámicos del head actual al head de la nueva ventana
        const currentStyles = document.querySelectorAll("style, link[rel='stylesheet']");
        currentStyles.forEach((style) => {
          printWindow.document.head.appendChild(style.cloneNode(true));
        });
  
        // Esperar a que se carguen los estilos y luego imprimir
        printWindow.onload = () => {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        };
      } else {
        console.error("No se pudo abrir la ventana de impresión.");
      }
    } else {
      console.error("contentRef está vacío o no definido.");
    }
  };

  const columns = [
    {
      title: "Número",
      dataIndex: "docNumber",
    },
    {
      title: "Documento",
      dataIndex: "documentType",
    },
    {
      title: "Código cliente",
      dataIndex: "customerCode",
    },
   
    { title: "Nombre del Cliente", 
      dataIndex: ["Customer", "customerName"] }, // Accede a customerName
    
    {
      title: "SubTotal",
      dataIndex: "subTotal",
    },
    {
      title: "Tax $",
      dataIndex: "tax",
    },
    {
      title: "Total $",
      dataIndex: "totalAmount",
    },
    {
      title: "Acción",
      dataIndex: "id",
      render: (id, record) => (
        <div className="d-flex">
          <EyeOutlined
            className="mx-2"
            onClick={() => {
              setSelectedBill(record);
              setPrintBillModalVisibilty(true);
            }}
          />
        </div>
      ),
    },
  ];
  const cartcolumns = [
    {
      title: "Cantidad",
      dataIndex: "id",
      render: (id, record) => (
        <div>
          <b>{record.quantity}</b>
        </div>
      ),
    },
    {
      title: "Producto",
      dataIndex: "name",
    },
    {
      title: "P. Unitario",
      dataIndex: "price",
    },
    
    {
      title: "Total",
      dataIndex: "id",
      render: (id, record) => (
        <div>
          <b>{record.quantity * record.price}</b>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllBills();
    getBusinessData();
    getCustomersData();
  }, []);

  const findCustomerByCode = useCallback((customerCode) => {
    return customersData.find(customer => customer.customerCode === customerCode);
  }, [customersData]);

  useEffect(() => {
    if (selectedBill) {
      const customer = findCustomerByCode(selectedBill.customerCode);
      setSelectedCustomer(customer);
    } else {
      setSelectedCustomer(null);
    }
  }, [selectedBill, customersData, findCustomerByCode]);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Facturas</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />

      {printBillModalVisibility && selectedBill && (
        <Modal
          onCancel={() => {
            setPrintBillModalVisibilty(false);
          }}
          open={printBillModalVisibility}
          style={{ top: "5%" }} // Mueve el modal hacia arriba
          title="Documento Tributario Electrónico"
          footer={false}
          width={800}
        >
          <div className="bill-model p-3" ref={contentRef}>
            <div className="d-flex justify-content-between">
            <p><b>Datos del Emisor:</b></p>
              <p><b>{selectedBill.documentType}</b></p>
            </div>
            <div className="d-flex justify-content-between bill-header pb-2">
              <div>
                <h1>
                  <b>{businessData.name}</b>
                </h1>
                <p><b>Dirección: </b> {businessData.address}</p>
                <p><b>Actividad Económica: </b> {businessData.aeconomic}</p>
              </div>
              <div className="bill-model p-3">
              
                <p><b>NIT: </b>{businessData.nit}</p>
                <p><b>NRC: </b>{businessData.nrc}</p>
                <p><b>Sucursal: </b>{businessData.sucursal}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="bill-customer-details my-2">
                <p><b>Datos del Receptor:</b></p>
                <p><b>Código del Cliente</b> : {selectedBill.customerCode}</p>
                <p><b>Nombre o Razón Social</b> : {selectedCustomer ? selectedCustomer.customerName : 'Cargando...'}</p>
                <p><b>Actividad Económica</b> : {selectedCustomer ? selectedCustomer.customerAeconomic : 'Cargando...'}</p>
                <p><b>Documento de Identificación</b> : {selectedCustomer ? selectedCustomer.customerDocNumber : 'Cargando...'}</p>
                <p><b>Número de Documento</b> : {selectedCustomer ? selectedCustomer.customerDocNumber : 'Cargando...'}</p>
                <p><b>NIT</b> : {selectedCustomer ? selectedCustomer.customerNit : 'Cargando...'}</p>
                <p><b>NRC</b> : {selectedCustomer ? selectedCustomer.customerNrc : 'Cargando...'}</p>
                <p><b>Dirección</b> : {selectedCustomer ? selectedCustomer.customerAddress : 'Cargando...'}</p>
                <p><b>Correo Electrónico</b> : {selectedCustomer ? selectedCustomer.customerEmail : 'Cargando...'}</p>
                <p><b>Telefono</b> : {selectedCustomer ? selectedCustomer.customerPhone : 'Cargando...'}</p>
                
              </div>
              <div className="bill-model p-3">
                <p><b>Datos de facturación:</b></p>
                <p><b>Código de generación</b> : </p>
                <p>9C5FE601-247A-4B3C-A671-DB23661E67CD</p>
                <p><b>Número de control</b> : </p>
                <p>DTE-03-M001P001-000000000000001</p>
                <p><b>Sello de recepción</b> : </p>
                <p>2025E3768F58FD2F4320BE5A73FDC4F54515QKB</p>
                <p><b>Modelo de facturación</b> : Previo</p>
                <p><b>Tipo de transmisión</b> : Normal</p>
                <p><b>Fecha y hora</b> : 2025-01-15 20:20:2</p>
              </div>
            </div>
            <div className="dotted-border"></div>
            {/* <Table
              dataSource={
                Array.isArray(selectedBill.cartItems)
              ? selectedBill.cartItems
              : JSON.parse(selectedBill.cartItems || "[]")
              }
              columns={cartcolumns}
              pagination={false}
            /> */}
               
            <Table
              dataSource={selectedBill.cartItems}
              columns={cartcolumns}
              pagination={false}
            />
             {console.log("Datos de la tabla Modal:", selectedBill.cartItems)}
             {console.log("Tipo de cartItems:", typeof selectedBill.cartItems, Array.isArray(selectedBill.cartItems))}
             
             <div className="dotted-border"></div>
            <div className="text-right dotted-border">
              <p>Suma ventas gravadas : {selectedBill.subTotal}</p>
              <p>Ventas no Sujetas : 00</p>
              <p>Ventas Exentas : 00</p>
              <p>IVA 13% : {selectedBill.tax}</p>
              <p><b>Sub-Total</b> : {selectedBill.subTotal}</p>
              <p>IVA Percibido : 00</p>
              <p>IVA Retenido : 00</p>
              <p>Retención Renta : 00 </p>
              <p>Suma Total de Operaciones : {selectedBill.totalAmount}</p>
            </div>

            <div className="text-right">
              <h4>
                <b>TOTAL A PAGAR </b> : {selectedBill.totalAmount}
              </h4>
            </div>
            <div className="dotted-border"></div>

            <div className="text-center">
              <p>Gracias!</p>
              <p>Visitanos de nuevo :)</p>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Button type="primary" onClick={handlePrint}>
              Factura Impresa
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Bills;
