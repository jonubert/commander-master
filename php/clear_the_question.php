<?php
//clear_the_question.php

$myTable="playertable";
require_once("connect_winter_camp.php");

$sql = "UPDATE ".$myTable." SET CurrentQuestionText=0,CurrentQuestionAnswer1=0,
        CurrentQuestionAnswer2=0, CurrentQuestionAnswer3=0,
        CurrentQuestionAnswer4=0, CurrentQuestionAnswerSubmitted=0,
        CurrentQuestionNumber=0, CurrentQuestionCorrectAnswer=0 ";

if ($connect->query($sql) === TRUE) {
     $jsonData = "Records updated successfully";
} else {
    $jsonData = "Error updating record: " . $connect->error;
}

echo $jsonData;
$connect->close();
?>
