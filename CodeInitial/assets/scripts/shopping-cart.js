  //Jhosim Alejandro Agudelo Campo
  //Cette fonction met à jour le shopping cart
  $.getJSON("data/products.json", function (data){
      var last = data.length
      var total = 0
      for (var i = 0; i <= last; i++ ){
        if (i in localStorage){
          var coteGauche = []
          var prix = parseInt(localStorage.getItem(i))*data[i-1].price
          total = total + prix
      coteGauche.push(
        '<td class="firstcollumn "><form action="#"><input class="inputx remove-item-button" id ="'+data[i-1].id+'" type="button" value="X"></form></td>'+
        '<td class="secondcollumn"><a href="./product.html? ">'+data[i-1].name+'</a></td>'+
        '<td class = "price">'+ data[i-1].price +' $ </td>'+
        '<td class="thirdcollumn" id ="'+data[i-1].id+'" ><form action="#" class= "quantite" id ="'+data[i-1].id+'"><input class="input- remove-quantity-button" type="button" value="-" id ="'+data[i-1].id+'" > <div id = "nb'+data[i-1].id+'">'+localStorage.getItem(i) +'</div> <input class="add-quantity-button" id ="'+data[i-1].id+'"  type="button" value="+"></form></td>'+
        '<td class="lastcollumn" id="prix'+data[i-1].id+'"">'+ prix.toFixed(2)+' $</td>'
      );

      $("<tr/>", {

              html: coteGauche.join("")
          }).appendTo(".shopping-cart");
          
        }
      }

      // Mise à jour du prix total
      var prixTotal = $('#total-amount').find('b')
      prixTotal.text(total+ ' $')

      // Permet d'éliminer les éléments du shopping cart
      $('.remove-item-button').click(function(){

        if (confirm('Voulez-vous supprimer le produit du panier?')== true){
        $(this).parent().parent().parent().remove()

        var productId = $(this).attr('id')
        console.log(productId)
        var nbUnites =localStorage.getItem(productId)
        localStorage.removeItem(productId)

        total = total-(data[productId-1].price)*nbUnites
        console.log(data[productId-1].price)
        console.log(total)
        prixTotal.text(total+ ' $')

        var nbPanier = $(".shopping-cart").children().length;

        if (nbPanier == 0){$('article').html('<h3>Panier</h3><p>Aucun produit dans le panier.</p>')}

        localStorage.setItem("qte", nbPanier)
        var quantite = localStorage.getItem("qte")
        
        $(".count").text(nbPanier)
        if ($('.count').text() == 0) {
        $('.count').hide();}
        } 
      })
        // Mise à jour du prix total
        var nbPanier = $(".shopping-cart").children().length;

        if (nbPanier == 0){$('article').html('<h3>Panier</h3><p>Aucun produit dans le panier.</p>')}
        // Permet de diminuer la quantité d'unités du produit
        $('.remove-quantity-button').click(function(){
            var productId = $(this).attr('id')
            test = localStorage.getItem(productId)
            test = test-1
            localStorage.setItem(productId,test)
            $('#nb'+productId).text(test)

            if ($('#nb'+productId).text() <= 1){
              console.log('hey')
              $('#'+productId+'.input-').prop("disabled",true)
            }

            prix = test*data[productId-1].price
            $('#prix'+productId).text(prix.toFixed(2)+' $')

            total = total-data[productId-1].price
            prixTotal.text(total.toFixed(2)+ ' $')
           
        })

        // Permet d'augmenter la quantité d'unités du produit
        $('.add-quantity-button').click(function(){
          var productId = $(this).attr('id')
            test = parseInt(localStorage.getItem(productId))
            test = test+1
            localStorage.setItem(productId,test)

            $('#nb'+productId).text(test)

            if ($('#nb'+productId).text() > 1){
              $('#'+productId+'.input-').prop("disabled",false)
            }


            prix = test*data[productId-1].price
            $('#prix'+productId).text(prix.toFixed(2)+' $')

            total = total+data[productId-1].price
            prixTotal.text(total.toFixed(2)+ ' $')
          
          
        })
        // Permet de vider le panier
        $('#remove-all-items-button').click(function(){

          if (confirm('Voulez vous supprimer tous les produits du panier?')== true){
            localStorage.clear()
            $('article').html('<h3>Panier</h3><p>Aucun produit dans le panier.</p>')
            $(".count").text(0)
            if ($('.count').text() == 0) {
             $('.count').hide();
            }
          }

        })


        
      })

        // Lorsqu'il n'y a aucun produit dans le panier, va changer la page pour panier vide
       $(function(){

      var nbPanier = $(".shopping-cart").children().length;
      if (nbPanier == 0){$('article').html('<h3>Panier</h3><p>Aucun produit dans le panier.</p>')}

      localStorage.setItem("qte", nbPanier)

    }) 

