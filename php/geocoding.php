<?php


$c = file_get_contents("http://maps.google.com/maps/api/js?sensor=false");


$c= str_replace("document.write", '$("head").append', $c);

$c= str_replace("function getScript(src)", 'function getOllo(src)', $c);

echo $c;
?>