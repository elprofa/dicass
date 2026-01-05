<?php
// backend/cart_items.php
header('Content-Type: application/json');
require_once 'db.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM cart_items');
        echo json_encode($stmt->fetchAll());
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
        $stmt->execute([$data['cart_id'], $data['product_id'], $data['quantity'], $data['price']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE cart_items SET cart_id=?, product_id=?, quantity=?, price=? WHERE id=?');
        $stmt->execute([$data['cart_id'], $data['product_id'], $data['quantity'], $data['price'], $data['id']]);
        echo json_encode(['success' => true]);
        break;
    case 'DELETE':
        parse_str(file_get_contents('php://input'), $data);
        $stmt = $pdo->prepare('DELETE FROM cart_items WHERE id=?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>
