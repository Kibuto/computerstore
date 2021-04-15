<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware' => ['auth:api']], function () {
    Route::get('users', function (Request $request) {
        return $request->user();
    });
});

Route::post("register", [UserController::class, "register"]);
Route::post("login", [UserController::class, "login"]);
Route::get("getUserById/{id}", [UserController::class, "getUserById"]);
Route::get("getUserList", [UserController::class, "getUserList"]);
Route::delete("deleteUserById/{id}", [UserController::class, "deleteUserById"]);
Route::post("updateUser", [UserController::class, "updateUser"]);

Route::post("addProduct", [ProductController::class, "addProduct"]);
Route::post("editProduct", [ProductController::class, "editProduct"]);
Route::get("productList", [ProductController::class, "productList"]);
Route::delete("deleteProduct/{id}", [ProductController::class, "deleteProduct"]);
Route::get("getProductById/{id}", [ProductController::class, "getProductById"]);
Route::get("getProductByCategoryId/{id}", [ProductController::class, "getProductByCategoryId"]);

Route::get("categoryList", [CategoryController::class, "categoryList"]);
Route::post("addCategory", [CategoryController::class, "addCategory"]);
Route::post("editCategory", [CategoryController::class, "editCategory"]);
Route::delete("deleteCategory/{id}", [CategoryController::class, "deleteCategory"]);

Route::post("checkout", [OrderController::class, "checkout"]);
Route::get("getOrder/{id}", [OrderController::class, "getOrder"]);
Route::get("getOrderList", [OrderController::class, "getOrderList"]);
Route::delete("deleteOrderById/{id}", [OrderController::class, "deleteOrderById"]);
Route::get("getDashboard", [OrderController::class, "getDashboard"]);
Route::post("editOrder", [OrderController::class, "editOrder"]);
