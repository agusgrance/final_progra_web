<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $name = trim($request->name);
  $pwd = md5(mysqli_real_escape_string($mysqli, trim($request->pwd)));
  $img = mysqli_real_escape_string($mysqli, trim($request->img));
  $email = mysqli_real_escape_string($mysqli, trim($request->email));
  $admin = mysqli_real_escape_string($mysqli, trim($request->admin));
  $sql = "INSERT INTO users(name,password,email, rol, avatar) VALUES ('$name','$pwd','$email', $admin, '$img')";
  if ($mysqli->query($sql) === true) {
    $authdata = [
      'name' => $name,
      'pwd' => '',
      'img' => $img,
      'email' => $email,
      'Id' => mysqli_insert_id($mysqli),
    ];
    echo json_encode($authdata);
  }
}

?>
