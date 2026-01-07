<?php
// Renvoie la confirmation de commande fictive
header('Content-Type: application/json');
echo json_encode([
  'order_number' => '001',
  'status' => 'success',
  'message' => 'Votre commande a été passée avec succès!'
]);
