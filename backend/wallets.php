<?php
// backend/wallets.php
header('Content-Type: application/json');
require_once 'db.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Pour la démo, on prend l'utilisateur id=1
        $user_id = 1;
        // Récupérer le solde du portefeuille
        $stmt = $pdo->prepare('SELECT balance, id FROM wallets WHERE user_id = ? LIMIT 1');
        $stmt->execute([$user_id]);
        $wallet = $stmt->fetch();
        $balance = $wallet ? floatval($wallet['balance']) : 0;
        $wallet_id = $wallet ? $wallet['id'] : null;
        // Récupérer les transactions
        $transactions = [];
        if ($wallet_id) {
            $stmt2 = $pdo->prepare('SELECT amount, type, created_at FROM wallet_transactions WHERE wallet_id = ? ORDER BY created_at DESC');
            $stmt2->execute([$wallet_id]);
            foreach ($stmt2->fetchAll() as $row) {
                $transactions[] = [
                    'type' => $row['type'] === 'credit' ? 'credit' : 'debit',
                    'label' => $row['type'] === 'credit' ? 'Ajout de fonds' : 'Paiement',
                    'date' => $row['created_at'],
                    'amount' => floatval($row['amount'])
                ];
            }
        }
        echo json_encode([
            'balance' => $balance,
            'transactions' => $transactions
        ]);
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO wallets (user_id, balance, updated_at) VALUES (?, ?, ?)');
        $stmt->execute([$data['user_id'], $data['balance'], $data['updated_at']]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('UPDATE wallets SET user_id=?, balance=?, updated_at=? WHERE id=?');
        $stmt->execute([$data['user_id'], $data['balance'], $data['updated_at'], $data['id']]);
        echo json_encode(['success' => true]);
        break;
    case 'DELETE':
        parse_str(file_get_contents('php://input'), $data);
        $stmt = $pdo->prepare('DELETE FROM wallets WHERE id=?');
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>
