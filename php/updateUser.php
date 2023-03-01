<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $id = mysqli_real_escape_string($mysqli, (int) $request->id);
  $name = mysqli_real_escape_string($mysqli, trim($request->name));
  $email = mysqli_real_escape_string($mysqli, trim($request->email));
  $rol = mysqli_real_escape_string($mysqli, (int) $request->rol);
  $pwd =md5( mysqli_real_escape_string($mysqli, trim($request->password)));

  if ($rol == 0) {
    $sql = "UPDATE users set name = '$name' , email = '$email', password = '$pwd' where id = $id;";
  } else {
    $sql = "UPDATE users set name = '$name' , email = '$email', rol = '$rol',  password = '$pwd' where id = $id;";
  }

  if (mysqli_query($mysqli, $sql)) {
    http_response_code(204);
  } else {
    return http_response_code(422);
  }
}
