<?php
//reveal_the_answer.php

$myTable="playertable";
$postedQuestionNumber=json_decode(file_get_contents("php://input"));
require_once("connect_winter_camp.php");


$CA=mysql_real_escape_string($postedQuestionNumber->CA);
$sql = "UPDATE ".$myTable." SET CurrentQuestionCorrectAnswer='".$CA."'";

if ($connect->query($sql) === TRUE) {
     $jsonData = "Records updated successfully";
} else {
    $jsonData = "Error updating record: " . $connect->error;
}

echo $jsonData;
$connect->close();
?>
