<?php
// Renvoie les infos utilisateur fictives
header('Content-Type: application/json');
echo json_encode([
  'id' => 1,
  'name' => 'Jean Dupont',
  'email' => 'jean.dupont@email.com',
  'phone' => '+33 6 12 34 56 78',
  'address' => '12 rue de Paris, 75001 Paris',
  'avatar' => 'https://randomuser.me/api/portraits/men/1.jpg'
]);
