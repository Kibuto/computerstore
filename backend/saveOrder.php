<?php
require "connect.php";

$orderList = $_POST["orderList"];
$data = json_decode(file_get_contents("php://input"), true);
// $order_list = mysqli_fetch_all($orderList, MYSQLI_ASSOC);
echo json_encode(["success" => 1, "orderList" => $data]);
