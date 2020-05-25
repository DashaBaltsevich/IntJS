'use strict';
const leftMenu = document.querySelector('.left-menu'),
    hamburger = document.querySelector('.hamburger'),
    tvCardimg = document.querySelectorAll('img.tv-card__img');

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


tvCardimg.forEach((element) => {
    element.addEventListener('mouseover', () => {
        const src = element.getAttribute('src'),
            dataDrop = element.getAttribute('data-backdrop');
            element.setAttribute('src', dataDrop);
        element.setAttribute('data-backdrop', src);
        
    });

    element.addEventListener('mouseout', () => {
        const src = element.getAttribute('src'),
            dataDrop = element.getAttribute('data-backdrop');
            element.setAttribute('src', dataDrop);
        element.setAttribute('data-backdrop', src);
    });
});