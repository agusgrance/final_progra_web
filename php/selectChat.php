
<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$sender = mysqli_real_escape_string($mysqli, trim($request->sender));
$receiver = mysqli_real_escape_string($mysqli, trim($request->receiver));

$sql = "SELECT c.sender_id, c.receiver_id, c.message, c.timestamp FROM chat c WHERE c.sender_id = $sender and c.receiver_id = $receiver or c.sender_id = $receiver and c.receiver_id = $sender;";
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
