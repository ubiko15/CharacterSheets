<?php
require_once 'controllers/CharacterController.php';

class Router {
    private $pdo;
    
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    
    public function handleRequest() {
        $route = $_GET['route'] ?? 'hello';
        $method = $_SERVER['REQUEST_METHOD'];
        
        $characterController = new CharacterController($this->pdo);
        
        // GET /api?route=characters - Alle Charaktere laden
        if ($route === 'characters' && $method === 'GET') {
            $characterController->getAllCharacters();
        }
        // GET /api?route=character&id=1 - Einzelnen Charakter laden
        elseif ($route === 'character' && $method === 'GET') {
            $characterController->getCharacterById();
        }
        // POST /api?route=character - Charakterwert ändern
        elseif ($route === 'character' && $method === 'POST') {
            $characterController->updateCharacter();
        }
        // POST /api?route=newCharacter - Neuen Charakter erstellen
        elseif ($route === 'newCharacter' && $method === 'POST') {
            $characterController->createCharacter();
        }
        else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'Route not found'
            ]);
        }
    }
}
