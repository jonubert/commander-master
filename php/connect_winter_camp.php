<?php
	$dbHost = 'localhost';
	$databasename = "wintercamptest";
	$connect = new mysqli($dbHost, "user2","",$databasename);

	if($connect->connect_error)
	{
		echo "Connection to DB Error";
		die("Failed to Connect!  Issue: " . $connnect->connect_error);
	}
?>
