-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Jan 24, 2026 at 06:46 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistema_viajes`
--

-- --------------------------------------------------------

--
-- Table structure for table `colaboradores`
--

CREATE TABLE `colaboradores` (
  `cl_cedula` varchar(13) NOT NULL,
  `cl_nombre` varchar(50) NOT NULL,
  `cl_apellido` varchar(50) NOT NULL,
  `cl_direccion` text NOT NULL,
  `cl_estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colaboradores`
--

INSERT INTO `colaboradores` (`cl_cedula`, `cl_nombre`, `cl_apellido`, `cl_direccion`, `cl_estado`) VALUES
('0501199808765', 'Jackeline', 'Peña', 'Omoa, Cortes', 1),
('0502200203769', 'Josue', 'molina', 'San Marcos', 1),
('3879283748927', 'ERICK', 'ORTEGA', '8524 Dahlia Drive', 0),
('7777777777777', 'ERICK', 'ORTEGA', '8524 Dahlia Drive', 1),
('8888888888888', 'Erick', 'Molina', '8524 Dahlia Drive', 1);

-- --------------------------------------------------------

--
-- Table structure for table `colaborador_sucursal`
--

CREATE TABLE `colaborador_sucursal` (
  `cl_cedula` varchar(13) NOT NULL,
  `sc_id` int(11) NOT NULL,
  `distancia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colaborador_sucursal`
--

INSERT INTO `colaborador_sucursal` (`cl_cedula`, `sc_id`, `distancia`) VALUES
('0501199808765', 1, 27),
('0502200203769', 1, 23),
('0502200203769', 2, 45),
('0502200203769', 3, 45),
('3879283748927', 2, 23),
('3879283748927', 3, 12),
('7777777777777', 1, 2),
('7777777777777', 2, 23),
('7777777777777', 3, 2),
('8888888888888', 1, 33);

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `rl_id` int(11) NOT NULL,
  `rl_nombre` varchar(50) NOT NULL,
  `rl_descripcion` text NOT NULL,
  `rl_estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`rl_id`, `rl_nombre`, `rl_descripcion`, `rl_estado`) VALUES
(1, 'Gerente de Tienda', 'Super admin con acceso a todo el sistema', 1),
(2, 'Usuario', 'administrador con permisos mas limitados ', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sucursales`
--

CREATE TABLE `sucursales` (
  `sc_id` int(11) NOT NULL,
  `sc_nombre` varchar(50) NOT NULL,
  `sc_direccion` text NOT NULL,
  `sc_estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sucursales`
--

INSERT INTO `sucursales` (`sc_id`, `sc_nombre`, `sc_direccion`, `sc_estado`) VALUES
(1, 'SPS - Armenta', 'Boulevard de Armenta', 1),
(2, 'TGU - San ignasio', '4ta Calle Residencial San Ignacio. ', 1),
(3, 'CB - Villa Neen', '5ta Calle 3ave.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transportistas`
--

CREATE TABLE `transportistas` (
  `tr_id` int(11) NOT NULL,
  `tr_nombre` varchar(50) NOT NULL,
  `tr_tarifa` decimal(7,2) NOT NULL,
  `tr_estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transportistas`
--

INSERT INTO `transportistas` (`tr_id`, `tr_nombre`, `tr_tarifa`, `tr_estado`) VALUES
(1, 'Gorge Mata', 55.00, 1),
(2, 'Mayra Rosales', 50.00, 1),
(3, 'Jose Valle', 52.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `us_id` int(11) NOT NULL,
  `us_nombre` varchar(50) NOT NULL,
  `rl_id` int(11) NOT NULL,
  `us_edad` int(11) NOT NULL,
  `us_fecha_creacion` date DEFAULT current_timestamp(),
  `us_correo` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `us_estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`us_id`, `us_nombre`, `rl_id`, `us_edad`, `us_fecha_creacion`, `us_correo`, `password`, `us_estado`) VALUES
(1, 'Nancy', 1, 27, '2026-01-20', 'jpenia55@gmail.com', 'nancy', 1),
(2, 'Josue', 2, 23, '2026-01-20', '7josueortega111@gmail.com', 'josue', 1);

-- --------------------------------------------------------

--
-- Table structure for table `viajes`
--

CREATE TABLE `viajes` (
  `vj_id` int(11) NOT NULL,
  `us_id` int(11) NOT NULL,
  `sc_id` int(11) NOT NULL,
  `cl_cedula` varchar(13) NOT NULL,
  `tr_id` int(11) NOT NULL,
  `vj_costo` decimal(7,2) NOT NULL,
  `vj_fecha` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `vj_estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `colaboradores`
--
ALTER TABLE `colaboradores`
  ADD PRIMARY KEY (`cl_cedula`);

--
-- Indexes for table `colaborador_sucursal`
--
ALTER TABLE `colaborador_sucursal`
  ADD PRIMARY KEY (`cl_cedula`,`sc_id`),
  ADD KEY `sc_id` (`sc_id`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`rl_id`);

--
-- Indexes for table `sucursales`
--
ALTER TABLE `sucursales`
  ADD PRIMARY KEY (`sc_id`);

--
-- Indexes for table `transportistas`
--
ALTER TABLE `transportistas`
  ADD PRIMARY KEY (`tr_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`us_id`),
  ADD KEY `rl_id` (`rl_id`);

--
-- Indexes for table `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`vj_id`),
  ADD KEY `us_id` (`us_id`,`sc_id`,`cl_cedula`,`tr_id`),
  ADD KEY `tr_id` (`tr_id`),
  ADD KEY `sc_id` (`sc_id`),
  ADD KEY `cl_cedula` (`cl_cedula`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rol`
--
ALTER TABLE `rol`
  MODIFY `rl_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sucursales`
--
ALTER TABLE `sucursales`
  MODIFY `sc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transportistas`
--
ALTER TABLE `transportistas`
  MODIFY `tr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `us_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `viajes`
--
ALTER TABLE `viajes`
  MODIFY `vj_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `colaborador_sucursal`
--
ALTER TABLE `colaborador_sucursal`
  ADD CONSTRAINT `colaborador_sucursal_ibfk_1` FOREIGN KEY (`cl_cedula`) REFERENCES `colaboradores` (`cl_cedula`),
  ADD CONSTRAINT `colaborador_sucursal_ibfk_2` FOREIGN KEY (`sc_id`) REFERENCES `sucursales` (`sc_id`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rl_id`) REFERENCES `rol` (`rl_id`) ON UPDATE CASCADE;

--
-- Constraints for table `viajes`
--
ALTER TABLE `viajes`
  ADD CONSTRAINT `viajes_ibfk_2` FOREIGN KEY (`tr_id`) REFERENCES `transportistas` (`tr_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `viajes_ibfk_3` FOREIGN KEY (`us_id`) REFERENCES `usuarios` (`us_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `viajes_ibfk_4` FOREIGN KEY (`sc_id`) REFERENCES `sucursales` (`sc_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `viajes_ibfk_5` FOREIGN KEY (`cl_cedula`) REFERENCES `colaboradores` (`cl_cedula`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
