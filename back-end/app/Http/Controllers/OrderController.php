<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Order;
use App\Models\OrderDetail;

class OrderController extends Controller
{
    //
    function checkout(Request $req)
    {
        $sum = $req->input("sum");
        $userInfo = $req->input("userInfo");
        $cartItems = $req->input("cartItems");

        $created_order = Order::create([
            'shipAddress' => $userInfo['address'],
            'shipDate' => $userInfo['shipDate'],
            'status' => 'PENDING',
            'total' => $sum,
            'user_id' => $userInfo['id']
        ]);

        if ($created_order) {
            for ($i = 0; $i < count($cartItems); $i++) {
                $order_info = [
                    'order_id' => $created_order['id'],
                    'product_id' => $cartItems[$i]['id'],
                    'quantity' => $cartItems[$i]['quantity']
                ];
                $order_details[] = $order_info;
            }
            //create many order details
            $created_order->orderDetails()->createMany($order_details);
            return response()->json([
                'success' => true,
                'message' => 'Save order successfully',
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Save order Failed',
        ], 200);
    }

    function getOrder($userId)
    {
        $result = Order::query()->with('products')->where('user_id', $userId)->latest()->get();
        return response()->json(['success' => true, 'orderInfo' => $result], 200);
    }

    function getOrderList()
    {
        $result = Order::query()->with('products')->latest()->get();
        return response()->json(['success' => true, 'orderList' => $result], 200);
    }

    function deleteOrderById($id)
    {
        $result = Order::where("id", $id)->delete();
        if ($result) {
            return ["success" => true, "message" => "Order has been deleted"];
        } else {
            return ["success" => false, "message" => "Something went wrong when delete order"];
        }
    }

    function getDashboard()
    {
        $result = Order::query()->with('products')->whereYear('created_at', '=', 2021)->latest()->get();
        return response()->json(['success' => true, 'data' => $result], 200);
    }
}
