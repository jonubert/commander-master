<?php
//load_all_players.php

$myTable="playertable";
$postedQuestionNumber=json_decode(file_get_contents("php://input"));

require_once("connect_winter_camp.php");

$sqlString = "select * FROM ".$myTable;
$query = $connect->query($sqlString) or	die("What are you trying to do?" .mysql_error());

$jsonData = array();
while ($array = mysqli_fetch_assoc($query)) {
    $jsonData[] = $array;
}
echo json_encode($jsonData);
$connect->close();
?>
