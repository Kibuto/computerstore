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
        $product->quantity = $req->input("quantity");
        $product->cost = $req->input("cost");
        $product->image = $req->file("image")->store("products");
        $product->categoryId = $req->input("categoryId");
        $product->save();
        return $product;
    }

    function productList()
    {
        return ["products" => Product::all()];
    }

    function deleteProduct($id)
    {
        $result = Product::where("id", $id)->delete();
        if ($result) {
            return ["result" => "Product has been deleted"];
        } else {
            return ["error" => "Something went wrong when delete product"];
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
