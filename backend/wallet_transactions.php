<?php
// backend/wallet_transactions.php
header('Content-Type: application/json');
require_once 'db.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM wallet_transactions');
        echo json_encode($stmt->fetchAll());
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO wallet_transactions (wallet_id, type, amount, description, created_at) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$data['wallet_id'], $data['type'], $data['amount'], $data['description'], $data['created_at']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE wallet_transactions SET wallet_id=?, type=?, amount=?, description=?, created_at=? WHERE id=?');
        $stmt->execute([$data['wallet_id'], $data['type'], $data['amount'], $data['description'], $data['created_at'], $data['id']]);
        echo json_encode(['success' => true]);
        break;
    case 'DELETE':
        parse_str(file_get_contents('php://input'), $data);
        $stmt = $pdo->prepare('DELETE FROM wallet_transactions WHERE id=?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>
