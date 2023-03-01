
<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = trim($request->id);

$sql ="SELECT u.name, u.avatar, p.id, p.user_id, p.text, p.img, p.date, p.isbn, p.rating, c.id as comentario_id, c.user_id as comentario_user_id, c.texto as comentario FROM posteos p left join comentarios c on c.posteo_id = p.id left join users u on u.id = p.user_id where p.id = $id;";
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
