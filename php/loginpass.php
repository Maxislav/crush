<?php
/*$connect = array(
    'login' => 'u421137053_root',
    'pass' => 'glider',
    'host' => 'mysql.hostinger.com.ua',
    'table' => 'u421137053_1',
);*/
$connect = array(
    'login' => 'root',
    'pass' => 'astalavista',
    'host' => 'localhost',
    'table' => 'monitoring',
);
$db = mysql_connect($connect['host'], $connect['login'], $connect['pass']) //соединение с базой данных
or die('connect to database failed');
$table = $connect['table'];
mysql_select_db($table) or die('db not found');
mysql_query("SET NAMES utf8");