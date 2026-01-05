<?php
// backend/lots.php
header('Content-Type: application/json');
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Récupérer tous les lots
        $sql = 'SELECT * FROM lots';
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $lots = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($lots);
        break;
    case 'POST':
        // Ajouter un lot
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = 'INSERT INTO lots (nom, prix, images, description) VALUES (?, ?, ?, ?)';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['nom'] ?? '',
            $data['prix'] ?? 0.00,
            $data['images'] ?? '',
            $data['description'] ?? ''
        ]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
    case 'PUT':
        // Modifier un lot
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'] ?? 0;
        $sql = 'UPDATE lots SET nom=?, prix=?, images=?, description=? WHERE id=?';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['nom'] ?? '',
            $data['prix'] ?? 0.00,
            $data['images'] ?? '',
            $data['description'] ?? '',
            $id
        ]);
        echo json_encode(['success' => true]);
        break;
    case 'DELETE':
        // Supprimer un lot
        $id = $_GET['id'] ?? 0;
        $sql = 'DELETE FROM lots WHERE id=?';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
        break;
}
