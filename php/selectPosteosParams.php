
<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = trim($request->id);

$sql ="SELECT p.id, p.text, p.img, p.date, p.isbn, p.rating, u.avatar, u.name as user FROM posteos p left join users u on u.id = p.user_id WHERE p.user_id = '$id';";
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
