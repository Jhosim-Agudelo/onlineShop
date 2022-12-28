// Jhosim ALejandro Agudelo Campo
// Fonction permet de mettre a jourle badge indiquant le nombre d'items qui se trouvent dans le panier
$(function(){
  var quantite = localStorage.getItem("qte")
  
  $(".count").text(quantite)

  if ($('.count').text() == 0) {$('.count').hide()}

}) 
