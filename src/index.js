import './styles.scss';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { ANIMATION_TYPES } from './services/animations/element-transform/_data/animation-types.js';
import { ElementTransformController } from './services/animations/element-transform/element-transform.js';

AOS.init();

const BURGER = document.getElementById('burger');
const NAVIGATION = document.getElementById('navigation');

const PLAY_ICON = document.getElementById('play-icon');
const PAUSE_ICON = document.getElementById('pause-icon');
const TECHNOLOGICAL_VIDEO = document.getElementById('technological-video');

BURGER.addEventListener('click', () => {
    let overlay;
    if (!NAVIGATION.classList.contains('header__navigation_show')) {
        NAVIGATION.classList.add('header__navigation_show');
        BURGER.classList.add('header__burger_active');

        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
            NAVIGATION.classList.remove('header__navigation_show');
            BURGER.classList.remove('header__burger_active');
            overlay.remove();
        });
    } else {
        document.querySelector('.overlay')
            .dispatchEvent(new Event('click'));
    }
});

document.getElementById('player-button')
    .addEventListener('click', () => {
        if (PLAY_ICON.hasAttribute('hidden')) {
            PLAY_ICON.removeAttribute('hidden');
            PAUSE_ICON.setAttribute('hidden', '');
            TECHNOLOGICAL_VIDEO.pause();
        } else {
            PAUSE_ICON.removeAttribute('hidden');
            PLAY_ICON.setAttribute('hidden', '');
            TECHNOLOGICAL_VIDEO.play();
        }
    });

document.querySelectorAll('.accordion')
    .forEach(accordion => {
        accordion.addEventListener('click', () => {
            accordion.classList.toggle('accordion_active');
        });
    });

const elementsTransformAnimation = new ElementTransformController;

elementsTransformAnimation.addAnimation({
    type: ANIMATION_TYPES.ZOOM_IN,
    elementWrapperSelector: '#zoom-in-image',
    elementSelector: 'img',
    scaleFrom: 1,
    scaleTo: 1.3
});

elementsTransformAnimation.addAnimation({
    type: ANIMATION_TYPES.ZOOM_OUT,
    elementWrapperSelector: '#zoom-out-image',
    elementSelector: 'img',
    scaleFrom: 1.3,
    scaleTo: 1
});

elementsTransformAnimation.addAnimation({
    type: ANIMATION_TYPES.MOVE_TO_RIGHT,
    elementWrapperSelector: '#slide-to-right-image',
    elementSelector: 'img',
    offset: 0.86
});

elementsTransformAnimation.addAnimation({
    type: ANIMATION_TYPES.COUNTERCLOCKWISE_ROTATE,
    elementWrapperSelector: '#price-info-block',
    elementSelector: '.price-info__label-image',
    turningAngle: 1420
});
