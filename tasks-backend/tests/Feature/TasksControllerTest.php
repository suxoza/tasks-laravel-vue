<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Task;

class TasksControllerTest extends TestCase
{
    // use RefreshDatabase;
    use DatabaseTransactions;

    protected $user;

    public function setUp(): void
    {
        parent::setUp();
        config(['jwt.secret' => env('JWT_SECRET')]); 
        $this->user = User::factory()->create();
        $this->token = auth()->login($this->user);
    }
    
    public function testCreateTask()
    {
        
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
            ->post('/api/tasks', [
                'title' => 'Test Task',
                'description' => 'This is a test task',
                'date_from' => now()->timestamp,
                'due_date' => now()->addDay()->timestamp,
                'is_active' => true,
            ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('tasks', [
            'title' => 'Test Task',
            'description' => 'This is a test task',
        ]);
    }

    public function testGetTasks()
    {
        Task::factory(3)->create(['owner_id' => $this->user->id]);
        $response = $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])->get('/api/tasks');
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }

    public function testGetSingleTask()
    {
        $result = Task::factory(1)->create(['owner_id' => $this->user->id]);
        $response = $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])->get("/api/tasks/".$result[0]->id);
        $response->assertStatus(200);
    }

    public function testSetStatus()
    {
        $result = Task::factory(1)->create(['owner_id' => $this->user->id]);
        $response = $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])->patch("/api/tasks/set-status/".$result[0]->id);
        $response->assertStatus(200);
    }

    public function testDeleteTask()
    {
        $result = Task::factory(1)->create(['owner_id' => $this->user->id]);
        $response = $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])->delete("/api/tasks/".$result[0]->id);
        $response->assertStatus(200);
    }

}
