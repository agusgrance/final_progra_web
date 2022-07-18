<?php
include_once("database.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$user = trim($request->user);
$comment = mysqli_real_escape_string($mysqli, trim($request->comment));
$imgPath = mysqli_real_escape_string($mysqli, trim($request->imgPath));
$date = mysqli_real_escape_string($mysqli, trim($request->date));
$sql = "INSERT into memes(user_id, text,img, date) values ('$user','$comment', '$imgPath', '$date' )";
if ($mysqli->query($sql) === TRUE) {
$authdata = [
'user' => $user,
'comment' => $comment,
'img' => $imgPath,
'date' => $date,
'Id' => mysqli_insert_id($mysqli)
];
echo json_encode($authdata);
}
}

?>