<?php
// app/Models/Media.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'name', 'filename', 'mime_type', 'path', 'size', 'created_by',
    ];


}
