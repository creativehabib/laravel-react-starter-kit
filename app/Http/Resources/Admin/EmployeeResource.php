<?php

namespace App\Http\Resources\Admin;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'position' => $this->position,
            'about' => $this->about,
            'department' => $this->department ? [
                'id' => $this->department->id,
                'name' => $this->department->name,
            ] : null,
            'designation' => $this->designation ? [
                'id' => $this->designation->id,
                'title' => $this->designation->title,
            ] : null,
            'status' => $this->status,
            'present_address' => $this->present_address,
            'permanent_address' => $this->permanent_address,
            'designation_id' => $this->designation_id,
            'department_id' => $this->department_id,
            'created_at' => (new Carbon)->parse($this->created_at)->diffForHumans(),
        ];
    }
}
