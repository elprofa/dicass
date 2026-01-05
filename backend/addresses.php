<?php
// backend/addresses.php
header('Content-Type: application/json');
require_once 'db.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM addresses');
        echo json_encode($stmt->fetchAll());
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO addresses (user_id, label, address_line1, address_line2, city, zip_code, is_default) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([$data['user_id'], $data['label'], $data['address_line1'], $data['address_line2'], $data['city'], $data['zip_code'], $data['is_default']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE addresses SET user_id=?, label=?, address_line1=?, address_line2=?, city=?, zip_code=?, is_default=? WHERE id=?');
        $stmt->execute([$data['user_id'], $data['label'], $data['address_line1'], $data['address_line2'], $data['city'], $data['zip_code'], $data['is_default'], $data['id']]);
        echo json_encode(['success' => true]);
        break;
    case 'DELETE':
        parse_str(file_get_contents('php://input'), $data);
        $stmt = $pdo->prepare('DELETE FROM addresses WHERE id=?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>
