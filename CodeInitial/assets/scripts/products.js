//Jhosim Alejandro Agudelo Campo
// fonction permet de créer la liste des produits et l'affichée à partir du JSON file
function createProductList(data) {
 
  var items = [];

 $.each(data, function (key) {
  items.push("<div class='produits'>  " +
   '<li><h4><a href="./product.html?id='+data[key].id +' ">'+data[key].name+'</a></h4></li>' +
   '<li><a href="./product.html?id='+data[key].id +' ">'+'<img src='+'assets/img/'+data[key].image +' alt='+data[key].image +'></a></li>' +
   '<li><a href="./product.html?id='+data[key].id +' ">'+data[key].price +'$</a></li>' +
   "</div>");
   });

     var produitspage = items.length
     $('#products-count').text(produitspage + ' produits')

      $("<ul/>", {
        "id": "productlist",
         html: items.join("")
       }).appendTo(".principal");

  return items;
  }
  // fonction qui permet de classer selon la section classement
  function trieClassement(data){
      
    if ($('#productcriteria').find('button').eq(0).hasClass('selected')) {
    data = data.sort(function(a,b) {return a.price - b.price});
    }
    else if ($('#productcriteria').find('button').eq(1).hasClass('selected')) {
    data = data.sort(function(a,b) {return b.price-a.price});
    }
    else if ($('#productcriteria').find('button').eq(2).hasClass('selected')) {
    data = data.sort(function(a,b) {
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    else  {
    data = data.sort(function(a,b) {
       if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return -1;
      } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return 1;
      } else {
        return 0;
      }
      
      });
    }
  }

  //fonction qui permet de connecter les deux types de classement
  function myFunction(param){
  $.getJSON("data/products.json", function (data) {
  
  
  if (param === "null"){
    trieClassement(data)

    items = createProductList(data)
    var nbProd = items.length
    $(".principal").html('<h3>Produits</h3>'+'<p id="products-count">'+nbProd +' produits</p> '+"<ul id='productlist'>" + items.join("") + "</ul>");

  }
  else{
  trieClassement(data)
  data = data.filter(function(produit){return produit.category === param})
  items = createProductList(data)
  var nbProd = items.length

  $(".principal").html('<h3>Produits</h3>'+'<p id="products-count">'+nbProd +' produits</p> '+"<ul id='productlist'>" + items.join("") + "</ul>");    
  }
  });  

  }
  // fonction qui permet de classer les produits selon la section Catégories
  function trieCategories(data){
    if ($('#product-categories').find('button').eq(0).hasClass('selected')){ 
      var cameras = data.filter(function(product) {return product.category === "cameras";})
      return cameras
    } else if ($('#product-categories').find('button').eq(1).hasClass('selected')){
      var consoles = data.filter(function(product) {return product.category === "consoles";})
      return consoles
    }
    else if ($('#product-categories').find('button').eq(2).hasClass('selected')){
      var screens = data.filter(function(product) {return product.category === "screens";})
      return screens
    }
    else if ($('#product-categories').find('button').eq(3).hasClass('selected')){
      var computers = data.filter(function(product) {return product.category === "computers";})
      return computers
    }
    else{
      var all = data
      return all
    }


  }
  //fonction qui permet de connecter les deux types de classement
  function classement(param){
    $.getJSON("data/products.json", function (data) {
      if (param === "bh"){
      data = trieCategories(data)
      data = data.sort(function(a,b) {return a.price - b.price});
      items = createProductList(data)
      var nbProd = items.length
      $(".principal").html('<h3>Produits</h3>'+'<p id="products-count">'+nbProd +' produits</p> '+"<ul id='productlist'>" + items.join("") + "</ul>");
      }
      else if (param === "hb") {
      data = trieCategories(data)  
      data = data.sort(function(a,b) {return b.price-a.price});
      items = createProductList(data)
      var nbProd = items.length
      $(".principal").html('<h3>Produits</h3>'+'<p id="products-count">'+nbProd +' produits</p> '+"<ul id='productlist'>" + items.join("") + "</ul>");
      }
      else if (param === "az") {
        data = trieCategories(data)
        data = data.sort(function(a,b) {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        } else {
          return 0;
        }
         });
         items = createProductList(data)
        var nbProd = items.length
        $(".principal").html('<h3>Produits</h3>'+'<p id="products-count">'+nbProd +' produits</p> '+"<ul id='productlist'>" + items.join("") + "</ul>");
      }
      else if (param === "za") {
        data = trieCategories(data)
        data = data.sort(function(a,b) {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return -1;
        } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
           return 1;
        } else {
        return 0;
        }});
        items = createProductList(data)
        var nbProd = items.length
        $(".principal").html('<h3>Produits</h3>'+'<p id="products-count">'+nbProd +' produits</p> '+"<ul id='productlist'>" + items.join("") + "</ul>");

      }
    })
    
  }

// fonction qui permet de rendre une classe selected afin qu'elle change de couleur pour la section catégorie
$(function(){
$('div.test button').click(function(){
$('div#product-categories button.selected').removeClass('selected')
$(this).addClass('selected')})
})
// fonction qui permet de rendre une classe selected afin qu'elle change de couleur pour la section classement
$(function(){
$('div.test2 button').click(function(){
  $('div#productcriteria button.selected').removeClass('selected')
  $(this).addClass('selected')
}

)
})
// permet de créer la liste initiale en ordre alphabetique
$.getJSON("data/products.json", function (data) {

  data = data.sort(function(a,b) {
    return a.price - b.price});
  createProductList(data)

});


