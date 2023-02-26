<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $user = mysqli_real_escape_string($mysqli, trim($request->user));
  $posteo = mysqli_real_escape_string($mysqli, trim($request->posteo));
  $texto = mysqli_real_escape_string($mysqli, trim($request->texto));

  $sql = "INSERT INTO comentarios (posteo_id, user_id, texto) VALUES ($posteo, $user, '$texto')";
  if ($mysqli->query($sql) === true) {
    $authdata = [
      'texto' => $texto,
      'user' => $user,
      'posteo' => $posteo,
      'Id' => mysqli_insert_id($mysqli),
    ];
    echo json_encode($authdata);
  }
}
