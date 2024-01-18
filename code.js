const apiUrl = 'https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093';
const productContainer = document.getElementById('productContainer');
const searchBar = document.getElementById('searchBar');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

let products = [];

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && Array.isArray(data.data)) {
            products = data.data;
            console.log('Fetched products:', products);
            renderProducts(products);
        } else {
            console.error('Invalid data format:', data);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function renderProducts(productsToRender) {
    console.log('Rendering products:', productsToRender);

    if (Array.isArray(productsToRender) && productsToRender.length > 0) {
        productContainer.innerHTML = '';
        productsToRender.forEach(product => {
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
        });
    } else {
        console.warn('No products to render.');
    }
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const img = document.createElement('img');
    img.src = product.product_image || 'https://in.images.search.yahoo.com/search/images;_ylt=AwrPpg3BBKll2eIL0pS7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3BpdnM-?p=macbook+air&fr2=piv-web&type=E210IN885G0&fr=mcafee#id=0&iurl=https%3A%2F%2Fwww.lifewire.com%2Fthmb%2FrSUBg44wBYfr0Am2iVy-1tdHQrM%3D%2F1500x1000%2Ffilters%3Afill(auto%2C1)%2F_hero_horiz_MacBook-Air-M1-2020-Computer-1-030783bfc1ec44f6be220018b3b89239.jpg&action=click'; 
    img.alt = product.product_title;
    productCard.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = product.product_title;
    productCard.appendChild(title);

    return productCard;
}


function highlightSearchResults() {
    const searchKey = searchBar.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const title = card.querySelector('h3');
        const cardText = title.textContent.toLowerCase();

        if (searchKey && cardText.includes(searchKey)) {
            title.classList.add('highlight');
        } else {
            title.classList.remove('highlight');
        }
    });
}

function switchToGridView() {
    productContainer.classList.remove('list-view');
}

function switchToListView() {
    productContainer.classList.add('list-view');
}

searchBar.addEventListener('input', highlightSearchResults);
gridViewBtn.addEventListener('click', switchToGridView);
listViewBtn.addEventListener('click', switchToListView);

fetchProducts();
