// Jhosim ALejandro Agudelo Campo
// Fonction permet de mettre a jour le badge du nombre d'items qui se trouvent dans le panier
$(() => {
  const quantite = localStorage.getItem('qte');
  $('.count').text(quantite);
  if ($('.count').text() === 0) { $('.count').hide(); }
});
