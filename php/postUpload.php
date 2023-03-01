<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $user = trim($request->user);
  $rating = trim($request->rating);
  $comment = mysqli_real_escape_string($mysqli, trim($request->comment));
  $isbn = mysqli_real_escape_string($mysqli, trim($request->isbn));

  $imgPath = mysqli_real_escape_string($mysqli, trim($request->imgPath));
  $date = mysqli_real_escape_string($mysqli, trim($request->date));
  $sql = "INSERT into posteos(user_id, text,img, date, isbn, rating) values ('$user','$comment', '$imgPath', '$date', '$isbn', $rating )";
  if ($mysqli->query($sql) === true) {
    $authdata = [
      'user' => $user,
      'comment' => $comment,
      'img' => $imgPath,
      'date' => $date,
      'Id' => mysqli_insert_id($mysqli),
    ];
    echo json_encode($authdata);
  }
}

?>
