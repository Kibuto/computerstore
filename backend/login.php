<?php
  require "connect.php";

  $postData = file_get_contents("php://input");
  
  if(isset($postData) && !empty($postData)) {
    $request = json_decode($postData);

    $username = $request->username;
    $password = $request->password;

    $query_user = mysqli_query($con, "SELECT * FROM `user` WHERE username='$username' AND password='$password' ");

    if(mysqli_num_rows($query_user) > 0) {
      $user = mysqli_fetch_all($query_user, MYSQLI_ASSOC);
      echo json_encode(["success"=> 1, "user"=>$user]);
    } else {
      echo json_encode(["success"=> 1]);
    }

  }
?>