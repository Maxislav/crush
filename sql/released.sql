-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Авг 17 2014 г., 02:02
-- Версия сервера: 5.5.38
-- Версия PHP: 5.3.10-1ubuntu3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `monitoring`
--

-- --------------------------------------------------------

--
-- Структура таблицы `released`
--

CREATE TABLE IF NOT EXISTS `released` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` text CHARACTER SET utf8 NOT NULL,
  `ico` text NOT NULL,
  `comment` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

--
-- Дамп данных таблицы `released`
--

INSERT INTO `released` (`id`, `city`, `ico`, `comment`) VALUES
(14, 'Kiev City', '', 'Глава: Владимир Спицын\nТелефон: 093 880 37 80\nhttps://www.facebook.com/groups/539257982849958/'),
(15, 'Kiev', '', 'Глава: Гайшук Роман Дмитриевич\n\nТелефон: 093 119 31 10\nАдрес офиса: 01001, г. Киев, ул. Грушевского Михаила 16, оф. №3\nhttps://www.facebook.com/groups/889527881074212/'),
(16, 'Zhytomyr', '', 'Глава: Сергей Грибук'),
(17, 'Zaporizhzhya', '', 'Глава: Евгений Степанов\n\nТелефон: 0991132621 или 0933428248'),
(18, 'Cherkasy', '', 'Глава: Гартингер Сергей\nhttps://www.youtube.com/channel/UC0dGQrK2qgYo9rjxN_Cw5EQ'),
(19, 'Kharkiv', '', 'Глава: Гальченко Юрий Николаевич\r\nhttps://www.facebook.com/groups/265112496858688/'),
(20, 'Kherson', '', 'Глава: Золотаревский Константин Александрович\n\nhttps://www.facebook.com/groups/1450236291880605/'),
(21, 'Odessa', '', 'Глава: Олег Логинов\n\nhttps://www.facebook.com/groups/711575205567961/'),
(22, 'Sumy', '', 'Глава: Милославский Михаил\n\nhttps://www.facebook.com/groups/755700631106683/'),
(23, 'Mykolayiv', '', 'Глава: Владимир Дзюбак\nhttps://www.facebook.com/groups/5.10.nikolaev/'),
(24, 'Poltava', '', 'Глава: Кузько Максим Александрович\nhttps://www.facebook.com/groups/501306743307551/'),
(25, 'Rivne', '', 'Глава: Троцкий Пётр Петрович\n\nhttps://www.facebook.com/groups/271377596357659/'),
(26, 'Transcarpathia', '', 'Глава: Бедей Александр Иванович\nhttps://www.facebook.com/5.10zakarpattia'),
(27, 'Kirovohrad', '', 'Глава: Артём Кравченко\n\nhttps://www.facebook.com/groups/5.10kirovograd/'),
(28, 'Vinnytsya', '', 'Глава: Евгений Егоров\nhttps://www.facebook.com/groups/5.10Vinnitsa5.10/');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
