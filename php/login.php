<?php
include_once "database.php";
include_once "vendor/autoload.php"; // Incluir la biblioteca JWT

use Firebase\JWT\JWT; // Importar la clase JWT
define ('JWT_KEY', 'muDwxWkIp-Ul');
define ('JWT_ALG', 'HS256');
define ('JWT_EXP', 300); 
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (isset($postdata) && !empty($postdata)) {
  $pwd = md5(mysqli_real_escape_string($mysqli, trim($request->password)));
  $email = mysqli_real_escape_string($mysqli, trim($request->username));
  $sql = "SELECT * FROM users WHERE email='$email' AND password='$pwd'";
  
  if ($result = mysqli_query($mysqli, $sql)) {
    $rows = [];
    while ($row = mysqli_fetch_assoc($result)) {
      $rows[] = $row;
    }

    if (count($rows) > 0) {
      // Generar el token JWT con todos los datos encriptados
      $secretKey = "tu_clave_secreta"; // Reemplaza esto con tu propia clave secreta
      $jwt = JWT::encode($rows, JWT_KEY, JWT_ALG);

      // Devolver el token JWT en la respuesta
      $response = array(
        "token" => $jwt
      );
      echo json_encode($response);
    } else {
      // No se encontraron usuarios coincidentes
      http_response_code(404);
    }
  } else {
    // Error en la consulta SQL
    http_response_code(500);
  }
}