<?php

$lat =  $_POST["lat"];
$lng =  $_POST["lng"];
$name = $_POST["name"];
$popup = $_POST["popup"];
require_once('loginpass.php');


$sql = "INSERT INTO crush(id, lat, lng, popup, name) values(null , '$lat', '$lng', '$popup', '$name') ";
if (!mysql_query($sql, $db)) {
    die('Error: ' . mysql_error());
}

$id;
$res = mysql_query("SELECT * FROM crush ORDER BY id  DESC LIMIT 1");
while ($row = mysql_fetch_array($res)){
    $id = $row['id'];
}

mysql_close($db);

echo $id;