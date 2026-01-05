<?php
// backend/payments.php
header('Content-Type: application/json');
require_once 'db.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM payments');
        echo json_encode($stmt->fetchAll());
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO payments (order_id, payment_method_id, amount, status, paid_at) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$data['order_id'], $data['payment_method_id'], $data['amount'], $data['status'], $data['paid_at']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE payments SET order_id=?, payment_method_id=?, amount=?, status=?, paid_at=? WHERE id=?');
        $stmt->execute([$data['order_id'], $data['payment_method_id'], $data['amount'], $data['status'], $data['paid_at'], $data['id']]);
        echo json_encode(['success' => true]);
        break;
    case 'DELETE':
        parse_str(file_get_contents('php://input'), $data);
        $stmt = $pdo->prepare('DELETE FROM payments WHERE id=?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>
