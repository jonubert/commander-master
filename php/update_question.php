<?php
/*$sql = 'UPDATE questiontable SET QuestionNumber='.$qNumber.',
        QuestionText= "'.$qText.'", Answer1="'.$Answer1.'", Answer2="'.$Answer2.'",
         Answer3="'.$Answer3.'", Answer4="'.$Answer4.'", CorrectAnswer='.$CorrectAnswer.'
         WHERE _ID='.$qID;
*/

$myTable="questiontable";
$postedQuestionNumber=json_decode(file_get_contents("php://input"));
$A1=mysql_real_escape_string($postedQuestionNumber->A1);
$A2=mysql_real_escape_string($postedQuestionNumber->A2);
$A3=mysql_real_escape_string($postedQuestionNumber->A3);
$A4=mysql_real_escape_string($postedQuestionNumber->A4);
$QT=mysql_real_escape_string($postedQuestionNumber->QT);
$QN=mysql_real_escape_string($postedQuestionNumber->QN);
$CA=mysql_real_escape_string($postedQuestionNumber->CA);
$QID=mysql_real_escape_string($postedQuestionNumber->QID);

require_once("connect_winter_camp.php");

$sql = "UPDATE ".$myTable." SET QuestionText='".$QT."',Answer1='".$A1."',
        Answer2='".$A2."', Answer3='".$A3."',
        Answer4='".$A4."', QuestionNumber='".$QN."',
        CorrectAnswer='".$CA."' WHERE _ID=".$QID;

if ($connect->query($sql) === TRUE) {
     $jsonData = "Records updated successfully";
} else {
    $jsonData = "Error updating record: " . $connect->error;
}
echo $jsonData;
$connect->close();
?>
