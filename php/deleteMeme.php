<?php
include_once "database.php";
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $id = trim($request->id);

  $sql = "DELETE from posteos where id = $id;";
  if ($mysqli->query($sql) === true) {
    $authdata = [
      'id' => $id,
    ];
    echo json_encode($authdata);
  }
}

?>
