<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\SetTaskStatusRequest;

class CreateTaskRequest extends SetTaskStatusRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            ...parent::rules(),
            'title' => 'required|string|max:255',
            'description' => 'string|nullable',
            'date_from' => 'nullable',
            'due_date' => 'required',
        ];
    }
}
