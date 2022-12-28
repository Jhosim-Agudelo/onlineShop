//Jhosim Alejandro Agudelo Campo
//fonction qui permet la recuperation du parametre id par l'URL, inspiré de https://www.sitepoint.com/url-parameters-jquery/
$.urlParam = function(name){
var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
return results[1] || 0;
}

//Permet d'ajouter tout les éléments du produit id
$.getJSON("data/products.json", function (data){

  var idUrl = $.urlParam('id') - 1 
  // Si l'adresse est érronée, affiche erreur
  if ($.urlParam('id')-1 > data.length){$('#titre').text('Page non trouvée!')}

  var coteGauche = []
  coteGauche.push("<h3>"+ data[idUrl].name +"</h3>"+
            '<img src='+'assets/img/'+data[idUrl].image +' alt='+data[idUrl].image +'>'
  );


  $("<section/>", {

          html: coteGauche.join("")
      }).appendTo(".colonnes");

  var coteDroit = []

  coteDroit.push("<h3>Description</h3>"+
                 "<p>"+data[idUrl].description +"</p>"+
                 "<h3>Caractéristiques</h3>" +
                 "<ul>"+ 
                 "</ul>"+
                 "<hr><p>Prix: <b>"+ data[idUrl].price + "$</b> </p>"+
                 '<form id="add-to-cart-form"  action="#"> Quantité:'+
                 '<input class="form-control" type="number" name="Quantité" value ="1" min="0" >'+
                 '<button class="btnspecial" type="button"><span class="fa-stack fa-lg">'+
                 '<i class="fa fa-shopping-cart fa-stack-0x"></i></span> Ajouter</button>'+
                 '</form>'+
                 '<div id = "dialog">  <p>Le produit a été ajouté au panier.</p></div>'
                 )
  



                  
  $("<section/>", {
          html: coteDroit.join("")
      }).appendTo(".colonnes");
  for (var i = 0 ; i < data[idUrl].features.length;i++ ) {
    $("article ul").append('<li>'+data[idUrl].features[i]+'</li>')
  }

  // fonction qui gere les événements du bouton ajouter, tels que le badge et ajouter le produit au shopping cart
  $('#add-to-cart-form button').click(function(){

    var ajoutProduit = $('#add-to-cart-form').serializeArray()
    var id = $.urlParam('id')

    quantite = localStorage.getItem("qte")

    if (quantite == null){localStorage.setItem('qte',0)
                            $(".count").text(1)}
    
    quantite = localStorage.getItem("qte")
    quantite = parseInt(quantite)+1
    
    localStorage.setItem("qte", quantite)
    localStorage.setItem(id,ajoutProduit[0].value)

    $(".count").text(quantite)
    $('#dialog').show().delay(5000).fadeOut();

  })
  
});



