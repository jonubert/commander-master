<?php
//push_the_question.php

$myTable="playertable";
$postedQuestionNumber=json_decode(file_get_contents("php://input"));
$A1=mysql_real_escape_string($postedQuestionNumber->A1);
$A2=mysql_real_escape_string($postedQuestionNumber->A2);
$A3=mysql_real_escape_string($postedQuestionNumber->A3);
$A4=mysql_real_escape_string($postedQuestionNumber->A4);
$QT=mysql_real_escape_string($postedQuestionNumber->QT);
$QN=mysql_real_escape_string($postedQuestionNumber->QN);

require_once("connect_winter_camp.php");

$sql = "UPDATE ".$myTable." SET CurrentQuestionText='".$QT."',CurrentQuestionAnswer1='".$A1."',
        CurrentQuestionAnswer2='".$A2."', CurrentQuestionAnswer3='".$A3."',
        CurrentQuestionAnswer4='".$A4."', CurrentQuestionAnswerSubmitted=0,
        CurrentQuestionNumber='".$QN."', CurrentQuestionCorrectAnswer=0";

if ($connect->query($sql) === TRUE) {
     $jsonData = "Records updated successfully";
} else {
    $jsonData = "Error updating record: " . $connect->error;
}

echo $jsonData;
$connect->close();
?>
