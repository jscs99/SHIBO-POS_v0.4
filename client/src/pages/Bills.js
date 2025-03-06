import React, { useEffect, useRef, useState, useCallback } from "react";
import QRCode from "qrcode";
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

  const websiteURL = "https://www.google.com";
  const qrRef = useRef(null); // Referencia para el QR en el modal

  useEffect(() => {
    if (qrRef.current) {
      QRCode.toCanvas(qrRef.current, websiteURL, { width: 100 }, (error) => {
        if (error) console.error(error);
      });
    }
  }, [printBillModalVisibility]); // Se ejecuta cuando se abre el modal

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

  const handlePrint = async () => {
    if (contentRef.current) {
      // Crear una nueva ventana para la impresión
      const printWindow = window.open("", "_blank");
     
      if (printWindow) {
        // Obtener el contenido del modal
        const content = contentRef.current.innerHTML;
        
        try {
          // Generamos el código QR en base64
          const qrBase64 = await QRCode.toDataURL(websiteURL, {
            width: 100,
            margin: 0,
          });

          // Escribir el contenido en la nueva ventana
          printWindow.document.open();
          printWindow.document.write(`
          <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Documento Tributario Electrónico</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .bill-model {
              max-width: 80mm; /* Tamaño del rollo de papel */
              font-family: monospace;
              font-size: 12px;
              text-align: left;
              padding: 5px;
              margin: auto;
              white-space: pre-wrap; /* Mantiene los saltos de línea */
            }
            .dotted-border {
              border-top: 1px dashed black;
              margin: 5px 0;
            }
            @media print {
              body {
                visibility: hidden;
              }
              .bill-model {
                visibility: visible;
                position: absolute;
                left: 0;
                top: 0;
                width: 80mm;
              }

            }
          </style>
          
          </head>
          <body>
            <div class="bill-model">
              ${content}
              <div class="qr-container">
               <img src="${qrBase64}" alt="QR Code" />
              </div>
            </div>
            <script>
              window.onload = () => { window.print(); window.close(); };
            </script>

          </body>
          </html>
        `);
          printWindow.document.close();
        } catch (error) {
          console.error("Error generando el QR:", error);
        }

        // Copiar los estilos dinámicos del head actual al head de la nueva ventana
        const currentStyles = document.querySelectorAll(
          "style, link[rel='stylesheet']"
        );
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

    { title: "Nombre del Cliente", dataIndex: ["Customer", "customerName"] }, // Accede a customerName

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

  const findCustomerByCode = useCallback(
    (customerCode) => {
      return customersData.find(
        (customer) => customer.customerCode === customerCode
      );
    },
    [customersData]
  );

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
          onCancel={() => setPrintBillModalVisibilty(false)}
          open={printBillModalVisibility}
          title="Documento Tributario Electrónico"
          footer={false}
          width={350} // Reducimos el ancho para simular 80mm
          centered
        >
          {/* Contenedor con ancho de ticket */}
          <div
            className="bill-model p-3"
            ref={contentRef}
            style={{
              maxWidth: "180mm",
              fontFamily: "monospace",
              fontSize: "11px",
            }}
          >
            {/* DATOS DEL EMISOR */}
            <div className="text-center">
              <h2>
                <b>{businessData.name}</b>
              </h2>
              <p>
                <b>Dirección: </b> {businessData.address}
              </p>
              <p>
                <b>Actividad Económica: </b> {businessData.aeconomic}
              </p>
              <p>
                <b>NIT:</b> {businessData.nit}
              </p>
              <p>
                <b>NRC: </b>
                {businessData.nrc}
              </p>
              <p>
                <b>Sucursal: </b>
                {businessData.sucursal}
              </p>
            </div>
            <div className="dotted-border"></div>

            {/* DATOS DEL RECEPTOR */}
            <div>
              <p>
                <b>Cliente:</b> {selectedBill.customerCode}
              </p>
              <p>
                <b>Nombre o Razón Social</b> :{" "}
                {selectedCustomer
                  ? selectedCustomer.customerName
                  : "Cargando..."}
              </p>
              <p>
                <b>Actividad Económica</b> :{" "}
                {selectedCustomer
                  ? selectedCustomer.customerAeconomic
                  : "Cargando..."}
              </p>
              <p>
                <b>Documento de Identificación</b> :{" "}
                {selectedCustomer
                  ? selectedCustomer.customerDocNumber
                  : "Cargando..."}
              </p>
              <p>
                <b>Número de Documento</b> :{" "}
                {selectedCustomer
                  ? selectedCustomer.customerDocNumber
                  : "Cargando..."}
              </p>
              <p>
                <b>NIT</b> :{" "}
                {selectedCustomer
                  ? selectedCustomer.customerNit
                  : "Cargando..."}
              </p>
              <p>
                <b>NRC</b> :{" "}
                {selectedCustomer
                  ? selectedCustomer.customerNrc
                  : "Cargando..."}
              </p>
              <p>
                <b>Dirección</b> :{" "}
                {selectedCustomer
                  ? selectedCustomer.customerAddress
                  : "Cargando..."}
              </p>
              <p>
                <b>Correo Electrónico</b> :{" "}
                {selectedCustomer
                  ? selectedCustomer.customerEmail
                  : "Cargando..."}
              </p>
              <p>
                <b>Telefono</b> :{" "}
                {selectedCustomer
                  ? selectedCustomer.customerPhone
                  : "Cargando..."}
              </p>
            </div>
            <div className="dotted-border"></div>

            {/* DATOS DE FACTURACIÓN */}
            <div>
              <p>
                <b>Documento:</b> {selectedBill.documentType}
              </p>
              <p>
                <b>Código de generación:</b>
              </p>
              <p>9C5FE601-247A-4B3C-A671-DB23661E67CD</p>
              <p>
                <b>Número de control</b> :{" "}
              </p>
              <p>DTE-03-M001P001-000000000000001</p>
              <p>
                <b>Sello de recepción</b> :{" "}
              </p>
              <p>2025E3768F58FD2F4320BE5A73FDC4F54515QKB</p>
              <p>
                <b>Modelo de facturación</b> : Previo
              </p>
              <p>
                <b>Tipo de transmisión</b> : Normal
              </p>
              <p>
                <b>Fecha y hora</b> : 2025-01-15 20:20:2
              </p>
            </div>
            <div className="dotted-border"></div>

            {/* DETALLE DE COMPRA */}
            <div>
              <p>
                <b>Detalles de compra:</b>
              </p>
              <div>
                {selectedBill.cartItems.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between">
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} x {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="dotted-border"></div>

            {/* TOTAL */}
            <div>
              <p>Suma ventas gravadas : {selectedBill.subTotal}</p>
              <p>Ventas no Sujetas : 00</p>
              <p>Ventas Exentas : 00</p>
              <p>IVA 13% : {selectedBill.tax}</p>
              <p>
                <b>Sub-Total</b> : {selectedBill.subTotal}
              </p>
              <p>IVA Percibido : 00</p>
              <p>IVA Retenido : 00</p>
              <p>Retención Renta : 00 </p>
              <p>Suma Total de Operaciones : {selectedBill.totalAmount}</p>
            </div>
            <div className="dotted-border"></div>
            <div className="text-right">
              <h4>
                <b>TOTAL A PAGAR </b> : {selectedBill.totalAmount}
              </h4>
            </div>
            <div className="dotted-border"></div>
            {/* MENSAJE FINAL */}
            <div className="text-center">
              <p>¡Gracias por su compra!</p>
            </div>
            {/* QR al final de la factura */}
            <div className="text-center">
              <p>Visítanos en:</p>
              <canvas ref={qrRef}></canvas> {/* Aquí se genera el QR */}
            </div>
          </div>

          {/* Botón de impresión */}
          <div className="d-flex justify-content-center mt-2">
            <Button type="primary" onClick={handlePrint}>
              Imprimir
            </Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Bills;
