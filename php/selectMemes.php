
<?php
include_once("database.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$sql = "SELECT m.id, u.name  as user, m.text,m.img, m.date from memes m left join users u on u.id = m.user_id;";
if($result = mysqli_query($mysqli,$sql))
{
$rows = array();
while($row = mysqli_fetch_assoc($result))
{
$rows[] = $row;
}
echo json_encode($rows);
}
else
{
http_response_code(404);
}

?>