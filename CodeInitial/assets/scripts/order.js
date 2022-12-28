//Jhosim Alejandro Agudelo Campo
$(function(){
  var numeroCommande = 1  
  var compteurCommande = 0
  if(localStorage.getItem('compteurCommande')){
    compteurCommande = localStorage.getItem('compteurCommande')
  }

$('#order-form').validate({
  submitHandler: function(form){

    var commande = $(form).serializeArray()
    var prenom = commande[0].value
    var nom = commande[2].value
    var nomComplet = prenom+' '+nom



    localStorage.clear()

    compteurCommande++

    localStorage.setItem('compteurCommande', compteurCommande)
    localStorage.setItem('nomComplet',nomComplet)

    numeroCommande = compteurCommande

    localStorage.setItem(nomComplet,numeroCommande )

    form.submit()
  }
})
$('#first-name').rules('add', {minlength: 2});
$('#last-name').rules('add', {minlength: 2});
$('#email').rules('add', {email: true});
$('#phone').rules('add', {phoneUS: true});
$('#credit-card').rules('add', {creditcard:true});
$.validator.addMethod('cardExpiry',function(value,element){ return this.optional(element)|| /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(value);},
 "La date d'expiration de votre carte de crédit est invalide")
$('#credit-card-expiry').rules('add', {cardExpiry:true});

})



