<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Support\Facades\Log;
class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }


    public function authorizeUser(User $user): bool
    {
        Log::info($user);
        return $user->name == "admin";
    }
}
