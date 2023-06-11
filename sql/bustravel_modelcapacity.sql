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
-- Table structure for table `modelcapacity`
--

DROP TABLE IF EXISTS `modelcapacity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modelcapacity` (
  `busModel` varchar(30) NOT NULL,
  `busCapacity` bigint DEFAULT NULL,
  PRIMARY KEY (`busModel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelcapacity`
--

LOCK TABLES `modelcapacity` WRITE;
/*!40000 ALTER TABLE `modelcapacity` DISABLE KEYS */;
INSERT INTO `modelcapacity` VALUES ('Bentley Azure',70),('BMW 525',78),('Buick LeSabre',58),('Buick Park Avenue',70),('Buick Skylark',57),('Cadillac Seville',74),('Cadillac SRX',49),('Chevrolet Monza',48),('Chrysler Sebring',56),('Dodge Viper',59),('Ford Econoline E150',68),('Ford Escape',77),('Ford F250',51),('Ford Mustang',46),('Ford Taurus',46),('Isuzu Hombre Space',77),('Isuzu Stylus',64),('Jaguar XK Series',54),('Jeep Commander',64),('Kia Sedona',68),('Mazda Millenia',74),('MINI Clubman',73),('Mitsubishi Challenger',77),('Oldsmobile Silhouette',73),('Pontiac Grand Prix',72),('Porsche Carrera GT',56),('Saab 9000',69),('Saturn S-Series',71),('Toyota Avalon',52),('Volkswagen R32',59);
/*!40000 ALTER TABLE `modelcapacity` ENABLE KEYS */;
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
