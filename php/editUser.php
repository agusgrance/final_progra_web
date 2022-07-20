<?php
include_once("database.php");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
$request = json_decode($postdata);
$id = trim($request->id);
$name = mysqli_real_escape_string($mysqli, trim($request->name));
$email = mysqli_real_escape_string($mysqli, trim($request->email));
$rol = mysqli_real_escape_string($mysqli, trim($request->rol));
$sql = "UPDATE users set name = '$name' , email = '$email', rol = '$rol' where id = $id;";
if ($mysqli->query($sql) === TRUE) {
$authdata = [
'name' => $name,
'comment' => $comment,
'img' => $imgPath,
'date' => $date,
'Id' => mysqli_insert_id($mysqli)
];
echo json_encode($authdata);
}
}

?>