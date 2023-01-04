// Jhosim Alejandro Agudelo Campo
// Fonction qui personalise le message de confirmation
$(() => {
  const numeroFacture = localStorage.getItem('compteurCommande');
  const nomClient = localStorage.getItem('nomComplet');
  $('#confirmation-number').text(numeroFacture);
  $('#name').append(` ${nomClient}!`);
});
