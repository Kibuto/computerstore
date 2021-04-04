<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    //
    function categoryList()
    {
        return ["categories" => Category::all()];
    }
}
