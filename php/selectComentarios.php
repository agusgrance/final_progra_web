
<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$sql = "SELECT c.id, c.posteo_id, u.name, c.texto, u.id as user_id FROM comentarios c left JOIN users u on c.user_id = u.id;";
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
