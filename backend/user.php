<?php
  require "connect.php";

  $postData = file_get_contents("php://input");

  if(isset($postData) && !empty($postData)) {
    $request = json_decode($postData);

    $username = $request->username;
    $email = $request->email;
    $password = $request->password;

    $sql = "INSERT INTO `user`(
      `username`,
      `email`,
      `password`
    ) VALUES (
      '{$username}',
      '{$email}',
      '{$password}'
    )";

    if(mysqli_query($con, $sql)) {
      http_response_code(200);
    } else {
      http_response_code(400);
    }

  }
?>