<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    function register(Request $req)
    {
        $checkUser = User::where("username", $req->username)->first();
        if ($checkUser) return ["success" => false, "message" => "Username is exist."];
        $user = new User;
        $user->username = $req->input("username");
        $user->email = $req->input("email");
        $user->password = Hash::make($req->input("password"));
        $user->save();
        return ["success" => true, "user" => $user];
    }

    function login(Request $req)
    {
        $user = User::where("username", $req->username)->first();
        if (!$user || !Hash::check($req->password, $user->password)) {
            return ["success" => false, "message" => "Username or password is not matched"];
        }
        return ["success" => true, "user" => $user];
    }

    function getUserById($id)
    {
        return ["success" => true, "user" => User::where("id", $id)->first()];
    }

    function getUserList()
    {
        return ["success" => true, "userList" => User::all()];
    }

    function deleteUserById($id)
    {
        $result = User::where("id", $id)->delete();
        if ($result) {
            return ["success" => true, "message" => "User has been deleted"];
        } else {
            return ["success" => false, "message" => "Something went wrong when delete user"];
        }
    }

    function updateUser(Request $req)
    {
        $user = User::where("id", $req->input("id"))->first();
        $user->name = $req->input("name");
        $user->email = $req->input("email");
        $user->address = $req->input("address");
        $user->image = $req->file("image")->store("products");
        $user->update();
        return ["success" => true, "message" => "Update successfully", "user" => $user];
    }
}
