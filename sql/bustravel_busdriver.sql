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
-- Table structure for table `busdriver`
--

DROP TABLE IF EXISTS `busdriver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `busdriver` (
  `employeeID` bigint NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) DEFAULT NULL,
  `lastName` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `busdriver`
--

LOCK TABLES `busdriver` WRITE;
/*!40000 ALTER TABLE `busdriver` DISABLE KEYS */;
INSERT INTO `busdriver` VALUES (1,'Hoyt','Davana'),(2,'Kyrstin','Cullagh'),(3,'Howey','Arunowicz'),(4,'Carmine','Rochford'),(5,'Winne','Georghiou'),(6,'Cheston','Cranham'),(7,'Carma','Colebeck'),(8,'Tab','Morter'),(9,'Julita','McCallum'),(10,'Aridatha','Kilfoyle'),(11,'Josie','Cookman'),(12,'Talya','Neilson'),(13,'Violante','Attree'),(14,'Lin','Dorie'),(15,'Jo','Wilshere'),(16,'Gabey','Braidley'),(17,'Bartel','Donohoe'),(18,'Ryann','Filkov'),(19,'Ernestine','Steen'),(20,'Horton','Nugent'),(21,'Lauritz','Canizares'),(22,'Tobi','Castelletti'),(23,'Caril','Sturley'),(24,'Boigie','Gilson'),(25,'Carmon','Shrimptone'),(26,'Ozzie','Gittins'),(27,'Sayers','Estcourt'),(28,'Gillan','Earengey'),(29,'Tara','Holywell'),(30,'Bliss','Englishby'),(31,'Oberon','Snap'),(32,'Junette','Osbourn'),(33,'Dedra','Campbell-Dunlop'),(34,'Friedrick','Lieb'),(35,'Wiatt','Canny'),(36,'Jodie','Cotmore'),(37,'Gracie','Glen'),(38,'Pyotr','Stenson'),(39,'Norris','Showalter'),(40,'Tedmund','Wilstead'),(41,'Rosalind','Knobell'),(42,'Tomasine','Larciere'),(43,'Leah','Petlyura'),(44,'Jsandye','Conley'),(45,'Janelle','Ashbee'),(46,'Jasmina','Metts'),(47,'Mela','McGaughay'),(48,'Layney','Welfare'),(49,'Augie','M\'Barron'),(50,'Emerson','Fairey'),(51,'Krista','Caunter'),(52,'Jock','Shead'),(53,'Marshall','Howling'),(54,'Inigo','Balassa'),(55,'Kati','Whifen'),(56,'Elna','Edmons'),(57,'Juanita','Morales'),(58,'Natka','Gamlin'),(59,'Gabey','Upcott'),(60,'Lucita','Denisyev'),(61,'Natassia','Mudie'),(62,'Hanan','Fieldsend'),(63,'Nicky','Emanuelov'),(64,'Martina','Cornill'),(65,'Maude','Wimmers'),(66,'Fayre','Bremner'),(67,'Miquela','Rozea'),(68,'Lissi','Springtorp'),(69,'Cristabel','Kordova'),(70,'Kara-lynn','Bagenal'),(71,'Marcelline','Duggan'),(72,'Rutter','Wanderschek'),(73,'Nicolea','Loding'),(74,'Paddy','Nowell'),(75,'Ali','Beardow'),(76,'Rutter','Ades'),(77,'Kermy','Craghead'),(78,'Skyler','Crunkhorn'),(79,'Devonna','Dommerque'),(80,'Donetta','McDonand'),(81,'Libby','Shivell'),(82,'Heindrick','Pearson'),(83,'Harold','Vost'),(84,'Consolata','Semarke'),(85,'Gerda','Trundell'),(86,'Brody','Hulett'),(87,'Rosamond','Lippitt'),(88,'Margo','Dumbrall'),(89,'Odette','Jacquemy'),(90,'Malvina','Burge'),(91,'Jocelyn','Ream'),(92,'Lucie','Cleaton'),(93,'Cammy','Petley'),(94,'Evie','Glasscoo'),(95,'Erin','Gotthard'),(96,'Timothea','Dougharty'),(97,'Erminia','Januszewski'),(98,'Rockwell','Fried'),(99,'Basil','Pincked'),(100,'Joete','Gowers'),(101,'Kalindi','Sallowaye'),(102,'Cross','Currao'),(103,'Randy','Pickburn'),(104,'Tabina','Lages'),(105,'Yvette','Farlow'),(106,'Kala','Babbs'),(107,'Filippa','Hamner'),(108,'Den','Allonby'),(109,'Estella','Lusty'),(110,'Sara','Peedell'),(111,'Rudolfo','Kilvington'),(112,'Emelita','Drever'),(113,'Barrett','Wormald'),(114,'Jay','Amps'),(115,'Hanny','Redsell'),(116,'Cornelle','Delgua'),(117,'Raphael','Fullom'),(118,'Candace','Trahear'),(119,'Lonni','Ravillas'),(120,'Sapphire','Dominicacci'),(121,'Peta','Glassard'),(122,'Bili','Ingre'),(123,'Gay','Huertas'),(124,'Esmaria','Spain-Gower'),(125,'Yvonne','Vater'),(126,'Harlin','Bondar'),(127,'Adlai','Kitcat'),(128,'Woodman','McKeurtan'),(129,'Colby','Necolds'),(130,'Ailina','Hatherill'),(131,'Chicky','Haster'),(132,'Malachi','Dorin'),(133,'Tricia','Earengey'),(134,'Arluene','Barmby'),(135,'Dalia','Alwood'),(136,'Brigham','MacKay'),(137,'Grantham','McGerr'),(138,'Talbert','Coverdale'),(139,'Dieter','Stoneman'),(140,'Darill','Chevin'),(141,'Neall','Jenik'),(142,'Issie','Skeermor'),(143,'Lauree','Gownge'),(144,'Crosby','Pitblado'),(145,'Fayth','Dollin'),(146,'Janith','Coyte'),(147,'Livvyy','Lehr'),(148,'Barnabe','Fleckno'),(149,'Quill','Pane'),(150,'Meir','Seymark'),(151,'Kissie','Tullot'),(152,'Vern','Largen'),(153,'Eveleen','Killcross'),(154,'Mickie','Maxwaile'),(155,'Cathryn','De Malchar'),(156,'Eva','Minchell'),(157,'Joellyn','Jakoviljevic'),(158,'Salomo','Colam'),(159,'Griffy','Ponton'),(160,'Ferris','Dewdney'),(161,'Poul','Padwick'),(162,'Hogan','Stephens'),(163,'Ronny','Kennelly'),(164,'Tatiana','Hampshire'),(165,'Borden','Jaukovic'),(166,'Devinne','Knowling'),(167,'Nanette','Emmot'),(168,'Dalton','Craisford'),(169,'Sena','Trainer'),(170,'Nathanial','Casol'),(171,'Amye','Sacher'),(172,'Priscilla','Ovey'),(173,'Julissa','Held'),(174,'Annabella','Cordner'),(175,'Sadie','Coulbeck'),(176,'Maurizia','Curds'),(177,'Nancee','Laughnan'),(178,'Jodi','Gorvin'),(179,'Alina','Jepson'),(180,'Valentia','Rapelli'),(181,'Zonnya','Dermott'),(182,'Bethany','Caughey'),(183,'Ches','Tisor'),(184,'Stevana','Thorsen'),(185,'Kordula','Arnopp'),(186,'Brenna','Bonnefin'),(187,'Antonia','Classen'),(188,'Jerrome','Domney'),(189,'Ailyn','Coil'),(190,'Gisele','Trevenu'),(191,'Jody','Rentelll'),(192,'Rafaelita','Lound'),(193,'Doug','Kirkebye'),(194,'Calli','Simeons'),(195,'Shelba','Huddles'),(196,'Tory','Costell'),(197,'Lucretia','Keppin'),(198,'Nissy','Grandham'),(199,'Munmro','McKniely'),(200,'Bert','Mirfin');
/*!40000 ALTER TABLE `busdriver` ENABLE KEYS */;
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
