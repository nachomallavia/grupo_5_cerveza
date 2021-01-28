-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: cerveza_db
-- ------------------------------------------------------
-- Server version	5.7.32

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `id_maker` int(20) NOT NULL,
  `id_category` int(20) NOT NULL,
  `rating` float DEFAULT NULL,
  `abv` float(10,3) NOT NULL,
  `ibu` int(3) NOT NULL,
  `id_srm` float NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` float(5,2) NOT NULL,
  `id_format` int(3) NOT NULL,
  `capacity` int(10) NOT NULL,
  `image` varchar(40) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_maker` (`id_maker`),
  KEY `id_category` (`id_category`),
  KEY `id_srm` (`id_srm`),
  KEY `id_format` (`id_format`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_maker`) REFERENCES `makers` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_ibfk_4` FOREIGN KEY (`id_format`) REFERENCES `formats` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Porter',2,2,1,5.200,27,28,'Maltas oscuras. Sabor y aroma penetrante y nocturno. Chocolate, azúcar negro y café. La Porter es la cerveza tributo de Antares a la cultura de los primeros pubs en el puerto de Londres.',450.00,2,500,'Porter_picture.jpeg','2021-01-24 20:02:49','2021-01-24 20:02:49'),(2,'Gose Tonic',4,7,5,3.000,6,2,'Esta es una Sour Salty Gose con pepino y bayas de enebro, emulando el mejor gin-tonic.',350.00,1,330,'Gose Tonic_picture copy.jpg','2021-01-24 20:02:49','2021-01-24 20:02:49'),(3,'Nebulosa',11,3,5,6.000,30,4,'Una Hazy IPA con un gran protagonismo del lúpulo.',370.00,1,473,'Nebulosa_picture.png','2021-01-24 20:02:49','2021-01-24 20:02:49'),(4,'24.7',12,3,4,4.000,36,8,'Cerveza estilo Session IPA, muy tomable y refrescante, de amargor marcado otorgado por una combinación de lúpulos patagónicos. Cuenta con un intenso aroma a cítrico y frutal.',230.00,2,730,'24.7_picture.jpg','2021-01-24 20:02:49','2021-01-24 20:02:49'),(5,'American IPA',2,3,2,6.000,55,6,' ',290.00,1,473,'American IPA_picture.jpg','2021-01-24 20:07:18','2021-01-24 20:07:18'),(6,'Tiempo de valientes',6,3,4,7.000,46,3,'India Pale Lager con lúpulo Columbus, Cascade, Simcoe y Mosaic. Por estos extraños tiempos de valientes.',340.00,1,330,'Tiempo de valientes_picture.jpg','2021-01-24 20:09:11','2021-01-24 20:09:11');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-24 20:10:23
