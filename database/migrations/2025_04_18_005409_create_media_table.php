<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // database/migrations/[timestamp]_create_media_table.php
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('filename');
            $table->string('mime_type');
            $table->string('path');
            $table->unsignedInteger('size');
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->foreignId('created_by')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
