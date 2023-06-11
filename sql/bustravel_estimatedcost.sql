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
-- Table structure for table `estimatedcost`
--

DROP TABLE IF EXISTS `estimatedcost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estimatedcost` (
  `routeDistance` int NOT NULL,
  `price` decimal(6,2) NOT NULL,
  PRIMARY KEY (`routeDistance`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estimatedcost`
--

LOCK TABLES `estimatedcost` WRITE;
/*!40000 ALTER TABLE `estimatedcost` DISABLE KEYS */;
INSERT INTO `estimatedcost` VALUES (10,20.00),(11,22.00),(12,24.00),(13,26.00),(14,29.40),(15,30.00),(16,32.00),(17,34.00),(18,36.00),(19,38.00),(20,40.00),(21,42.00),(22,44.00),(23,46.00),(24,48.00),(25,50.00),(26,52.00),(27,54.00),(28,56.00),(29,58.00),(30,60.00),(31,62.00),(32,64.00),(33,66.00),(34,68.00),(35,70.00),(36,72.00),(37,74.00),(38,76.00),(39,78.00),(40,80.00),(41,82.00),(42,84.00),(43,86.00),(44,88.00),(45,90.00),(46,92.00),(47,94.00),(48,96.00),(49,98.00),(50,100.00),(51,102.00),(52,104.00),(53,106.00),(54,108.00),(55,110.00),(56,112.00),(57,114.00),(58,116.00),(59,118.00),(60,200.00);
/*!40000 ALTER TABLE `estimatedcost` ENABLE KEYS */;
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
