
<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$sql =
  "SELECT u.id, u.name, u.password, u.email, IFNULL(r.rol ,'') as rol FROM users u left join roles r on r.id = u.rol;";
if ($result = mysqli_query($mysqli, $sql)) {
  $rows = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
  }
  echo json_encode($rows);
} else {
  http_response_code(404);
}


?>
