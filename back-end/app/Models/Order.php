<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function orderDetails()
    {
        return $this->hasMany('App\Models\OrderDetail', 'order_id', 'id');
    }

    public function products()
    {
        return $this->belongsToMany('App\Models\Product', 'order_details', 'order_id', 'product_id')->as('order_details')->withPivot('quantity');
    }
}
