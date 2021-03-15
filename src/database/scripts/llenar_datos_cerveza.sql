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
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Todas'),(2,'Porter'),(3,'IPA'),(4,'APA'),(5,'Stout'),(6,'Pale Ale'),(7,'Sour'),(8,'Wheat'),(9,'Brown'),(10,'Amber'),(11,'Scotch Ale'),(12,'Dark Lager'),(13,'Bock'),(14,'Pale Lager'),(15,'Belgian');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `combos`
--

LOCK TABLES `combos` WRITE;
/*!40000 ALTER TABLE `combos` DISABLE KEYS */;
/*!40000 ALTER TABLE `combos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `combos_products`
--

LOCK TABLES `combos_products` WRITE;
/*!40000 ALTER TABLE `combos_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `combos_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `formats`
--

LOCK TABLES `formats` WRITE;
/*!40000 ALTER TABLE `formats` DISABLE KEYS */;
INSERT INTO `formats` VALUES (1,'Lata'),(2,'Botella'),(3,'Tirada');
/*!40000 ALTER TABLE `formats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `makers`
--

LOCK TABLES `makers` WRITE;
/*!40000 ALTER TABLE `makers` DISABLE KEYS */;
INSERT INTO `makers` VALUES (1,'Todos'),(2,'Antares'),(3,'Capitán Lúpulo'),(4,'Juguetes Perdidos'),(5,'Sir Hopper'),(6,'Strange Brewing'),(7,'Gante'),(8,'Brew House'),(9,'Deliryum'),(10,'Gorila'),(11,'Kraken'),(12,'Patagonia'),(13,'Andes'),(14,'Santina'),(15,'Quilmes'),(16,'Palermo'),(17,'Schneider'),(18,'Rabieta');
/*!40000 ALTER TABLE `makers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Porter',2,2,1,5.200,27,28,'Maltas oscuras. Sabor y aroma penetrante y nocturno. Chocolate, azúcar negro y café. La Porter es la cerveza tributo de Antares a la cultura de los primeros pubs en el puerto de Londres.',450.00,2,500,'Porter_picture.jpeg','2021-01-24 20:02:49','2021-01-24 20:02:49'),(2,'Gose Tonic',4,7,5,7.000,6,6,'Esta es una Sour Salty Gose con pepino y bayas de enebro, emulando el mejor gin-tonic.',350.00,1,330,'Gose Tonic_picture.jpg','2021-01-24 20:02:49','2021-02-18 03:09:55'),(3,'Nebulosa',1,1,5,6.000,30,1,'Una Hazy IPA con un gran protagonismo del lúpulo.',370.00,1,473,'Nebulosa_picture.jpg','2021-01-24 20:02:49','2021-01-28 04:16:55'),(4,'24.7',12,3,4,4.000,36,8,'Cerveza estilo Session IPA, muy tomable y refrescante, de amargor marcado otorgado por una combinación de lúpulos patagónicos. Cuenta con un intenso aroma a cítrico y frutal.',230.00,2,730,'24.7_picture.jpg','2021-01-24 20:02:49','2021-01-24 20:02:49'),(5,'American IPA',2,3,2,6.000,55,6,' ',290.00,1,473,'American IPA_picture.jpg','2021-01-24 20:07:18','2021-01-24 20:07:18'),(6,'Tiempo de valientes',6,3,4,4.000,46,3,'India Pale Lager con lúpulo Columbus, Cascade, Simcoe y Mosaic. Por estos extraños tiempos de valientes.',340.00,1,330,'Tiempo de valientes_picture.jpg','2021-01-24 20:09:11','2021-01-28 04:28:11');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `srm_index`
--

LOCK TABLES `srm_index` WRITE;
/*!40000 ALTER TABLE `srm_index` DISABLE KEYS */;
INSERT INTO `srm_index` VALUES (1,'#ffe699'),(2,'#ffd978'),(3,'#ffca5a'),(4,'#ffbf43'),(5,'#f8a700'),(6,'#f39c00'),(7,'#ea8f00'),(8,'#e78500'),(9,'#de7c00'),(10,'#d77200'),(11,'#d06900'),(12,'#ca6200'),(13,'#c35901'),(14,'#bb5000'),(15,'#b64c00'),(16,'#b04500'),(17,'#a63e00'),(18,'#a03700'),(19,'#9c3200'),(20,'#962d00'),(21,'#8f2a00'),(22,'#872301'),(23,'#811e00'),(24,'#7c1a01'),(25,'#771900'),(26,'#701400'),(27,'#6a0e00'),(28,'#660d00'),(29,'#5e0c00'),(30,'#5a0a03'),(31,'#600902'),(32,'#530908'),(33,'#4b0505'),(34,'#460606'),(35,'#440607'),(36,'#3f0708'),(37,'#3a0608'),(38,'#3a080b'),(39,'#36080a'),(40,'#1e0206');
/*!40000 ALTER TABLE `srm_index` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'user'),(2,'admin'),(3,'guest');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (23,'','jose@db.db','jose@eliopez.com-1607988076966.jpg','123123123','0000-00-00',2,'2021-01-28 19:09:10','2021-01-28 19:09:10'),(24,'','nacho@eliopez.com','nacho@eliopez.com-1607988135402.jpg','123123123','0000-00-00',2,'2021-01-28 19:22:13','2021-01-28 19:22:13'),(25,'','mati@eliopez.com','mati@eliopez.com-1607988180126.jpg','123123123','0000-00-00',NULL,'2021-01-28 19:22:22','2021-01-28 19:22:22'),(26,'','ian@eliopez.com','ian@eliopez.com-1607988225709.jpg','123123123','0000-00-00',2,'2021-01-28 19:23:56','2021-01-28 19:23:56'),(27,'','jose@db.db','eliopez.jpg','123123123','0000-00-00',NULL,'2021-01-28 19:23:59','2021-01-28 19:23:59'),(28,NULL,'nacho4@eliopez.com','eliopez.jpg','$2a$12$fwkuAbgteIkfFC5.YuGTH.I8mIn04vZUuFIehZ6OXuT/n/GIdVnuO','1987-04-23',2,'2021-02-09 00:16:37','2021-02-09 00:16:37'),(29,NULL,'nacho@mail.com','eliopez.jpg','$2a$12$4UZLiIiycgQOYbM../8eyuv8U7gsYG5dX4hF9gi5SUoT6XszxOCjy','1987-04-23',2,'2021-02-18 01:40:58','2021-02-18 01:40:58'),(30,NULL,'user@mail.com','eliopez.jpg','$2a$12$i1Zf9Tivzy.EdVh73gEQSOOxLFxDM.PhV/SZV29MitHY2HDDqgPsy','2000-11-11',1,'2021-02-18 02:43:46','2021-02-18 02:43:46');
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

-- Dump completed on 2021-03-11 20:37:59
