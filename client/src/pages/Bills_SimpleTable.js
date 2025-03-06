import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import SimpleTable from "../components/simpleTable"; // Ajusta la ruta si es necesario
import axios from "axios";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Table } from "antd";

function Bills() {
  const [billsData, setBillsData] = useState([]);
  const [printBillModalVisibility, setPrintBillModalVisibilty] =
    useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const contentRef = useRef(null); // Referencia para el contenido del modal

  const getAllBills = () => {
    axios
      .get("/api/bills/get-all-bills")
      .then((response) => {
        const data = response.data;
        console.log("Datos recibidos:", data); // <-- Inspeccionar los datos aquí
        data.reverse();
        setBillsData(data);
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
            <title>Factura</title>
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
              margin: auto;
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

  const cartcolumns = [
    {
      title: "Producto",
      dataIndex: "name",
    },
    {
      title: "Precio $",
      dataIndex: "price",
    },
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
      title: "tarifa Total $",
      dataIndex: "id",
      render: (id, record) => (
        <div>
          <b>{record.quantity * record.price}</b>
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Cliente",
      dataIndex: "customerName",
    },
    {
      title: "SubTotal $",
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
  
  
  useEffect(() => {
    getAllBills();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Facturas</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />

      {printBillModalVisibility && selectedBill  && selectedBill.cartItems  && (
        <Modal
          onCancel={() => {
            setPrintBillModalVisibilty(false);
          }}
          open={printBillModalVisibility}
          style={{ top: "5%" }} // Mueve el modal hacia arriba
          title="Detalle de Factura"
          footer={false}
          width={800}
        >
          <div className="bill-model p-3" ref={contentRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
              <div>
                <h1>
                  <b>SR MARKET</b>
                </h1>
              </div>
              <div>
                <p>Pasaje 2</p>
                <p>San Salvador 500013</p>
                <p>Tel. 9989-9278</p>
              </div>
            </div>
            <div className="bill-customer-details my-2">
              <p>
                <b>Cliente</b> : {selectedBill.customerName}
              </p>
              <p>
                <b>Telefono</b> : {selectedBill.customerPhoneNumber}
              </p>
              <p>
                <b>Fecha</b> :{" "}
                {selectedBill.createdAt.toString().substring(0, 10)}
              </p>
            </div>
                {/*console.log("Estado actual de selectedBill:", selectedBill)*/}
            {printBillModalVisibility && selectedBill && selectedBill.cartItems && (
                  <>
                    <SimpleTable cartItems={selectedBill.cartItems} />
                    {console.log("Datos de la tabla Modal Chivo:", selectedBill.cartItems)}
                  </>
                )}

            <div className="dotted-border">
              <p>
                <b>SUB TOTAL $</b> : {selectedBill.subTotal}
              </p>
              <p>
                <b>Impuesto $</b> : {selectedBill.tax}
              </p>
            </div>

            <div>
              <h2>
                <b>GRAN TOTAL $: {selectedBill.totalAmount}</b>
              </h2>
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
