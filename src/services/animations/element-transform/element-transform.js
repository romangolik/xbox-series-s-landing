import { ANIMATION_TYPES } from './_data/animation-types.js';

export class ElementTransformController {
    html;
    animationFunctions = [];

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
            this.animationFunctions.forEach(animationFunction => animationFunction());
        },{ passive: true });
    }

    addAnimation(config) {
        const elementWrapper = config.elementWrapperSelector ? document.querySelector(config.elementWrapperSelector) : null;
        const element = elementWrapper ? elementWrapper.querySelector(config.elementSelector) : document.querySelector(config.elementSelector);

        config['element'] = element;
        config['elementWrapper'] = elementWrapper;

        const animationFunction = () => {
            const htmlScrollTop = this.html.scrollTop;
            const htmlScrollBottom = this.html.scrollTop + window.innerHeight;

            const animationStartTrigger = elementWrapper ? elementWrapper.offsetTop : element.offsetTop;
            const animationEndTrigger = elementWrapper ? (elementWrapper.offsetTop + elementWrapper.offsetHeight) : (element.offsetTop + element.offsetHeight);

            const animationDurationDistance = elementWrapper.offsetHeight + window.innerHeight;
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
