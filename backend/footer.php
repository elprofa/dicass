<?php
// Renvoie les liens du footer
header('Content-Type: application/json');
echo json_encode([
  'links' => [
    ['label' => 'Accueil', 'route' => '/'],
    ['label' => 'Magasins', 'route' => '/store'],
    ['label' => 'Panier', 'route' => '/cart'],
    ['label' => 'Commandes', 'route' => '/your-order'],
    ['label' => 'Profil', 'route' => '/profile']
  ]
]);
