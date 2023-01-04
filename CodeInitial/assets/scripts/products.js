// Jhosim Alejandro Agudelo Campo
// fonction permet de créer la liste des produits et l'affichée à partir du JSON file
function createProductList (data) {
  const items = [];

  $.each(data, (key) => {
    items.push('<div class=\'produits\'>  ' +
   `<li><h4><a href="./product.html?id=${data[key].id} ">${data[key].name}</a></h4></li>` +
   `<li><a href="./product.html?id=${data[key].id} ">` + '<img src=' + `assets/img/${data[key].image} alt=${data[key].image}></a></li>` +
   `<li><a href="./product.html?id=${data[key].id} ">${data[key].price}$</a></li>` +
   '</div>');
  });

  const produitspage = items.length;
  $('#products-count').text(`${produitspage} produits`);

  $('<ul/>', {
    id: 'productlist',
    html: items.join(''),
  }).appendTo('.principal');

  return items;
}
// fonction qui permet de classer selon la section classement
function trieClassement (data) {
  if ($('#productcriteria').find('button').eq(0).hasClass('selected')) {
    data = data.sort((a, b) => a.price - b.price);
  } else if ($('#productcriteria').find('button').eq(1).hasClass('selected')) {
    data = data.sort((a, b) => b.price - a.price);
  } else if ($('#productcriteria').find('button').eq(2).hasClass('selected')) {
    data = data.sort((a, b) => {
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      } if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      }
      return 0;
    });
  } else {
    data = data.sort((a, b) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return -1;
      } if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return 1;
      }
      return 0;
    });
  }
}

// fonction qui permet de connecter les deux types de classement
function myFunction (param) {
  $.getJSON('data/products.json', (data) => {
    if (param === 'null') {
      trieClassement(data);

      const items = createProductList(data);
      const nbProd = items.length;
      $('.principal').html('<h3>Produits</h3>' + `<p id="products-count">${nbProd} produits</p> ` + `<ul id='productlist'>${items.join('')}</ul>`);
    } else {
      trieClassement(data);
      data = data.filter((produit) => produit.category === param);
      items = createProductList(data);
      const nbProd = items.length;

      $('.principal').html('<h3>Produits</h3>' + `<p id="products-count">${nbProd} produits</p> ` + `<ul id='productlist'>${items.join('')}</ul>`);
    }
  });
}
// fonction qui permet de classer les produits selon la section Catégories
function trieCategories (data) {
  if ($('#product-categories').find('button').eq(0).hasClass('selected')) {
    const cameras = data.filter((product) => product.category === 'cameras');
    return cameras;
  } if ($('#product-categories').find('button').eq(1).hasClass('selected')) {
    const consoles = data.filter((product) => product.category === 'consoles');
    return consoles;
  }
  if ($('#product-categories').find('button').eq(2).hasClass('selected')) {
    const screens = data.filter((product) => product.category === 'screens');
    return screens;
  }
  if ($('#product-categories').find('button').eq(3).hasClass('selected')) {
    const computers = data.filter((product) => product.category === 'computers');
    return computers;
  }

  const all = data;
  return all;
}
// fonction qui permet de connecter les deux types de classement
function classement (param) {
  $.getJSON('data/products.json', (data) => {
    if (param === 'bh') {
      data = trieCategories(data);
      data = data.sort((a, b) => a.price - b.price);
      items = createProductList(data);
      const nbProd = items.length;
      $('.principal').html('<h3>Produits</h3>' + `<p id="products-count">${nbProd} produits</p> ` + `<ul id='productlist'>${items.join('')}</ul>`);
    } else if (param === 'hb') {
      data = trieCategories(data);
      data = data.sort((a, b) => b.price - a.price);
      items = createProductList(data);
      const nbProd = items.length;
      $('.principal').html('<h3>Produits</h3>' + `<p id="products-count">${nbProd} produits</p> ` + `<ul id='productlist'>${items.join('')}</ul>`);
    } else if (param === 'az') {
      data = trieCategories(data);
      data = data.sort((a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        } if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return 1;
        }
        return 0;
      });
      items = createProductList(data);
      const nbProd = items.length;
      $('.principal').html('<h3>Produits</h3>' + `<p id="products-count">${nbProd} produits</p> ` + `<ul id='productlist'>${items.join('')}</ul>`);
    } else if (param === 'za') {
      data = trieCategories(data);
      data = data.sort((a, b) => {
        if (a.name.toUpperCase() > b.name.toUpperCase()) {
          return -1;
        } if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return 1;
        }
        return 0;
      });
      items = createProductList(data);
      const nbProd = items.length;
      $('.principal').html('<h3>Produits</h3>' + `<p id="products-count">${nbProd} produits</p> ` + `<ul id='productlist'>${items.join('')}</ul>`);
    }
  });
}

// fonction qui permet de rendre une classe selected afin qu'elle change de couleur pour la section catégorie
$(() => {
  $('div.test button').click(function () {
    $('div#product-categories button.selected').removeClass('selected');
    $(this).addClass('selected');
  });
});
// fonction qui permet de rendre une classe selected afin qu'elle change de couleur pour la section classement
$(() => {
  $('div.test2 button').click(function () {
    $('div#productcriteria button.selected').removeClass('selected');
    $(this).addClass('selected');
  });
});
// permet de créer la liste initiale en ordre alphabetique
$.getJSON('data/products.json', (data) => {
  data = data.sort((a, b) => a.price - b.price);
  createProductList(data);
});
