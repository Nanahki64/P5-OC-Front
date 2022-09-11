/**
 * Récupère l'id valide de la commande
 * @returns {Object}
 */
let validateOrderId = document.getElementById('orderId');

/**
 * Récupère l'id de l'url.
 * @return {Object}
 */
var realTimeUrl = window.location.href;
var url = new URL(realTimeUrl);
var search_params = new URLSearchParams(url.search);

if(search_params.has('orderId')) {
    var orderId = search_params.get('orderId');
}

/**
 * Affiche le numéro de commande.
 * @return {string}
 */
validateOrderId.innerText = orderId;

/**
 * Supprime le panier.
 */
window.localStorage.clear();