const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs"); // 
const router = express.Router();

const backupDir = path.join(__dirname, "../backups");

router.post("/", async (req, res) => {
  try {
    // Definir la ruta y el nombre del archivo de backup
    const backupDir = path.join(__dirname, "../backups");
    const backupFile = `backup_${new Date().toISOString().replace(/[:.]/g, "-")}.sql`;
    const backupPath = path.join(backupDir, backupFile);

    // Comando para hacer el dump de la base de datos
    const command = `mysqldump -u root --password="" chivopos-db > "${backupPath}"`;

    // Ejecutar el comando
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error en el backup:", error);
        return res.status(500).json({ message: "Error al hacer el backup", error });
      }
      console.log("Backup realizado:", backupPath);
      res.status(200).json({ message: "Backup realizado correctamente", file: backupFile });
    });
  } catch (error) {
    console.error("Error inesperado en el backup:", error);
    res.status(500).json({ message: "Error inesperado", error });
  }
});

// Listar archivos de backup disponibles
router.get("/list", (req, res) => {
  fs.readdir(backupDir, (err, files) => {
      if (err) {
          return res.status(500).json({ message: "Error al leer la carpeta de backups" });
      }
      res.json(files.filter((file) => file.endsWith(".sql")));
  });
});

// Restaurar base de datos desde un backup
router.post("/restore", (req, res) => {
  const { backupFile } = req.body;

  if (!backupFile) {
      return res.status(400).json({ message: "No se especificó un archivo de backup." });
  }

  const backupPath = path.join(backupDir, backupFile);
  if (!fs.existsSync(backupPath)) {
      return res.status(404).json({ message: "Archivo de backup no encontrado." });
  }

  // Comando para restaurar el backup
  const command = `mysql -u root --password="" chivopos-db < "${backupPath}"`;

  exec(command, (error, stdout, stderr) => {
      if (error) {
          console.error("Error al restaurar la base de datos:", stderr);
          return res.status(500).json({ message: "Error al restaurar la base de datos." });
      }
      res.json({ message: "Base de datos restaurada correctamente." });
  });
});

module.exports = router;
