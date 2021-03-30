-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2021 at 10:39 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contacts`
--
CREATE DATABASE IF NOT EXISTS `contacts` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `contacts`;

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

DROP TABLE IF EXISTS `leads`;
CREATE TABLE `leads` (
  `leadID` int(10) NOT NULL,
  `leadName` varchar(25) NOT NULL,
  `leadAddress` varchar(25) NOT NULL,
  `leadPhone` varchar(10) NOT NULL,
  `leadMail` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`leadID`, `leadName`, `leadAddress`, `leadPhone`, `leadMail`) VALUES
(2, 'California', 'Danny De Vito', '5165416546', 'danny@gmail.com'),
(5, 'john mogi', 'pardes hanna', '0509382456', 'anguru@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `leadsources`
--

DROP TABLE IF EXISTS `leadsources`;
CREATE TABLE `leadsources` (
  `leadDate` datetime(6) NOT NULL,
  `leadID` int(10) DEFAULT NULL,
  `site` tinyint(1) NOT NULL,
  `facebook` tinyint(1) NOT NULL,
  `manual` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`leadID`);

--
-- Indexes for table `leadsources`
--
ALTER TABLE `leadsources`
  ADD KEY `leadID` (`leadID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `leadID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `leadsources`
--
ALTER TABLE `leadsources`
  ADD CONSTRAINT `leadsources_ibfk_1` FOREIGN KEY (`leadID`) REFERENCES `leads` (`leadID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
