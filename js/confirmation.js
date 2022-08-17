let validateOrderId = document.getElementById('orderId');

//Récupération de l'id de l'url.
var realTimeUrl = window.location.href;
var url = new URL(realTimeUrl);
var search_params = new URLSearchParams(url.search);

if(search_params.has('orderId')) {
    var orderId = search_params.get('orderId');
}

//Affiche le numéro de commande.
validateOrderId.innerText = orderId;

//Supprime le panier et la fiche contact.
window.localStorage.clear();