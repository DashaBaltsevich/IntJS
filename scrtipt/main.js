'use strict';
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvCardimg = document.querySelectorAll('img.tv-card__img');


    class DBService {
        getData = async (url) => {
            const res = await fetch(url);
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Не удалось получить данные 
                по адресу ${url}`)
            }
        }
    
        getTestData = asynс () => {
            return await this.getData('test.json')
        }
    };
    
    const renderCard = response => {
        response.results.forEach((e) => {
            const {
                backdrop_path: backdrop,
                 name: title,
                 poster_path: poster,
                 vote_average: vote} = item;

            const posterIMG = poster ? IMG_URL + poster: 'img/no-poster';
            const backdropIMG = backdrop ? IMG_URL + backdrop: 'img/no-poster';
            const voteElem = '';

            const card = document.createElement('li');
            card.classList.add('tv-shows__item');
            card.innerHTML = `
            <a href="#" class="tv-card">
            <span class="tv-card__vote">${vote}</span>
            <img class="tv-card__img"
                 src="${posterIMG}"
                 data-backdrop="${backdropIMG}"
                 alt="Звёздные войны: Повстанцы">
            <h4 class="tv-card__head">${title}</h4>
        </a>
        `;
            tvShowsList.append(card);

            console.log(card);
        });
    };
    
    new DBService().getTestData().then(renderCard);

//меню

hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

//дроп-меню делегирование
leftMenu.addEventListener('click', (event) => {
    const target = event.target,
        dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});

//меняется картинка при наведении, возвращается на исходную, если убрать мышку 


// tvCardimg.forEach((element) => {
//     element.addEventListener('mouseover', () => {
//         const src = element.getAttribute('src'),
//             dataDrop = element.getAttribute('data-backdrop');
//             element.setAttribute('src', dataDrop);
//         element.setAttribute('data-backdrop', src);
        
//     });

//     element.addEventListener('mouseout', () => {
//         const src = element.getAttribute('src'),
//             dataDrop = element.getAttribute('data-backdrop');
//             element.setAttribute('src', dataDrop);
//         element.setAttribute('data-backdrop', src);
//     });
// });

//или можно так:

// const backDrop = event => {
//     const target = event.target;
//     if (!target.matches('img')) return;
//     [target.dataset.backdrop, target.src] = [target.src, target.dataset.backdrop];
// };

// document.addEventListener('mouseover', backDrop);
// document.addEventListener('mouseout', backDrop);

//или так

const changeImg = event => {
    const card = event.target.closest('.tv-shows__item');
    if(card) {
        const img = card.querySelector('.tv-card__img');
        //чтобы не менялось на пустоту, если нет второй картинки
        if(img.dataset.backdrop) {
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }
    }
};
document.addEventListener('mouseover', changeImg);
document.addEventListener('mouseout', changeImg);


//модальное окно

const tvShowsList = document.querySelector('.tv-shows__list'),
    modal = document.querySelector('.modal');

tvShowsList.addEventListener('click', (event) => {
    const target = event.target,
        card = target.closest('.tv-card');
    if (card) {
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }
});

//закрытие

modal.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.closest('.cross') || event.target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
});








