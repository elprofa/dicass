<?php
// backend/payment_methods.php
header('Content-Type: application/json');
require_once 'db.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM payment_methods');
        echo json_encode($stmt->fetchAll());
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO payment_methods (user_id, type, provider, account_number, expiry_date, is_default, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([$data['user_id'], $data['type'], $data['provider'], $data['account_number'], $data['expiry_date'], $data['is_default'], $data['created_at']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE payment_methods SET user_id=?, type=?, provider=?, account_number=?, expiry_date=?, is_default=?, created_at=? WHERE id=?');
        $stmt->execute([$data['user_id'], $data['type'], $data['provider'], $data['account_number'], $data['expiry_date'], $data['is_default'], $data['created_at'], $data['id']]);
        echo json_encode(['success' => true]);
        break;
    case 'DELETE':
        parse_str(file_get_contents('php://input'), $data);
        $stmt = $pdo->prepare('DELETE FROM payment_methods WHERE id=?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>
