//Jhosim Alejandro Agudelo Campo
// Fonction qui personalise le message de confirmation
$(function(){

  var numeroFacture = localStorage.getItem('compteurCommande')
  var nomClient = localStorage.getItem('nomComplet')
  $('#confirmation-number').text(numeroFacture)
  $('#name').append(' '+nomClient+'!')

})
