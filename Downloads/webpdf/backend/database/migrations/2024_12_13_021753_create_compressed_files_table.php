<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('compressed_files', function (Blueprint $table) {
            $table->id();
            $table->string('original_name');
            $table->string('compressed_name');
            $table->bigInteger('original_size');
            $table->bigInteger('compressed_size');
            $table->float('compression_ratio');
            $table->timestamp('uploaded_at')->useCurrent();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('compressed_files');
    }
};
