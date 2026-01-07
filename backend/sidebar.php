<?php
// Renvoie les liens et sections du menu sidebar
header('Content-Type: application/json');
echo json_encode([
  'links' => [
    ['label' => 'Accueil', 'route' => '/'],
    ['label' => 'Magasins', 'route' => '/store'],
    ['label' => 'Panier', 'route' => '/cart'],
    ['label' => 'Commandes', 'route' => '/your-order'],
    ['label' => 'Profil', 'route' => '/profile']
  ],
  'sections' => [
    ['label' => 'Catégories', 'route' => '/categories'],
    ['label' => 'Offres', 'route' => '/offers']
  ]
]);
