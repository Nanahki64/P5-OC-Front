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
        amountTotal = Number(amountTotal) + Number(productInCart.amount);

        productData = products.find(prod => prod._id === productInCart.id);

        priceTotal = Number(priceTotal) + (Number(productData.price) * Number(productInCart.amount));

        html += getProductTemplate(productInCart, productData);
      }
      display.innerHTML = html;
      displayDetailsOrder(amountTotal, priceTotal);
      changeAmount();
      deleteProduct();
    }).catch(err => console.log(err))
    
  } else {
    display.innerHTML = '<h1>est vide</h1>'
  }
}

function displayDetailsOrder(amountTotal, priceTotal) {
  let displayAmount = document.getElementById('totalQuantity');
  displayAmount.innerText = `${amountTotal}`;

  let displayPrice = document.getElementById('totalPrice');
  displayPrice.innerText = `${priceTotal}`;
}

function changeAmount() {
  let actualAmounts = document.getElementsByClassName('itemQuantity');
  let pendingCart = JSON.parse(window.localStorage.getItem("cart"));

  for(let actualAmount of actualAmounts) {
    actualAmount.addEventListener('change', function () {
      
      let selectedProduct = actualAmount.closest('.cart__item');
      
      let findProductInCart = pendingCart.find(prod => prod.id === selectedProduct.dataset.id && prod.color === selectedProduct.dataset.color);
      
      if(!!findProductInCart) {
        findProductInCart.amount = actualAmount.value;
      }
      window.localStorage.setItem("cart", JSON.stringify(pendingCart));
    });
  }
}

function deleteProduct() {
  let deleteButton = document.getElementsByClassName('deleteItem');
  let pendingCart = JSON.parse(window.localStorage.getItem("cart"));
  
  for(let productToDelete of deleteButton) {
    productToDelete.addEventListener('click', function () {
      
      let selectedProduct = productToDelete.closest('.cart__item');
      
      let findProductInCart = pendingCart.find(prod => prod.id === selectedProduct.dataset.id && prod.color === selectedProduct.dataset.color);

      if (!!findProductInCart) {
        pendingCart = pendingCart.filter(prod => prod !== findProductInCart);
        window.location.reload();
      }
      window.localStorage.setItem("cart", JSON.stringify(pendingCart));
    });
  }
}

function submitOrder() {
  let cartOrderForms = document.querySelector('.cart__order__form');

  const firstNameRegex = function(input) {
    let regex = new RegExp(/^[A-Z][A-Za-z\é\è\ê\-]+$/);
    let testInput = regex.test(input.value);
    let selectErrorTag = input.nextElementSibling;

    if(!testInput) {
      selectErrorTag.innerText = "Prénom incorrect"
      return false;
    } else {
      selectErrorTag.innerText = ""
      return true;
    }
  };

  const lastNameRegex = function(input) {
    let regex = new RegExp(/^[A-Z][A-Za-z\é\è\ê\-]+$/);
    let testInput = regex.test(input.value);
    let selectErrorTag = input.nextElementSibling;

    if(!testInput) {
      selectErrorTag.innerText = "Nom incorrect"
      return false;
    } else {
      selectErrorTag.innerText = ""
      return true;
    }
  };

  const addressRegex = function (input) {
    let regex = new RegExp(/^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+)$/);
    let testInput = regex.test(input.value);
    let selectErrorTag = input.nextElementSibling;

    if(!testInput) {
      selectErrorTag.innerText = "adresse incorrect"
      return false;
    } else {
      selectErrorTag.innerText = ""
      return true;
    }
  };

  const cityRegex = function(input) {
    let regex = new RegExp(/^[A-Z][A-Za-z\é\è\ê\-]+$/);
    let testInput = regex.test(input.value);
    let selectErrorTag = input.nextElementSibling;

    if(!testInput) {
      selectErrorTag.innerText = "Ville incorrect"
      return false;
    } else {
      selectErrorTag.innerText = ""
      return true;
    }
  };

  const emailRegex = function (input) {
    let regex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
    let testInput = regex.test(input.value);
    let selectErrorTag = input.nextElementSibling;

    if(!testInput) {
      selectErrorTag.innerText = "Email incorrect"
      return false;
    } else {
      selectErrorTag.innerText = ""
      return true;
    }
  };

  cartOrderForms.firstName.addEventListener('change', function () {
    firstNameRegex(this);
  });

  cartOrderForms.lastName.addEventListener('change', function () {
    lastNameRegex(this);
  });

  cartOrderForms.address.addEventListener('change', function () {
    addressRegex(this);
  });

  cartOrderForms.city.addEventListener('change', function () {
    cityRegex(this);
  });

  cartOrderForms.email.addEventListener('change', function () {
    emailRegex(this);
  });

  cartOrderForms.order.addEventListener('click', function () {
    if(firstNameRegex(cartOrderForms.firstName) 
        && lastNameRegex(cartOrderForms.lastName) 
        && addressRegex(cartOrderForms.address) 
        && cityRegex(cartOrderForms.city) 
        && emailRegex(cartOrderForms.email)) {
      let validForm = {
        firstName: cartOrderForms.firstName.value,
        lastName: cartOrderForms.lastName.value,
        address: cartOrderForms.address.value,
        city: cartOrderForms.city.value,
        email: cartOrderForms.email.value,
      }
      let validOrder = JSON.stringify(validForm);
      window.localStorage.setItem('validForm', validOrder);
    }
  });
  
}

/*******************************main*******************************************/
displayCart();
submitOrder();