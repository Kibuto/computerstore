<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderDetails()
    {
        return $this->hasMany('App\Models\OrderDetail', 'product_id', 'id');
    }

    public function orders()
    {
        return $this->belongsToMany('App\Models\Order', 'order_details', 'product_id', 'order_id')->as('order_details')->withPivot('quantity');
    }
}
