<?php

require_once('loginpass.php');




$res = mysql_query("SELECT * FROM released ORDER BY city");
$points = array();
if (mysql_num_rows($res) > 0) {


    while ($row = mysql_fetch_array($res)) {
        // $points[$c] = $row['name'] ;
        array_push($points,
            array(
                'city' => $row['city'],
                'ico'=> $row['ico'],
                'comment'=> $row['comment'],
                'id' =>$row['id']
            )
        );
        //$c++;
        // $dd = $row['name'];
    }
}
//$points = json_encode($points);
echo preg_replace_callback(
    '/\\\u([0-9a-fA-F]{4})/',
    create_function('$match', 'return mb_convert_encoding("&#" . intval($match[1], 16) . ";", "UTF-8", "HTML-ENTITIES");'),
    json_encode($points)
)
?>
