<?php
$city = $_POST["city"];
$comment = $_POST["comment"];
require_once('loginpass.php');

$city = security($city);
function security($val){
    $val = str_replace("`", "", $val);
    $val = str_replace("'", "\'", $val);
    $val = str_replace("\"", "", $val);
    $val = str_replace("\r\n", '', $val);
    $val = str_replace("\n", '', $val);
    return $val;
}


mysql_query("SET NAMES utf8");
$res = mysql_query("SELECT * FROM released where city='$city' ORDER BY id");
$id;
while ($row = mysql_fetch_array($res)){
    $id = $row['id'];
}


if($id){
    echo 'err';
}else{

    $sql = "INSERT INTO released(id, city, ico, comment) values(null , '$city', '', '$comment') ";
    if (!mysql_query($sql, $db)) {
        die('Error: ' . mysql_error());
    }
    echo 'ok' ;
}
mysql_close($db);

?>