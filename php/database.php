<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

/* $db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'final_progra_web';
 */
/* $db_host = 'sql304.infinityfree.com';
$db_username = 'if0_34579916';
$db_name = 'if0_34579916_bookshelf';
$db_password = 'KsngM63Bs1FMTX'; */

$db_host = 'localhost';
$db_username = 'c2331408_bookapp';
$db_name = 'c2331408_bookapp';
$db_password = '67ZUrikema';

$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);

if ($mysqli->connect_error) {
  die('Error : (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}