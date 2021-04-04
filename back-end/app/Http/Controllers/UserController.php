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
        if ($checkUser) return ["error" => 1, "message" => "Username is exist."];
        $user = new User;
        $user->username = $req->input("username");
        $user->email = $req->input("email");
        $user->password = Hash::make($req->input("password"));
        $user->save();
        return $user;
    }

    function login(Request $req)
    {
        $user = User::where("username", $req->username)->first();
        if (!$user || !Hash::check($req->password, $user->password)) {
            return ["error" => 1, "message" => "Username or password is not matched"];
        }
        return $user;
    }
}
