<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $name = trim($request->name);
  $pwd = md5(mysqli_real_escape_string($mysqli, trim($request->pwd)));
  $email = mysqli_real_escape_string($mysqli, trim($request->email));
  $admin = mysqli_real_escape_string($mysqli, trim($request->admin));
  $sql = "INSERT INTO users(name,password,email, rol) VALUES ('$name','$pwd','$email', $admin)";
  if ($mysqli->query($sql) === true) {
    $authdata = [
      'name' => $name,
      'pwd' => '',
      'email' => $email,
      'Id' => mysqli_insert_id($mysqli),
    ];
    echo json_encode($authdata);
  }
}

?>
