
<?php
// backend/produits.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
require_once 'db.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM produits');
        echo json_encode($stmt->fetchAll());
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO produits (title, description, image, price, category_id) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$data['title'], $data['description'], $data['image'], $data['price'], $data['category_id']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE produits SET title=?, description=?, image=?, price=?, category_id=? WHERE id=?');
        $stmt->execute([$data['title'], $data['description'], $data['image'], $data['price'], $data['category_id'], $data['id']]);
        echo json_encode(['success' => true]);
        break;
    case 'DELETE':
        parse_str(file_get_contents('php://input'), $data);
        $stmt = $pdo->prepare('DELETE FROM produits WHERE id=?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>
