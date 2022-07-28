//Récupère les datas.
function getProduct() {
    return fetch("http://localhost:3000/api/products/"+ id).then(res => {
    if(!res.ok) {
        throw Error("HTTP " + res.status + " " + res.statusText);
    }
    return res.json();
})
}

function addData(product) {
    
    //Sélectionne la div qui à pour classe item__img.
    let displayImg = document.getElementsByClassName('item__img')[0];
    displayImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.description}">`
    //Sélectionne la div qui à pour ID title.
    let displayTitle = document.getElementById('title');
    displayTitle.innerText = `${product.name}`;
    //Sélectionne la div qui à pour ID price.
    let displayPrice = document.getElementById('price');
    displayPrice.innerText = `${product.price}`;
    //Sélectionne la div qui à pour ID description.
    let displayDescription = document.getElementById('description');
    displayDescription.innerText = `${product.description}`;
    //Sélectionne la div qui à pour ID colors.
    let displayColors = document.getElementById('colors');
    
    for(let color of product.colors) {
        var opt = document.createElement("option");
        opt.value = color;
        opt.text = color;
        displayColors.add(opt, null);
    }
}

function addCart(product) {
    return () => {
        let productColor = document.getElementById('colors').value;
        let productAmount = parseInt(document.getElementById('quantity').value);

        if (!!productColor && productAmount > 0 && productAmount < 101 ) {

            let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

            let twinProduct = cart.find(prod => prod.id === product._id && prod.color === productColor);

            if (!!twinProduct) {
                twinProduct.amount++;
            } else {
                cart.push({
                    id: product._id, 
                    amount: productAmount,
                    color: productColor
                });
            }
            window.localStorage.setItem("cart",JSON.stringify(cart));
        }
    }
}

//Récupération de l'id de l'url.
var realTimeUrl = window.location.href;
var url = new URL(realTimeUrl);
var search_params = new URLSearchParams(url.search);

if(search_params.has('id')) {
    var id = search_params.get('id');
}

//Fonction qui récupère les datas et les affiche pour chaque produits.
getProduct().then(product => {
    addData(product); //Insert les données du produit dans la pâge.
    document.getElementById('addToCart').onclick = addCart(product); //Lie l'événement click du bouton addToCart a la call back addCart qui ajoute un produit au panier.
}).catch(err => console.log(err));