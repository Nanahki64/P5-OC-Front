//Récupère les datas.
function getProduct() {
    return fetch("http://localhost:3000/api/products").then(res => {
        if(!res.ok) {
            throw Error("HTTP " + res.status + " " + res.statusText);
        }
        return res.json();
    })
}

//Retourne le template html.
function getProductTemplate(pendingCart, productData) {
    return `<article class="cart__item" data-id="${pendingCart.id}" data-color="${pendingCart.color}">
    <div class="cart__item__img">
      <img src="${productData.imageUrl}" alt="${productData.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productData.name}</h2>
        <p>${pendingCart.color}</p>
        <p>${productData.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${pendingCart.amount}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
}

function addCartData(products) {
  let cart = localStorage.getItem("cart");
  let pendingCart = JSON.parse(cart);
  
  let html = "";
  let display = document.getElementById("cart__items");
  
  for(let productInCart of pendingCart) {

    productData = products.find(prod => prod._id === productInCart.id);
    
    html += getProductTemplate(productInCart, productData);
  }
  display.innerHTML = html;
}

// function detailsOrder() {
//   let displayAmount = document.getElementById('totalQuantity');
//   displayAmount.innerText = ``;
// }

//Fonction qui récupère les datas et les affiche pour chaque produits.
getProduct().then( products => {
  addCartData(products)
  // detailsOrder()
}).catch(err => console.log(err))