<?php
// backend/orders.php
header('Content-Type: application/json');
require_once 'db.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM orders');
        echo json_encode($stmt->fetchAll());
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO orders (user_id, address_id, total, status, placed_at) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$data['user_id'], $data['address_id'], $data['total'], $data['status'], $data['placed_at']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE orders SET user_id=?, address_id=?, total=?, status=?, placed_at=? WHERE id=?');
        $stmt->execute([$data['user_id'], $data['address_id'], $data['total'], $data['status'], $data['placed_at'], $data['id']]);
        echo json_encode(['success' => true]);
        break;
    case 'DELETE':
        parse_str(file_get_contents('php://input'), $data);
        $stmt = $pdo->prepare('DELETE FROM orders WHERE id=?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>
