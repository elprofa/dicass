<?php
// Renvoie l'état global de chargement (fictif)
header('Content-Type: application/json');
echo json_encode([
  'loading' => false
]);
