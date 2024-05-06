<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class TokenController extends Controller{
    public function user(Request $request)
    {        
        $user = User::where('email', $request->user()->email)->first();
        if(!$user){
            return response()->json([
                "success" => false,
                "message" => "User not found",
            ],404);
        }
        return response()->json([
            "success" => true,
            "user"    => $request->user(),
            "role"   => [$user->role_id],
        ]);
    }
    
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'     => 'required|email',
            'password'  => 'required',
        ]);
        if (Auth::attempt($credentials)) {
            // Get user
            $user = User::where([
                ["email", "=", $credentials["email"]]
            ])->firstOrFail();
            if($user->authorized === 1){
                // Revoke all old tokens
                $user->tokens()->delete();
                // Generate new token
                $token = $user->createToken("authToken")->plainTextToken;
                // Token response
                return response()->json([
                    "success"   => true,
                    "authToken" => $token,
                    "tokenType" => "Bearer"
                ], 200);
            }
            else{
                return response()->json([
                    "success" => false,
                    "message" => "User not authorized by admin"
                ], 403);
            }
        } else {
            return response()->json([
                "success" => false,
                "message" => "Invalid login credentials"
            ], 400);
        }
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
    
        return response()->json([
            "success" => true,
            "message" => "User logged out successfully"
        ], 200);
        
       }
    
    public function register(Request $request){
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ]);
    
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
                'role_id' => 0,
                'authorized' => false
            ]);
    
            // Generate token for the registered user
            $token = $user->createToken("authToken")->plainTextToken;
    
            return response()->json([
                "success" => true,
                "user" => $user,
                "username"=> $data["name"],
                "email"=> $data["email"],
                "authToken" => $token,
                "tokenType" => "Bearer"
            ], 200);
    }

    public function branca(Request $request){
        $user = User::find($request->user()->id);
        if($user){
            $branca = $request->get('branca');
            $user->branca = $branca;
            $user->save();
            return response()->json([
                "success"=>true,
                "user" => $user,
                "branca" => $branca
            ],200);
        }
        else{
            return response()->json([
                "success"=>false,
                "message"=>"User not found"
            ],404);
        }
    }

    public function carrec(Request $request){
        $user = User::find($request->user()->id);
        if($user){
            $carrec = $request->get('carrec');
            $user->carrec = $carrec;
            $user->save();
            return response()->json([
                "success"=>true,
                "user" => $user,
                "carrec" => $carrec
            ],200);
        }
        else{
            return response()->json([
                "success"=>false,
                "message"=>"User not found"
            ],404);
        }
    }

    public function authorize(Request $request){
        $user = User::where('email', $request->input("email"))->first();
        if($user){
            if($request->user()->cannot('authorizeUser', User::class)){
                return response()->json([
                    "success"=>false,
                    "message"=>"Only administrators can authorize"
                ],403);
            }
            else{
                if($user->authorized == 0){
                    $user->update([
                        'authorized' => 1
                    ]);
                    return response()->json([
                        "success"=>true,
                        "user" => $user,
                        "message" => "User is now authorized"
                    ],200);
                }
                else if ($user->authorized == 1){
                    return response()->json([
                        "success"=>false,
                        "message"=>"User already authorized"
                    ],400);
                }
            }
        }
        else {
            return response()->json([
                "success"=>false,
                "message"=>"User not found"
            ],404);
        }
    }

    public function unauthorize(Request $request){
        $user = User::where('email', $request->input("email"))->first();
        if($user){
            // Gate::authorize('authorizeUser', User::class);
            if($request->user()->cannot('authorizeUser', User::class)){
                return response()->json([
                    "success"=>false,
                    "message"=>"Only admin users can authorize and unauthorize"
                ],403);
            }
            else{
            if($user->authorized == 1){
                $user->update([
                    'authorized' => 0
                ]);
                return response()->json([
                    "success"=>true,
                    "user" => $user,
                    "message" => "User is now unauthorized"
                ],200);
            }
            else if ($user->authorized == 0){
                return response()->json([
                    "success"=>false,
                    "message"=>"User wasn't authorized initially"
                ],400);
            }
            }
        }
        else {
            return response()->json([
                "success"=>false,
                "message"=>"User not found"
            ],404);
        }
    }
}