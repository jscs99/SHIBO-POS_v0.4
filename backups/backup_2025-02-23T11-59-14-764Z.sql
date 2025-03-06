-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: chivopos-db
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customerCode` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `userAlias` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `totalAmount` float NOT NULL,
  `tax` float NOT NULL,
  `subTotal` float NOT NULL,
  `cartItems` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerCode` (`customerCode`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_10` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_11` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_12` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_13` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_14` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_15` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_16` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_2` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_3` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_4` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_5` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_6` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_7` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_8` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bills_ibfk_9` FOREIGN KEY (`customerCode`) REFERENCES `customers` (`customerCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (1,'1554','Sontay',28.25,3.25,25,'[{\"id\": 10, \"name\": \"Jugo de Zanahoria\", \"image\": \"https://th.bing.com/th/id/R.c200975edc5b8b40e1be0c034730d351?rik=fcQVw69vuCWBpA&pid=ImgRaw&r=0&sres=1&sresct=1\", \"price\": 15, \"category\": \"Jugos Naturales\", \"quantity\": 1, \"createdAt\": \"2025-02-02T16:07:10.000Z\", \"priceWIVA\": 16.95, \"updatedAt\": \"2025-02-02T16:07:59.000Z\"}, {\"id\": 3, \"name\": \"Mangos\", \"image\": \"http://cdn.shopify.com/s/files/1/2785/6868/products/43406-crystallized-citrus_mango_1024x1024.jpg?v=1603740971\", \"price\": 10, \"category\": \"frutas\", \"quantity\": 1, \"createdAt\": \"2025-01-30T21:03:45.000Z\", \"priceWIVA\": 11.3, \"updatedAt\": \"2025-01-30T21:05:33.000Z\"}]','2025-02-22 23:20:54','2025-02-22 23:20:54'),(2,'9537','Sontay',5.65,0.65,5,'[{\"id\": 2, \"name\": \"Naranjas\", \"image\": \"https://ensaladas.info/wp-content/uploads/2015/08/naranja-fruta.jpg\", \"price\": 5, \"category\": \"frutas\", \"quantity\": 1, \"createdAt\": \"2025-01-30T21:03:45.000Z\", \"priceWIVA\": 5.65, \"updatedAt\": \"2025-01-30T21:05:10.000Z\"}]','2025-02-22 23:22:06','2025-02-22 23:22:06');
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `businesses`
--

DROP TABLE IF EXISTS `businesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `businesses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nit` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nrc` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `sucursal` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `aeconomic` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `businesses`
--

LOCK TABLES `businesses` WRITE;
/*!40000 ALTER TABLE `businesses` DISABLE KEYS */;
INSERT INTO `businesses` VALUES (7,'Tienda San Nicolas S.A. de C.V.','06142212006514','4069','CENTROAMERICA','Venta de Productos Basicos de Consumo','C. San Antonio Abad. entre Av. Santa Mónica, SAN SALVADOR CENTRO, San Salvador','2025-01-26 17:45:20','2025-01-26 17:45:20');
/*!40000 ALTER TABLE `businesses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'frutas','https://th.bing.com/th/id/OIP.FZA43rV0CFl_7FdS-GePpAHaE8?w=300&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7','2025-01-16 13:00:21','2025-01-16 13:00:21'),(2,'vegetales','https://th.bing.com/th/id/OIP.pDSiqAFJjdcrrOBNQQzTUwHaE8?w=278&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7','2025-01-16 13:01:09','2025-01-16 13:02:16'),(3,'carne','https://th.bing.com/th/id/OIP.kRLlPLtniFnJU6U_WTDfHgHaEx?w=281&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7','2025-01-16 13:04:21','2025-01-16 13:04:21'),(7,'Jugos Naturales','https://www.gob.mx/cms/uploads/article/main_image/69581/bebidas-energizantes-naturales.jpg','2025-01-31 00:12:25','2025-02-02 14:33:44'),(11,'carbonatadas','https://th.bing.com/th/id/OIP.gOSWD16OMZ6vAMmKT8ltUwHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7','2025-02-23 00:10:51','2025-02-23 00:10:51'),(30,'Comida','/img/NoPhoto.jpeg','2025-02-23 01:13:48','2025-02-23 01:13:48'),(31,'Ropa','/img/NoPhoto.jpeg','2025-02-23 01:13:48','2025-02-23 01:13:48'),(32,'Electrónica','/img/NoPhoto.jpeg','2025-02-23 01:13:48','2025-02-23 01:13:48');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customerCode` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `customerName` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `customerNit` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `customerNrc` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `customerDoc` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `customerDocNumber` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `customerAeconomic` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `customerAddress` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `customerEmail` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `customerPhone` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`customerCode`),
  UNIQUE KEY `customerCode` (`customerCode`),
  UNIQUE KEY `customerNit` (`customerNit`),
  UNIQUE KEY `customerNrc` (`customerNrc`),
  UNIQUE KEY `customerDocNumber` (`customerDocNumber`),
  UNIQUE KEY `customerNit_2` (`customerNit`),
  UNIQUE KEY `customerNrc_2` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_2` (`customerDocNumber`),
  UNIQUE KEY `customerNit_3` (`customerNit`),
  UNIQUE KEY `customerNrc_3` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_3` (`customerDocNumber`),
  UNIQUE KEY `customerNit_4` (`customerNit`),
  UNIQUE KEY `customerNrc_4` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_4` (`customerDocNumber`),
  UNIQUE KEY `customerNit_5` (`customerNit`),
  UNIQUE KEY `customerNrc_5` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_5` (`customerDocNumber`),
  UNIQUE KEY `customerNit_6` (`customerNit`),
  UNIQUE KEY `customerNrc_6` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_6` (`customerDocNumber`),
  UNIQUE KEY `customerNit_7` (`customerNit`),
  UNIQUE KEY `customerNrc_7` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_7` (`customerDocNumber`),
  UNIQUE KEY `customerNit_8` (`customerNit`),
  UNIQUE KEY `customerNrc_8` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_8` (`customerDocNumber`),
  UNIQUE KEY `customerNit_9` (`customerNit`),
  UNIQUE KEY `customerNrc_9` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_9` (`customerDocNumber`),
  UNIQUE KEY `customerNit_10` (`customerNit`),
  UNIQUE KEY `customerNrc_10` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_10` (`customerDocNumber`),
  UNIQUE KEY `customerNit_11` (`customerNit`),
  UNIQUE KEY `customerNrc_11` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_11` (`customerDocNumber`),
  UNIQUE KEY `customerNit_12` (`customerNit`),
  UNIQUE KEY `customerNrc_12` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_12` (`customerDocNumber`),
  UNIQUE KEY `customerNit_13` (`customerNit`),
  UNIQUE KEY `customerNrc_13` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_13` (`customerDocNumber`),
  UNIQUE KEY `customerNit_14` (`customerNit`),
  UNIQUE KEY `customerNrc_14` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_14` (`customerDocNumber`),
  UNIQUE KEY `customerNit_15` (`customerNit`),
  UNIQUE KEY `customerNrc_15` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_15` (`customerDocNumber`),
  UNIQUE KEY `customerNit_16` (`customerNit`),
  UNIQUE KEY `customerNrc_16` (`customerNrc`),
  UNIQUE KEY `customerDocNumber_16` (`customerDocNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('1554','Juan Rodriguez',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-02-22 23:20:03','2025-02-22 23:20:29'),('1801','Varios',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-02-22 23:25:18','2025-02-22 23:25:18'),('6121','INSERT, S.A. DE C.V.','0614-020399-101-9','111303-8','DUI','2337588-0','Otras actividades de tecnologia de informacion y servicios de computadora','Calle Quetzal, Col. Centro America, 122, Final Pasaje 12, San Salvador, San Salva','insertsv@gmailer.com','77031590','2025-02-22 23:25:18','2025-02-22 23:25:18'),('9537','Ignacio Velasquez',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-02-22 23:22:06','2025-02-22 23:22:06');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `price` float NOT NULL,
  `priceWIVA` float NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Uvas','https://cf.ltkcdn.net/wine/images/std/165373-800x532r1-grapes.jpg',7,7.91,'frutas','2025-01-30 21:03:45','2025-01-30 21:05:22'),(2,'Naranjas','https://ensaladas.info/wp-content/uploads/2015/08/naranja-fruta.jpg',5,5.65,'frutas','2025-01-30 21:03:45','2025-01-30 21:05:10'),(3,'Mangos','http://cdn.shopify.com/s/files/1/2785/6868/products/43406-crystallized-citrus_mango_1024x1024.jpg?v=1603740971',10,11.3,'frutas','2025-01-30 21:03:45','2025-01-30 21:05:33'),(4,'Ejotes','https://cdn-prod.medicalnewstoday.com/content/images/articles/285/285753/beans.jpg',8,9.04,'vegetales','2025-01-30 21:03:45','2025-01-30 21:05:37'),(5,'Tomates','https://media.istockphoto.com/photos/tomato-with-slice-isolated-with-clipping-path-picture-id941825878?k=20&m=941825878&s=612x612&w=0&h=Qx5wYoEKsig3BGfhHAb2ZUqRBrhi6k64ZbXp3_zhj4o=',4,4.52,'vegetales','2025-01-30 21:03:45','2025-01-30 21:05:41'),(6,'Berenjenas','https://www.jiomart.com/images/product/original/590004102/brinjal-purple-striped-500-g-0-20201118.jpg',6,6.78,'vegetales','2025-01-30 21:03:45','2025-01-30 21:05:44'),(7,'Pan con Pollo','https://th.bing.com/th/id/OIP.1IgM3KGbaL7-eydG6C-CIwHaEb?rs=1&pid=ImgDetMain',9,10.17,'carne','2025-01-30 21:03:45','2025-01-30 21:05:48'),(8,'Carne de Res','https://th.bing.com/th/id/OIP.MftYqAW8WXd3mMvuXF_AVwAAAA?rs=1&pid=ImgDetMain',7,7.91,'carne','2025-01-30 21:03:45','2025-01-30 21:05:52'),(10,'Jugo de Zanahoria','https://th.bing.com/th/id/R.c200975edc5b8b40e1be0c034730d351?rik=fcQVw69vuCWBpA&pid=ImgRaw&r=0&sres=1&sresct=1',15,16.95,'Jugos Naturales','2025-02-02 16:07:10','2025-02-02 16:07:59'),(11,'Papa','https://th.bing.com/th/id/OIP.lVaIokiAaoYQfK9Cj1DYqAHaFj?rs=1&pid=ImgDetMain',12,13.56,'fruits','2025-02-06 17:00:05','2025-02-06 17:22:44');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `alias` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Mark Antony','Ma45','cajero','123123',1,'2025-01-13 00:19:16','2025-01-13 00:19:16'),(3,'Juan Galvez','Sontay','admin','741741',1,'2025-01-13 00:33:37','2025-01-13 00:33:37'),(6,'Marcos Calderon','mg0502','cajero','123123',1,'2025-01-14 13:03:08','2025-01-14 13:03:08'),(8,'Frank Sina','FR43','cajero','456456',0,'2025-01-14 18:04:33','2025-01-14 21:46:25'),(9,'Frank Sina','FR47','admin','456456',0,'2025-01-20 14:35:19','2025-01-20 14:35:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-23  5:59:15
