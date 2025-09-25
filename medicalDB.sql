-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 25, 2025 at 10:11 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medicalDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `diagnosis` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `name`, `age`, `gender`, `email`, `phone`, `address`, `diagnosis`, `created_at`) VALUES
(1, 'John Doe', 45, 'Male', 'john.doe@example.com', '1234567890', '123 Main St, New York', 'Diabetes Type 2', '2025-09-23 14:19:29'),
(2, 'Jane Smith', 32, 'Female', 'jane.smith@example.com', '0987654321', '456 Elm St, Chicago', 'Hypertension', '2025-09-23 14:19:29'),
(3, 'Ali Khan', 60, 'Male', 'ali.khan@example.com', '03001234567', 'Lahore, Pakistan', 'Arthritis', '2025-09-23 14:19:29'),
(4, 'Maria Garcia', 27, 'Female', 'maria.garcia@example.com', '5559876543', 'San Jose, California', 'Pregnancy Checkup', '2025-09-23 14:19:29'),
(5, 'Ahmed Yousuf', 50, 'Male', 'ahmed.yousuf@example.com', '0333555666', 'Karachi, Pakistan', 'Cholesterol Issues', '2025-09-23 14:19:29'),
(6, 'Emily Davis', 39, 'Female', 'emily.davis@example.com', '4443332222', 'Houston, Texas', 'Asthma', '2025-09-23 14:19:29'),
(7, 'Mohammed Zaid', 22, 'Male', 'zaid.m@example.com', '03457777888', 'Rawalpindi, Pakistan', 'General Fever', '2025-09-23 14:19:29'),
(8, 'Fatima Noor', 30, 'Female', 'fatima.noor@example.com', '03111222333', 'Islamabad, Pakistan', 'Migraine', '2025-09-23 14:19:29'),
(9, 'Kevin Lee', 70, 'Male', 'kevin.lee@example.com', '6665554444', 'Los Angeles, California', 'Heart Disease', '2025-09-23 14:19:29'),
(10, 'Sara Johnson', 26, 'Female', 'sara.j@example.com', '9998887777', 'Miami, Florida', 'Routine Checkup', '2025-09-23 14:19:29'),
(11, 'khan21', 21, 'Male', NULL, NULL, NULL, 'General Fever', '2025-09-24 21:15:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Meherban', 'meherban.shahg@gmail.com', '$2b$10$vwqN1KlW8Kflm2kfFVJoV.xyx2a6J2P/yJr4/sO0izq99NDkNf10a', 'user', '2025-09-24 11:34:57'),
(2, 'admin', 'admin@gmail.com', '$2b$10$9SzGv6RaNGgA.kR/PQ8ZEOAkxu/ZCgVSaJLgDjL1MoOrQBQUMzzbG', 'admin', '2025-09-24 18:13:45'),
(3, 'Japan', 'japan@gmail.com', '$2b$10$zQTTLdfSdBAraSSQYWVQ8uudLGX6Q9alY2d4v1ARkC5xnF5xbinsy', 'user', '2025-09-25 19:09:51'),
(4, 'shah@gmail.com', 'shah@gmail.com', '$2b$10$vz1DrTNrHHvIv14/2OUk8.Fk6a0twzJDFwafmAJtvM7WzHJ2RkZ/6', 'user', '2025-09-25 19:21:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
