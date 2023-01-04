// Jhosim Alejandro Agudelo Campo
// Cette fonction met à jour le shopping cart
$.getJSON('data/products.json', (data) => {
  const last = data.length;
  let total = 0;
  for (let i = 0; i <= last; i++) {
    if (i in localStorage) {
      const coteGauche = [];
      const prix = parseInt(localStorage.getItem(i)) * data[i - 1].price;
      total += prix;
      coteGauche.push(
        `<td class="firstcollumn "><form action="#"><input class="inputx remove-item-button" id ="${data[i - 1].id}" type="button" value="X"></form></td>` +
        `<td class="secondcollumn"><a href="./product.html? ">${data[i - 1].name}</a></td>` +
        `<td class = "price">${data[i - 1].price} $ </td>` +
        `<td class="thirdcollumn" id ="${data[i - 1].id}" ><form action="#" class= "quantite" id ="${data[i - 1].id}"><input class="input- remove-quantity-button" type="button" value="-" id ="${data[i - 1].id}" > <div id = "nb${data[i - 1].id}">${localStorage.getItem(i)}</div> <input class="add-quantity-button" id ="${data[i - 1].id}"  type="button" value="+"></form></td>` +
        `<td class="lastcollumn" id="prix${data[i - 1].id}"">${prix.toFixed(2)} $</td>`,
      );

      $('<tr/>', {

        html: coteGauche.join(''),
      }).appendTo('.shopping-cart');
    }
  }

  // Mise à jour du prix total
  const prixTotal = $('#total-amount').find('b');
  prixTotal.text(`${total} $`);

  // Permet d'éliminer les éléments du shopping cart
  $('.remove-item-button').click(function () {
    if (confirm('Voulez-vous supprimer le produit du panier?') === true) {
      $(this).parent().parent().parent()
        .remove();

      const productId = $(this).attr('id');
      // console.log(productId);
      const nbUnites = localStorage.getItem(productId);
      localStorage.removeItem(productId);

      total -= (data[productId - 1].price) * nbUnites;
      // console.log(data[productId - 1].price);
      // console.log(total);
      prixTotal.text(`${total} $`);

      const nbPanier = $('.shopping-cart').children().length;

      if (nbPanier === 0) { $('article').html('<h3>Panier</h3><p>Aucun produit dans le panier.</p>'); }

      localStorage.setItem('qte', nbPanier);
      // const quantite = localStorage.getItem('qte');

      $('.count').text(nbPanier);
      if ($('.count').text() === 0) {
        $('.count').hide();
      }
    }
  });
  // Mise à jour du prix total
  const nbPanier = $('.shopping-cart').children().length;

  if (nbPanier === 0) { $('article').html('<h3>Panier</h3><p>Aucun produit dans le panier.</p>'); }
  // Permet de diminuer la quantité d'unités du produit
  $('.remove-quantity-button').click(function () {
    const productId = $(this).attr('id');
    let test = localStorage.getItem(productId);
    test -= 1;
    localStorage.setItem(productId, test);
    $(`#nb${productId}`).text(test);

    if ($(`#nb${productId}`).text() <= 1) {
      console.log('hey');
      $(`#${productId}.input-`).prop('disabled', true);
    }

    prix = test * data[productId - 1].price;
    $(`#prix${productId}`).text(`${prix.toFixed(2)} $`);

    total -= data[productId - 1].price;
    prixTotal.text(`${total.toFixed(2)} $`);
  });

  // Permet d'augmenter la quantité d'unités du produit
  $('.add-quantity-button').click(function () {
    const productId = $(this).attr('id');
    let test = parseInt(localStorage.getItem(productId));
    test += 1;
    localStorage.setItem(productId, test);

    $(`#nb${productId}`).text(test);

    if ($(`#nb${productId}`).text() > 1) {
      $(`#${productId}.input-`).prop('disabled', false);
    }

    prix = test * data[productId - 1].price;
    $(`#prix${productId}`).text(`${prix.toFixed(2)} $`);

    total += data[productId - 1].price;
    prixTotal.text(`${total.toFixed(2)} $`);
  });
  // Permet de vider le panier
  $('#remove-all-items-button').click(() => {
    if (confirm('Voulez vous supprimer tous les produits du panier?') === true) {
      localStorage.clear();
      $('article').html('<h3>Panier</h3><p>Aucun produit dans le panier.</p>');
      $('.count').text(0);
      if ($('.count').text() === 0) {
        $('.count').hide();
      }
    }
  });
});

// Lorsqu'il n'y a aucun produit dans le panier, va changer la page pour panier vide
$(() => {
  const nbPanier = $('.shopping-cart').children().length;
  if (nbPanier === 0) { $('article').html('<h3>Panier</h3><p>Aucun produit dans le panier.</p>'); }

  localStorage.setItem('qte', nbPanier);
});
