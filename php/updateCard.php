<?php
require 'database.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $id    = mysqli_real_escape_string($mysqli, (int)$request->id);
    $comment = mysqli_real_escape_string($mysqli, trim($request->comment));

    $sql = "UPDATE memes set text = '$comment' where id = $id;";

    if (mysqli_query($mysqli, $sql)) {
        http_response_code(204);
    } else {
        return http_response_code(422);
    }
}
