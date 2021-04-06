<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    //
    function addProduct(Request $req)
    {
        $product = new Product;
        $product->name = $req->input("name");
        $product->description = $req->input("description");
        $product->price = $req->input("price");
        $product->image = $req->file("image")->store("products");
        $product->category_id = $req->input("category");
        $product->save();
        return ["success" => true, "message" => "Create product successfully"];
    }

    function productList()
    {
        return ["products" => Product::all()];
    }

    function deleteProduct($id)
    {
        $result = Product::where("id", $id)->delete();
        if ($result) {
            return ["success" => true, "message" => "Product has been deleted"];
        } else {
            return ["success" => false, "message" => "Something went wrong when delete product"];
        }
    }

    function getProductById($id)
    {
        return ["product" => Product::where("id", $id)->first()];
    }

    function getProductByCategoryId($id)
    {
        return ["products" => Product::where("category_id", $id)->get()];
    }
}
