import { ANIMATION_TYPES } from './_data/animation-types.js';

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

export class ElementTransformController {
    html;
    animationFunctions = [];
    ticking = [false, false, false, false];

    ANIMATION_TRANSFORM_FUNCTIONS = {
        [ANIMATION_TYPES.ZOOM_IN]: (config, multiplier) =>
            `scale(${config.scaleFrom + (config.scaleTo - config.scaleFrom) * multiplier})`,
        [ANIMATION_TYPES.ZOOM_OUT]: (config, multiplier) =>
            `scale(${config.scaleFrom + (config.scaleTo - config.scaleFrom) * multiplier})`,
        [ANIMATION_TYPES.MOVE_TO_RIGHT]: (config, multiplier) =>
            `translateX(${(config.element.offsetWidth * config.offset - config.elementWrapper.offsetWidth) * multiplier}px)`,
        [ANIMATION_TYPES.MOVE_TO_LEFT]: (config, multiplier) =>
            `translateX(-${(config.element.offsetWidth * config.offset - config.elementWrapper.offsetWidth) * multiplier}px)`,
        [ANIMATION_TYPES.CLOCKWISE_ROTATE]: (config, multiplier) =>
            `rotate(${config.turningAngle * multiplier}deg)`,
        [ANIMATION_TYPES.COUNTERCLOCKWISE_ROTATE]: (config, multiplier) =>
            `rotate(${-1 * config.turningAngle * multiplier}deg)`,
    }

    constructor() {
        this.initScrollEvent();
        this.html = document.querySelector('html');
    }

    initScrollEvent() {
        window.addEventListener('scroll', () => {
            /*const htmlScrollTop = this.html.scrollTop;
            const htmlScrollBottom = htmlScrollTop + window.innerHeight;*/

            this.animationFunctions.forEach((animationFunction, index) => {
                if (!this.ticking[index]) {
                    this.ticking[index] = true;
                    requestAnimFrame(() => {
                        animationFunction();
                        this.ticking[index] = false;
                    });
                }
            });
        },{ passive: true });
    }

    addAnimation(config) {
        const elementWrapper = config.elementWrapperSelector ? document.querySelector(config.elementWrapperSelector) : null;
        const element = elementWrapper ? elementWrapper.querySelector(config.elementSelector) : document.querySelector(config.elementSelector);

        config['element'] = element;
        config['elementWrapper'] = elementWrapper;

        const animationFunction = () => {
            const htmlScrollTop = this.html.scrollTop;
            const htmlScrollBottom = htmlScrollTop + window.innerHeight;

            const triggerElementHeight = elementWrapper ? elementWrapper.offsetHeight : element.offsetHeight;

            const animationStartTrigger = elementWrapper ? elementWrapper.offsetTop : element.offsetTop;
            const animationEndTrigger = animationStartTrigger + triggerElementHeight;

            const animationDurationDistance = triggerElementHeight + window.innerHeight;
            const animationPassedDistance = htmlScrollBottom - animationStartTrigger;

            if (htmlScrollBottom >= animationStartTrigger && htmlScrollTop <= animationEndTrigger) {
                element.style.transform = this.ANIMATION_TRANSFORM_FUNCTIONS[config.type](
                    config,
                    (animationPassedDistance / animationDurationDistance)
                );
            }
        }

        this.animationFunctions.push(animationFunction);

        animationFunction();
    }
}
