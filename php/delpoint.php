<?php
$_id = $_POST['id'];

require_once('loginpass.php');


$sql = "DELETE FROM fiveten WHERE id = $_id";
if (!mysql_query($sql, $db)) {
    die('Error: ' . mysql_error());
}

echo 'ok';