<?php
  require "connect.php";
  $allProducts = mysqli_query($con, "SELECT * FROM `products`");
  if(mysqli_num_rows($allProducts) > 0) {
    $all_products = mysqli_fetch_all($allProducts, MYSQLI_ASSOC);
    echo json_encode(["success"=>1, "products"=>$all_products]);
  } else {
    echo json_encode(["success"=>0]);
  }
?>