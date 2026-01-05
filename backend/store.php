<?php
// backend/store.php
header('Content-Type: application/json');
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Récupérer tous les magasins
        $sql = 'SELECT * FROM store';
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $stores = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($stores);
        break;
    case 'POST':
        // Ajouter un magasin
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = 'INSERT INTO store (name, description, image, address, phone, email) VALUES (?, ?, ?, ?, ?, ?)';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['name'] ?? '',
            $data['description'] ?? '',
            $data['image'] ?? '',
            $data['address'] ?? '',
            $data['phone'] ?? '',
            $data['email'] ?? ''
        ]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
    case 'PUT':
        // Modifier un magasin
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'] ?? 0;
        $sql = 'UPDATE store SET name=?, description=?, image=?, address=?, phone=?, email=? WHERE id=?';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['name'] ?? '',
            $data['description'] ?? '',
            $data['image'] ?? '',
            $data['address'] ?? '',
            $data['phone'] ?? '',
            $data['email'] ?? '',
            $id
        ]);
        echo json_encode(['success' => true]);
        break;
    case 'DELETE':
        // Supprimer un magasin
        $id = $_GET['id'] ?? 0;
        $sql = 'DELETE FROM store WHERE id=?';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
        break;
}
