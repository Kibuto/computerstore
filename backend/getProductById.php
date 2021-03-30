<?php
require "connect.php";

$id = $_GET['id'];

$query_product_id = mysqli_query($con, "SELECT * FROM `products` WHERE productId=$id");
// $row = mysqli_fetch_assoc($query_product_id);

// print_r($row);

if (mysqli_num_rows($query_product_id) > 0) {
  // $row = mysqli_fetch_array($query_product_id);
  $product_id = mysqli_fetch_all($query_product_id, MYSQLI_ASSOC);
  echo json_encode(["success" => 1, "product" => $product_id[0]]);
} else {
  echo json_encode(["success" => 1]);
}
