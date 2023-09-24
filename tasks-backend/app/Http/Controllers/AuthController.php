<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use JWTAuth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);
        // login
        Auth::login($user);

        $token = JWTAuth::fromUser($user);

        return response(['user' => $user , 'token' => $token], 201);
    }
    
    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) 
            return response()->json(['error' => 'Unauthenticated'], 401);
        

        $user = Auth::user();
        $token = JWTAuth::fromUser($user);

        return response(['user' => Auth::user(), 'token' => $token], 200);
    }

    public function logout (Request $request)
    {
        if($request->user())
            $request->user()->token()->revoke();
        return response(['message' => 'You have been successfully logged out!'], 200);
    }

    public function refreshToken(Request $request)
    {
        try {
            $token = JWTAuth::parseToken()->refresh();
            return response()->json(['token' => $token]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token refresh failed '.$e->getMessage()], 401);
        }
    }
}