CREATE DATABASE  IF NOT EXISTS `bustravel` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bustravel`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: bustravel
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `estimatedtime`
--

DROP TABLE IF EXISTS `estimatedtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estimatedtime` (
  `routeDistance` int NOT NULL,
  `departureTime` time NOT NULL,
  `arrivalTime` time NOT NULL,
  PRIMARY KEY (`routeDistance`,`departureTime`),
  CONSTRAINT `estimatedtime_ibfk_1` FOREIGN KEY (`routeDistance`) REFERENCES `estimatedcost` (`routeDistance`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estimatedtime`
--

LOCK TABLES `estimatedtime` WRITE;
/*!40000 ALTER TABLE `estimatedtime` DISABLE KEYS */;
INSERT INTO `estimatedtime` VALUES (10,'11:10:00','11:20:00'),(11,'09:36:00','09:47:00'),(12,'09:48:00','10:00:00'),(13,'10:21:00','10:34:00'),(14,'11:23:00','11:37:00'),(15,'09:52:00','10:07:00'),(16,'10:45:00','11:01:00'),(17,'10:02:00','10:19:00'),(18,'11:30:00','11:48:00'),(19,'09:43:00','10:02:00'),(20,'11:28:00','11:48:00'),(21,'11:31:00','11:52:00'),(22,'11:07:00','11:29:00'),(23,'09:12:00','09:35:00'),(24,'10:44:00','11:08:00'),(25,'09:52:00','10:17:00'),(26,'11:36:00','12:02:00'),(27,'11:18:00','11:45:00'),(28,'10:56:00','11:24:00'),(29,'10:41:00','11:10:00'),(30,'11:33:00','12:03:00'),(31,'09:40:00','10:11:00'),(32,'09:54:00','10:26:00'),(33,'11:28:00','12:01:00'),(34,'09:45:00','10:19:00'),(35,'10:39:00','11:14:00'),(36,'09:43:00','10:19:00'),(37,'10:54:00','11:31:00'),(38,'11:33:00','12:11:00'),(39,'11:16:00','11:55:00'),(40,'09:55:00','10:35:00'),(41,'10:48:00','11:29:00'),(42,'09:33:00','10:15:00'),(43,'10:19:00','11:02:00'),(44,'09:13:00','09:57:00'),(45,'10:43:00','11:28:00'),(46,'10:07:00','10:53:00'),(47,'11:08:00','11:55:00'),(48,'10:53:00','11:41:00'),(49,'09:10:00','09:59:00'),(50,'09:22:00','10:12:00'),(51,'11:46:00','12:37:00'),(52,'11:02:00','11:54:00'),(53,'11:32:00','12:25:00'),(54,'09:24:00','10:18:00'),(55,'10:20:00','11:15:00'),(56,'10:55:00','11:51:00'),(57,'09:29:00','10:26:00'),(58,'11:13:00','12:11:00'),(59,'10:29:00','11:28:00'),(60,'13:00:00','13:50:00');
/*!40000 ALTER TABLE `estimatedtime` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-26 20:09:09
