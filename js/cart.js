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

function displayCart() {
  let pendingCart = JSON.parse(window.localStorage.getItem("cart")) ?? [];
  let display = document.getElementById("cart__items");
  
  if(pendingCart.length) {
    getProduct().then( products => {
      let amountTotal = 0;
      let priceTotal = 0;

      let html = "";

      for(let productInCart of pendingCart) {
        amountTotal += productInCart.amount;

        productData = products.find(prod => prod._id === productInCart.id);
        
        html += getProductTemplate(productInCart, productData);
      }
      display.innerHTML = html;
      displayDetailsOrder(amountTotal);
    }).catch(err => console.log(err))
    
  } else {
    display.innerHTML = '<h1>est vide</h1>'
  }
}

function displayDetailsOrder(amountTotal) {
  let displayAmount = document.getElementById('totalQuantity');
  displayAmount.innerText = `${amountTotal}`;
}


/*******************************main*******************************************/
displayCart();