-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2025 at 07:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kinder`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`) VALUES
(1, 'Ayesha Rahman', 'ayesha@kinder.admin.ac.bd', 'pass1234'),
(2, 'Tanvir Ahmed', 'tanvir@kinder.admin.ac.bd', 'tanvir@123'),
(3, 'Mariam Hossain', 'mariam@kinder.admin.ac.bd', 'mariamPass'),
(4, 'Rafiul Islam', 'rafiul@kinder.admin.ac.bd', 'rafiul321'),
(5, 'Nazia Karim', 'nazia@kinder.admin.ac.bd', 'naziaSecure');

-- --------------------------------------------------------

--
-- Table structure for table `babysitter`
--

CREATE TABLE `babysitter` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `days_you_are_free` int(11) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `babysitter`
--

INSERT INTO `babysitter` (`id`, `name`, `location`, `days_you_are_free`, `password`, `email`, `latitude`, `longitude`, `active`) VALUES
(1, 'dipto ', 'Dhaka', 12, 'Pass123', 'dipto@gmail.com', 23.80452690, 90.39803982, 1),
(2, 'dipto ', 'Dhaka', NULL, 'Pass124', 'dipto2@gmail.com', 23.80530000, 90.41750000, 0),
(3, 'ankan', 'Dhaka', NULL, 'Pass125', 'ankan@gmail.com', 23.81530000, 90.40750000, 0),
(4, 'dipto ', 'Dhaka', NULL, 'Pass126', 'dipto3@gmail.com', 23.81230000, 90.41550000, 0),
(5, 'ankan', 'Dhaka', NULL, 'Pass127', 'ankan2@gmail.com', 23.80730000, 90.41050000, 0),
(6, 'ankan11', 'Dhaka', NULL, 'Pass128', 'ankan11@gmail.com', 23.81330000, 90.41350000, 0),
(7, 'dipto', 'Dhaka', NULL, 'Pass129', 'dipto4@gmail.com', 23.80830000, 90.41650000, 0),
(8, 'farah bhka', 'Dhaka', NULL, 'Pass130', 'farah@gmail.com', 23.81630000, 90.40850000, 0),
(9, 'alpha', 'Dhaka', NULL, 'Pass131', 'alpha@gmail.com', 23.81130000, 90.41150000, 0),
(10, 'alpha', 'Dhaka', 10, 'Pass132', 'alpha2@gmail.com', 23.80450727, 90.38555145, 0);

-- --------------------------------------------------------

--
-- Table structure for table `confirmation`
--

CREATE TABLE `confirmation` (
  `sitter_id` int(11) NOT NULL,
  `sitter_name` varchar(100) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `parent_name` varchar(100) NOT NULL,
  `parent_confirm` tinyint(1) DEFAULT 0,
  `sitter_confirm` tinyint(4) DEFAULT 0,
  `link` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `confirmation`
--

INSERT INTO `confirmation` (`sitter_id`, `sitter_name`, `parent_id`, `parent_name`, `parent_confirm`, `sitter_confirm`, `link`, `date`) VALUES
(10, 'alpha', 8, 'lamia mahzabin', 0, 0, 'https://meet.google.com/huk-srsg-dze', NULL),
(7, 'dipto', 8, 'lamia mahzabin', 1, 0, NULL, NULL),
(10, 'alpha', 8, 'lamia mahzabin', 1, 0, NULL, '2025-05-13'),
(10, 'alpha', 8, 'lamia mahzabin', 1, 0, NULL, '2025-05-14'),
(10, 'alpha', 8, 'lamia mahzabin', 1, 0, NULL, '2025-05-15'),
(10, 'alpha', 5, 'Tania Karim', 1, 0, 'http://localhost:3000/meeting/14994b29-27a0-4229-98de-948befd88911', '2025-05-20'),
(1, 'dipto', 5, 'Tania Karim', 1, 0, 'http://localhost:3000/meeting/366625f3-3072-4dcc-b6d4-456b66b28a97', '2025-05-14'),
(5, 'ankan', 5, 'Tania Karim', 1, 0, NULL, '2025-05-13');

-- --------------------------------------------------------

--
-- Table structure for table `parent`
--

CREATE TABLE `parent` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `stubborn_level` int(11) DEFAULT NULL,
  `days_you_need` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `about_you` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent`
--

INSERT INTO `parent` (`id`, `name`, `email`, `password`, `stubborn_level`, `days_you_need`, `amount`, `about_you`) VALUES
(1, 'Farzana Rahman', 'farzana@kinder.ac.bd', 'pass123', 2, 3, 5000, 'Single mother looking for part-time help.'),
(2, 'Shafiq Islam', 'shafiq@kinder.ac.bd', 'safe456', 3, 5, 7000, 'Working dad with twins.'),
(3, 'Nasima Khatun', 'nasima@kinder.ac.bd', 'nasima789', 1, 2, 3000, 'Needs occasional babysitting on weekends.'),
(4, 'Jamal Uddin', 'jamal@kinder.ac.bd', 'jamal456', 4, 6, 8000, 'Strict but caring parent of 3.'),
(5, 'Tania Karim', 'tania@kinder.ac.bd', 'tania999', 2, 4, 6000, 'Remote worker, needs help during meetings.'),
(6, 'ankan', 'ankan112@kinder.ac.bd', '', NULL, NULL, NULL, NULL),
(7, 'ankan11', 'ankan1112@kinder.ac.bd', 'asdfew', NULL, NULL, NULL, NULL),
(8, 'lamia mahzabin', 'lamia@kinder.ac.bd', 'asdf', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `parent_id` varchar(20) NOT NULL,
  `parent_name` varchar(100) NOT NULL,
  `transaction_id` varchar(50) NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `parent_id`, `parent_name`, `transaction_id`, `amount`, `payment_date`) VALUES
(8, '8', 'lamia mahzabin', '', 2700.00, '2025-05-10 12:38:54'),
(9, '5', 'Tania Karim', '', 4800.00, '2025-05-10 17:11:06');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `find_instant` varchar(255) DEFAULT NULL,
  `book_appointment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sitter_record`
--

CREATE TABLE `sitter_record` (
  `record_id` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `link` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sitter_record`
--

INSERT INTO `sitter_record` (`record_id`, `id`, `name`, `link`) VALUES
(1, 6, 'ankan11', 'https://youtu.be/48f7GexVGMI?si=esYsgW3wbH97SGuM'),
(2, 6, 'ankan11', 'https://youtu.be/ejTMnwW_3_E?si=Kp6WhbD0k3BnH36a'),
(3, 6, 'ankan11', 'https://youtu.be/ygmW8Y5lulo?si=wq1Sp_wlspP0Qn9d');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'user',
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `babysitter`
--
ALTER TABLE `babysitter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parent`
--
ALTER TABLE `parent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sitter_record`
--
ALTER TABLE `sitter_record`
  ADD PRIMARY KEY (`record_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `babysitter`
--
ALTER TABLE `babysitter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `parent`
--
ALTER TABLE `parent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `sitter_record`
--
ALTER TABLE `sitter_record`
  MODIFY `record_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
