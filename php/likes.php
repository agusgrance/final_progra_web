<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $user = mysqli_real_escape_string($mysqli, trim($request->user));
  $posteo = mysqli_real_escape_string($mysqli, trim($request->posteo));

  $sql = "INSERT INTO likes (user_id, posteo_id ) VALUES ($user,$posteo)";
  if ($mysqli->query($sql) === true) {
    $authdata = [
      'user' => $user,
      'posteo' => $posteo,
      'Id' => mysqli_insert_id($mysqli),
    ];
    echo json_encode($authdata);
  }
}
