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
function getProductTemplate(product) {
    return `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`
}

//Séléctionne la section qui à pour ID items.
let display = document.getElementById("items");

//Fonction qui récupère les datas et les affiche pour chaque produits.
getProduct().then( products => { 
    let html = "";

    for (const product of products) {
        html += getProductTemplate(product);
    }
    display.innerHTML = html;
}).catch(err => console.log(err))