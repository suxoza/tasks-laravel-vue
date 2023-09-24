<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;


class Task extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['title', 'description', 'date_from', 'due_date', 'is_active', 'is_deleted'];
    protected $appends = ['date_from_new', 'due_date_new'];
    protected $visible = ['id', 'title', 'description', 'date_from_new', 'due_date_new', 'is_active'];
    protected $dates = ['deleted_at'];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function setDateFromAttribute($value)
    {
        $this->attributes['date_from'] = $value ? strtotime($value): 0;// Carbon::parse($value)->timestamp;
    }

    public function setDueDateAttribute($value)
    {
        $this->attributes['due_date'] = $value ? strtotime($value): 0;// Carbon::parse($value)->timestamp;
    }

    public function getDateFromNewAttribute($value)
    {
        return $this->date_from ? Carbon::createFromTimestamp($this->date_from)->format('Y-m-d H:i:s'): 0;
    }

    public function getDueDateNewAttribute($value)
    {
        return $this->due_date ? Carbon::createFromTimestamp($this->due_date)->format('Y-m-d H:i:s'): 0;
    }
}
