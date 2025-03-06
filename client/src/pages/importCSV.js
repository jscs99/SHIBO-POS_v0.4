import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Keyboard from "../components/virtualKeyboard";
import "../resources/VirtualKeyboard.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UploadOutlined, DatabaseOutlined } from "@ant-design/icons";
import { Button, message, Upload, Modal, Select } from "antd";

const ImportCSV = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadKey, setUploadKey] = useState(Date.now()); // Clave para forzar re-render

    // Estado para el modal de restauración
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [backupFiles, setBackupFiles] = useState([]);
    const [selectedBackup, setSelectedBackup] = useState(null);

    // Cargar lista de backups disponibles en el backend
    useEffect(() => {
        fetch("/api/backup/list")
            .then((res) => res.json())
            .then((data) => setBackupFiles(data))
            .catch((err) => console.error("Error al obtener backups:", err));
    }, []);

    
    const handleUpload = async (endpoint) => {
        if (!file) {
            message.warning("Por favor, selecciona un archivo CSV.");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:5000${endpoint} `, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            message.success(response.data.message);
        } catch (error) {
            message.error("Error al importar los datos.");
        } finally {
            setLoading(false);
            setFile(null);
            setUploadKey(Date.now()); // Cambia la clave para reiniciar `<Upload>
        }
    };

    const handleRestore = async () => {
        if (!selectedBackup) {
            message.warning("Por favor, selecciona un archivo de backup.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/backup/restore", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ backupFile: selectedBackup }),
            });

            const data = await res.json();
            if (res.ok) {
                message.success("Base de datos restaurada correctamente.");
                setIsModalOpen(false);
            } else {
                message.error(`Error al restaurar: ${data.message}`);
            }
        } catch (error) {
            console.error("Error al restaurar:", error);
            message.error("Error inesperado al restaurar la base de datos.");
        }
        setLoading(false);
    };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Base de Datos </h3>
        <Button 
            color="danger" 
            variant="outlined" 
            icon={<DatabaseOutlined />}
            onClick={() => setIsModalOpen(true)}
        >
          Restaurar
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20  }}>
        <div style={{ padding: 20 }}>
            <Upload
                key={uploadKey} // Clave para forzar re-render
                beforeUpload={(file) => {
                    setFile(file);
                    return false; // Evita la carga automática
                }}
                accept=".csv"
            >
                <Button icon={<UploadOutlined />}>Seleccionar Archivo CSV</Button>
            </Upload>

            <Button type="primary" onClick={() => handleUpload("/api/customers/import")} loading={loading} style={{ marginTop: 10 }}>
                Subir Clientes
            </Button>
        </div>
        <div style={{ padding: 20 }}>
            <Upload
                key={uploadKey} // Clave para forzar re-render
                beforeUpload={(file) => {
                    setFile(file);
                    return false; // Evita la carga automática
                }}
                accept=".csv"
            >
                <Button icon={<UploadOutlined />}>Seleccionar Archivo CSV</Button>
            </Upload>

            <Button type="primary" onClick={() => handleUpload("/api/items/import")} loading={loading} style={{ marginTop: 10 }}>
                Subir Productos
            </Button>
        </div>
        <div style={{ padding: 20 }}>
            <Upload
                key={uploadKey} // Clave para forzar re-render
                beforeUpload={(file) => {
                    setFile(file);
                    return false; // Evita la carga automática
                }}
                accept=".csv"
            >
                <Button icon={<UploadOutlined />}>Seleccionar Archivo CSV</Button>
            </Upload>

            <Button type="primary" onClick={() => handleUpload("/api/categories/import")} loading={loading} style={{ marginTop: 10 }}>
                Subir Categorias
            </Button>
        </div>
      </div>
      <Modal
        okButtonProps={{ style: { backgroundColor: 'red' } }} 
        title="Restaurar Base de Datos"
        open={isModalOpen}
        onOk={handleRestore}
        onCancel={() => setIsModalOpen(false)}
        okText="Restaurar"
        cancelText="Cancelar"
        >
        <p>Selecciona un archivo de backup para restaurar la base de datos:</p>
        <Select
            style={{ width: "100%" }}
            placeholder="Selecciona un archivo"
            onChange={setSelectedBackup}
        >
            {backupFiles.map((file) => (
                <Select.Option key={file} value={file}>
                    {file}
                </Select.Option>
            ))}
        </Select>
      </Modal>
    </DefaultLayout>
  );
}

export default ImportCSV;
