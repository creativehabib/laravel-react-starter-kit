<?php

namespace App\Http\Resources\Admin;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

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
            'media' => $this->media ? [
                'id' => $this->media->id,
                'name' => $this->media->name,
                'filename' => $this->media->filename,
                'path' => $this->media->path,
            ] : null,
            'user' => $this->user ? [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'email' => $this->user->email,
            ] : null,
            'status' => $this->status,
            'present_address' => $this->present_address,
            'permanent_address' => $this->permanent_address,
            'emergency_contact' => $this->emergency_contact,
            'blood_group' => $this->blood_group,
            'date_of_birth' => $this->date_of_birth,
            'joining_date' => $this->joining_date,
            'pf_number' => $this->pf_number,
            'bank_account_number' => $this->bank_account_number,
            'bank_name' => $this->bank_name,
            'verify' => $this->verify,
            'created_at' => (new Carbon)->parse($this->created_at)->diffForHumans(),
            'updated_at' => (new Carbon)->parse($this->updated_at)->diffForHumans(),
        ];
    }
}
