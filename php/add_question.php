<?php
//header("Content-Type: application/json");
header("Content-Type: application/x-www-form-urlencoded");

//add_question.php
$postedQuestionNumber= file_get_contents("php://input");
if (is_null($_POST['q_number']) || empty($_POST['q_number']) || !(isset($_POST['q_number']))){
  $qNumber=0;
}else {
  $qNumber=$_POST['q_number'];
}
$qText=$_POST['q_text'];
$Answer1 = $_POST['q_a1'];
$Answer2 =$_POST['q_a2'];
$Answer3 =$_POST['q_a3'];
$Answer4 =$_POST['q_a4'];
if ($_POST['q_a5']){
  $Answer5 =$_POST['q_a5'];
}else{
  $Answer5="";
}
$CorrectAnswer =$_POST['correct_answer'];

	require_once("connect_winter_camp.php");
$sql = "INSERT INTO questiontable (QuestionNumber, QuestionText, Answer1, Answer2, Answer3, Answer4, CorrectAnswer)
VALUES (".$qNumber.",'".$qText."','".$Answer1."','".$Answer2."','".$Answer3."', '".$Answer4."','".$CorrectAnswer.")";
//echo $sql;

if (mysqli_query($connect, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connect);
}
mysqli_close($connect);

/*Below is test data so I can check the data in the console
One thing to note is that the items that are returned
as strings have a double quote around the variable.  Numbers
do not.

$jsonData ='{"QuestionNumber":'.$qNumber;
$jsonData .=',"QuestionText":"'.$qText.'"'; //  NOTE: This is a string variable so note that the variable is surrounded by double quotes
$jsonData .=',"Answer1":"'.$Answer1.'"';
$jsonData .=',"Answer2":"'.$Answer2.'"';
$jsonData .=',"Answer3":"'.$Answer3.'"';
$jsonData .=',"Answer4":"'.$Answer4.'"';
$jsonData .=',"Answer5":"'.$Answer5.'"';
$jsonData .=',"CorrectAnswer":"'.$CorrectAnswer.'"}';
echo $jsonData;
*/
?>
