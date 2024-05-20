const productsContainer = document.querySelector('#products-container');

getProducts();

async function getProducts() {
  const response = await fetch('./modules/products.json');

  const productsArray = await response.json();

  renderProducts(productsArray);
}

function renderProducts(productsArray) {
  productsArray.forEach(function(card) {

    let ratingStarsHTML = '';

    for (let i = 0; i < card.rating; i++) {
      ratingStarsHTML += `<img src="./img/filled_star.svg" alt="star">`;
    }
    for (let i = card.rating; i < 5; i++) {
      ratingStarsHTML += `<img src="./img/star_empty.svg" alt="star">`
    }

    const productHTML = `<article class="card" data-id="${card.id}">
    <div class="card__pic">
      <img class="card__img" src="./img/${card.imgSrc}" alt="ABBA">
        <div class="card__new">${card.status}</div>
        <div class="card__fave">
          <button class="btn-fav">
              <svg class="btn-fav__svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.577 5.76422C10.2546 6.07365 9.74548 6.07365 9.42304 5.76422L8.84604 5.2105C8.17068 4.56239 7.25832 4.16667 6.25004 4.16667C4.17897 4.16667 2.50004 5.8456 2.50004 7.91667C2.50004 9.90219 3.57486 11.5417 5.1265 12.8888C6.67947 14.237 8.53621 15.1312 9.64558 15.5876C9.87754 15.683 10.1225 15.683 10.3545 15.5876C11.4639 15.1312 13.3206 14.237 14.8736 12.8888C16.4252 11.5417 17.5 9.90218 17.5 7.91667C17.5 5.8456 15.8211 4.16667 13.75 4.16667C12.7418 4.16667 11.8294 4.56239 11.154 5.2105L10.577 5.76422ZM10 4.00798C9.0268 3.074 7.70545 2.5 6.25004 2.5C3.2585 2.5 0.833374 4.92512 0.833374 7.91667C0.833374 13.2235 6.64199 16.1542 9.01153 17.1289C9.64968 17.3914 10.3504 17.3914 10.9885 17.1289C13.3581 16.1542 19.1667 13.2235 19.1667 7.91667C19.1667 4.92512 16.7416 2.5 13.75 2.5C12.2946 2.5 10.9733 3.074 10 4.00798Z"/>
              </svg>
          </button>
        </div>
        <div class="card__btn">
          <button class="btn btn--small btn--wide" data-cart>Add to card</button>
        </div>
    </div>
    <div class="card__desc">
      <div class="card__rating" data-rating="${card.rating}">
        ${generateStarsIcons(card.rating)}
      </div>
      <h4 class="card__title card__title--elipsis">${card.title}</h4>
      <div class="card__price">${card.price} BYN</div>
    </div>
      
    <!-- <a href="#" class="card__link"></a> -->
                          </article>`;
    productsContainer.insertAdjacentHTML('beforeend', productHTML);
  });
}

function generateStarsIcons(rating) {
  let starsHTML = '';
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starsHTML += '<img class="star" src="./img/filled_star.svg" alt="filled">';
    } else {
      starsHTML += '<img class="star" src="./img/star_empty.svg" alt="empty">';
    }
  }
  return starsHTML;
}

document.addEventListener('mouseover', function(event) {
  if (event.target.classList.contains('star')) {
    const stars = event.target.parentElement.children;
    const starIndex = Array.from(stars).indexOf(event.target);
    highlightStars(stars, starIndex);
  }
});

function highlightStars(stars, index) {
  for (let i = 0; i <= index; i++){
    stars[i].src = "./img/filled_star.svg";
  }
  for (let i = index + 1; i < stars.length; i++) {
    stars[i].src = "./img/star_empty.svg";
  }

}