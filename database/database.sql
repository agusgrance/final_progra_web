-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-03-2023 a las 19:25:43
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `final_progra_web`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `chat`
--

INSERT INTO `chat` (`id`, `sender_id`, `receiver_id`, `message`, `timestamp`) VALUES
(1, 15, 18, 'prueba', '2023-02-28 02:28:23'),
(3, 15, 18, 'hola!', '2023-02-28 02:57:17'),
(4, 18, 15, 'hola amigo', '2023-02-28 02:57:19'),
(5, 18, 15, 'como estas?', '2023-02-28 22:16:31'),
(6, 18, 15, 'buenasss', '2023-02-28 22:45:30'),
(7, 18, 15, 'asdasd', '2023-02-28 22:45:58'),
(8, 18, 18, 'alo', '2023-02-28 22:46:07'),
(9, 18, 19, 'holaaa', '2023-02-28 22:46:11'),
(10, 19, 18, 'como estas?', '2023-02-28 22:46:44'),
(11, 19, 15, 'hola sir', '2023-02-28 22:46:54'),
(12, 18, 19, 'bien y vos', '2023-02-28 23:07:23'),
(13, 19, 18, 'asdasd', '2023-02-28 23:32:21'),
(14, 19, 18, 'sadasdasdasd', '2023-02-28 23:32:23'),
(18, 18, 19, 'http://localhost:4200/post/40', '2023-03-01 14:47:16'),
(19, 18, 18, 'http://localhost:4200/post/40', '2023-03-01 14:47:21'),
(20, 18, 15, 'http://localhost:4200/post/40', '2023-03-01 14:47:22'),
(21, 18, 15, 'http://localhost:4200/post/40', '2023-03-01 14:50:04'),
(22, 18, 18, 'http://localhost:4200/post/40', '2023-03-01 14:50:07'),
(23, 18, 15, 'http://localhost:4200//dashboard', '2023-03-01 15:18:39'),
(24, 18, 15, '/post/40', '2023-03-01 15:22:16'),
(25, 18, 15, 'http://localhost:420040', '2023-03-01 15:23:17'),
(26, 18, 15, 'http://localhost:4200/40', '2023-03-01 15:23:38'),
(27, 18, 15, 'http://localhost:4200/post/40', '2023-03-01 15:23:57'),
(28, 18, 19, 'http://localhost:4200/post/40', '2023-03-01 15:24:08'),
(29, 18, 15, 'http://localhost:4200/post/42', '2023-03-01 15:32:02'),
(30, 18, 19, 'http://localhost:4200/post/42', '2023-03-01 15:34:29'),
(31, 18, 19, 'http://localhost:4200/post/40', '2023-03-01 15:40:19'),
(32, 18, 15, 'https://bookshelfapp.000webhostapp.com//post/43', '2023-03-01 16:06:07'),
(33, 18, 18, 'https://bookshelfapp.000webhostapp.com//post/40', '2023-03-01 16:06:26'),
(34, 18, 18, 'https://bookshelfapp.000webhostapp.com//post/42', '2023-03-01 16:06:43'),
(35, 18, 18, 'http://localhost:4200/post/42', '2023-03-01 16:14:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `posteo_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `texto` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `posteo_id`, `user_id`, `texto`) VALUES
(1, 40, 18, 'sadasd'),
(5, 42, 18, 'asdasdasd'),
(6, 40, 18, 'asdasdfasfasfasf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `posteo_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id`, `posteo_id`, `user_id`) VALUES
(2, 41, 18),
(3, 42, 19),
(5, 40, 19),
(6, 41, 19),
(7, 43, 19),
(8, 42, 18),
(9, 43, 18),
(11, 40, 18),
(15, 40, 23),
(16, 44, 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posteos`
--

CREATE TABLE `posteos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` varchar(250) NOT NULL,
  `img` varchar(250) NOT NULL,
  `date` date NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `posteos`
--

INSERT INTO `posteos` (`id`, `user_id`, `text`, `img`, `date`, `isbn`, `rating`) VALUES
(44, 18, 'Muy buen libro', '../../assets/uploads/imageFigma.jpg', '2023-03-01', '1668001225', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `rol` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `rol` int(11) DEFAULT NULL,
  `avatar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `rol`, `avatar`) VALUES
(15, 'uces', '32431e7b90a7d8366d213d5895862c94', 'uces', 1, 'https://avatars.dicebear.com/api/initials/uc.svg'),
(18, 'agus', '071e476f6fd56aaae264fc9c6725feaa', 'agustingran@gmail.com', 2, 'https://avatars.dicebear.com/api/initials/ag.svg'),
(20, 'pedro', 'c6cc8094c2dc07b700ffcc36d64e2138', 'pedro', 2, 'https://avatars.dicebear.com/api/initials/pe.svg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `posteos`
--
ALTER TABLE `posteos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `posteos`
--
ALTER TABLE `posteos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
