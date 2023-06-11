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
-- Table structure for table `station`
--

DROP TABLE IF EXISTS `station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `station` (
  `stationNo` bigint NOT NULL AUTO_INCREMENT,
  `stationAddress` varchar(50) NOT NULL,
  PRIMARY KEY (`stationNo`),
  UNIQUE KEY `stationAddress` (`stationAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `station`
--

LOCK TABLES `station` WRITE;
/*!40000 ALTER TABLE `station` DISABLE KEYS */;
INSERT INTO `station` VALUES (13,'0009 Rusk Point'),(35,'028 Dixon Trail'),(19,'048 Farwell Avenue'),(25,'049 Butternut Crossing'),(23,'05 Little Fleur Parkway'),(29,'050 Talisman Junction'),(8,'07576 Maryland Hill'),(36,'08 Blue Bill Park Place'),(18,'09016 Homewood Center'),(32,'09632 Waubesa Street'),(42,'1 Chinook Road'),(9,'1 Walton Terrace'),(17,'10 Nelson Park'),(6,'12437 Sauthoff Point'),(12,'14 Haas Parkway'),(40,'1709 Mifflin Court'),(3,'1779 Mallory Trail'),(46,'186 Stoughton Terrace'),(41,'19574 Ronald Regan Lane'),(49,'2 Swallow Junction'),(1,'212 7th Park'),(27,'2383 3rd Circle'),(30,'30608 Magdeline Street'),(31,'30666 Goodland Park'),(4,'31978 Lyons Pass'),(37,'4 Heath Junction'),(2,'43017 Pawling Lane'),(44,'46 Randy Circle'),(26,'50124 International Parkway'),(22,'596 Caliangt Drive'),(11,'598 Butternut Way'),(24,'6 Ruskin Hill'),(5,'644 Hooker Pass'),(48,'675 Carey Parkway'),(39,'6893 Monterey Point'),(20,'7 Dwight Hill'),(43,'7 Thierer Crossing'),(10,'7018 Amoth Alley'),(33,'72 Iowa Street'),(50,'72 Jana Place'),(28,'7699 Buhler Parkway'),(7,'77 Laurel Circle'),(38,'80 Northfield Terrace'),(21,'9 Maple Wood Plaza'),(47,'92174 Algoma Junction'),(34,'93 Independence Plaza'),(16,'94343 Sheridan Avenue'),(14,'9568 Clove Pass'),(15,'9595 Roth Pass'),(45,'96129 Shoshone Center');
/*!40000 ALTER TABLE `station` ENABLE KEYS */;
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
