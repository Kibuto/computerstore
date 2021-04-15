<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    //
    function categoryList()
    {
        return ["success" => true, "categories" => Category::all()];
    }

    function addCategory(Request $req)
    {
        $check = Category::where("name", $req->input("name"))->first();
        if ($check) {
            return ["success" => false, "message" => "Name is exist"];
        } else {
            $category = new Category();
            $category->name = $req->input("name");
            $category->description = $req->input("description");
            $category->save();
            return ["success" => true, "message" => "Create category successfully"];
        }
    }

    function deleteCategory($id)
    {
        $result = Category::where("id", $id)->delete();
        if ($result) {
            return ["success" => true, "message" => "Category has been deleted"];
        } else {
            return ["success" => false, "message" => "Something went wrong when delete category"];
        }
    }

    function editCategory(Request $req)
    {
        $category = Category::where("id", $req->input("id"))->first();
        $category->name = $req->input("name");
        $category->description = $req->input("description");
        $category->update();
        return response()->json(['success' => true, 'message' => "Update successfully"], 200);
    }
}
