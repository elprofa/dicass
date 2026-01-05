<?php
// backend/offers.php
header('Content-Type: application/json');
require_once 'db.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM offers');
        echo json_encode($stmt->fetchAll());
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO offers (title, description, discount, start_date, end_date, category_id, product_id) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([$data['title'], $data['description'], $data['discount'], $data['start_date'], $data['end_date'], $data['category_id'], $data['product_id']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE offers SET title=?, description=?, discount=?, start_date=?, end_date=?, category_id=?, product_id=? WHERE id=?');
        $stmt->execute([$data['title'], $data['description'], $data['discount'], $data['start_date'], $data['end_date'], $data['category_id'], $data['product_id'], $data['id']]);
        echo json_encode(['success' => true]);
        break;
    case 'DELETE':
        parse_str(file_get_contents('php://input'), $data);
        $stmt = $pdo->prepare('DELETE FROM offers WHERE id=?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>
