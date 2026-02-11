<?php
require_once 'config/cors.php';
require_once 'config/database.php';
require_once 'routes/router.php';

// Verbindung zur Datenbank herstellen
$database = new Database();
$pdo = $database->getConnection();

// Router initialisieren und Anfrage verarbeiten
$router = new Router($pdo);
$router->handleRequest();
