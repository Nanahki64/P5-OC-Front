//Récupère les datas.
function getProduct() {
    return fetch("http://localhost:3000/api/products/"+ id).then(res => {
        if(!res.ok) {
            throw Error("HTTP " + res.status + " " + res.statusText);
        }
        return res.json();
    })
}

//Récupération de l'id de l'url.
var realTimeUrl = window.location.href;

var url = new URL(realTimeUrl);

var search_params = new URLSearchParams(url.search);

if(search_params.has('id')) {
    var id = search_params.get('id');
}

//Sélectionne la div qui à pour classe item__img.
let displayImg = document.getElementsByClassName('item__img')[0];
//Sélectionne la div qui à pour ID title.
let displayTitle = document.getElementById('title');
//Sélectionne la div qui à pour ID price.
let displayPrice = document.getElementById('price');
//Sélectionne la div qui à pour ID description.
let displayDescription = document.getElementById('description');
//Sélectionne la div qui à pour ID colors.
let displayColors = document.getElementById('colors');

//Fonction qui récupère les datas et les affiche pour chaque produits.
getProduct().then(product => {

    displayImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.description}">`

    displayTitle.innerHTML = `${product.name}`;

    displayPrice.innerHTML = `${product.price}`;

    displayDescription.innerHTML = `${product.description}`;

    let numberOfColors = product.colors.length;

    for(let colors = 0; colors < numberOfColors; colors++) {
        var opt = document.createElement("option");
        opt.value = product.colors[colors];
        opt.text = product.colors[colors];
        displayColors.add(opt, null);
    }

}).catch(err => console.log(err));