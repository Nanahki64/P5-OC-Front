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

//Récupère le template pour la classe item__img.
function getProductTemplateImg(product) {
    return `<img src="${product.imageUrl}" alt="${product.description}">`
}

//Récupère le template pour l'ID title.
function getProductTemplateTitle(product) {
    return `${product.name}`
}

//Récupère le template pour l'ID price.
function getProductTemplatePrice(product) {
    return `${product.price}`
}

//Récupère le template pour l'ID description.
function getProductTemplateDescription(product) {
    return `${product.description}`
}

//Récupère le template pour l'ID colors.
function getProductTemplateColors(product) {
    let arrayColors = product.colors;
    console.log(arrayColors);
    
    arrayColors.forEach(element => {
        console.log(element);
        //return `<option value="${product.colors}">${product.colors}</option>`
    });
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
let displayColors = document.getElementsByTagName('option');

//Fonction qui récupère les datas et les affiche pour chaque produits.
getProduct().then(product => {
    let htmlImage = "";
    let image = htmlImage += getProductTemplateImg(product);
    displayImg.innerHTML = image;

    let htmlName = "";
    let name = htmlName += getProductTemplateTitle(product);
    displayTitle.innerHTML = name;

    let htmlPrice = "";
    let price = htmlPrice += getProductTemplatePrice(product);
    displayPrice.innerHTML = price;

    let htmlDescription = "";
    let description = htmlDescription += getProductTemplateDescription(product);
    displayDescription.innerHTML = description;

    let htmlColors = "";
    let colors = htmlColors += getProductTemplateColors(product);
    displayColors = colors;

    console.log(product);

}).catch(err => console.log(err));