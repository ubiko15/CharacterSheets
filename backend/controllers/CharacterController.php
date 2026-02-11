<?php
class CharacterController {
    private $pdo;
    private $defaultStats;
    private $jsonStats;

    public function __construct($pdo) {
        $this->pdo = $pdo;
        $this->defaultStats = require __DIR__ . '/../config/DefaultStats.php';
        $this->jsonStats = json_encode($this->defaultStats, JSON_UNESCAPED_UNICODE);
    }
    
    public function getAllCharacters() {
        // TODO: Datenbank-Abfrage implementieren
        $stmt = $this->pdo->query("SELECT id, name FROM characters");
        $characters = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'data' => $characters]
        );
    }
    
    public function getCharacterById($id = null) {
        $id = $id ?? $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'ID required']);
            exit;
        }
        
        $stmt = $this->pdo->prepare("SELECT * FROM characters WHERE id = :id");
        $stmt->execute(['id' => $id]);

        $character = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$character) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message'=>'Character not found']);
            exit;
        }

        $character['stats'] = json_decode($character['stats'], true);

        echo json_encode(['success'=>true,'data'=>$character]);
    }
    
    public function updateCharacter() {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? null;
        $stats = $input['stats'] ?? null;
        $items = $input['items'] ?? null;
        $notes = $input['notes'] ?? null;
        
        if (!$id) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'ID required']);
            exit;
        }

        if ($stats === null && $items === null && $notes === null) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'At least one field (stats, items, notes) required']);
            exit;
        }
        
        // Update stats if provided
        if ($stats !== null) {
            $stmt = $this->pdo->prepare("UPDATE characters SET stats = :stats WHERE id = :id");
            $stmt->execute(["stats" => json_encode($stats), "id" => $id]);
        }

        // Update items if provided
        if ($items !== null) {
            $stmt = $this->pdo->prepare("UPDATE characters SET items = :items WHERE id = :id");
            $stmt->execute(["items" => $items, "id" => $id]);
        }

        // Update notes if provided
        if ($notes !== null) {
            $stmt = $this->pdo->prepare("UPDATE characters SET notes = :notes WHERE id = :id");
            $stmt->execute(["notes" => $notes, "id" => $id]);
        }

        echo json_encode(['success' => true, 'message' => 'Character updated successfully']);
    }
    
    public function createCharacter() {
        $input = json_decode(file_get_contents('php://input'), true);
        $name = $input['name'] ?? null;
        try {
            $stmt = $this->pdo->prepare("INSERT INTO characters (name, stats) VALUES (:name, :stats)");
            $stmt->execute(['name' => $name, 'stats' => $this->jsonStats]);

            //$this->getAllCharacters();

            echo json_encode([
            'success' => true,
            'data' => [
                ['id' => 1, 'name' => 'John Doe', 'level' => 5, 'class' => 'Warrior'],
                ['id' => 2, 'name' => 'Jane Smith', 'level' => 3, 'class' => 'Mage'],
                ['id' => 3, 'name' => 'Bosadfsadb Johnson', 'level' => 7, 'class' => 'Rogue']
            ]
        ]);
        }
        catch (PDOException $e) {
            error_log($e);
        }
    }
}
