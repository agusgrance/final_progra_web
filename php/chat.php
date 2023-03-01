<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $sender = mysqli_real_escape_string($mysqli, trim($request->sender));
  $receiver = mysqli_real_escape_string($mysqli, trim($request->receiver));
  $message = mysqli_real_escape_string($mysqli, trim($request->message));

  $sql = "INSERT into chat (sender_id,receiver_id,message, timestamp) values ($sender,$receiver, '$message', CURRENT_TIMESTAMP);";
  if ($mysqli->query($sql) === true) {
    $authdata = [
      'sender' => $sender,
      'receiver' => $receiver,
      'message' => $message,
      'Id' => mysqli_insert_id($mysqli),
    ];
    echo json_encode($authdata);
  }
}
