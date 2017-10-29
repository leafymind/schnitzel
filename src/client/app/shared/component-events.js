import { Manager, Tap, Press, Swipe, DIRECTION_HORIZONTAL } from 'hammerjs';

const SwipeHorizontal = [Swipe, { direction: DIRECTION_HORIZONTAL }];

function createSvelteEvent(eventName, recognizers)
{
  return function(element, callback)
  {
    const mc = new Manager(element, { recognizers });
    mc.on(eventName, callback);
    return { teardown: () => mc.destroy() };
  }
}

export const tap = createSvelteEvent('tap', [[Tap]]);
export const longpress = createSvelteEvent('press', [[Press]]);
export const swipeLeft = createSvelteEvent('swipeleft', [SwipeHorizontal]);
export const swipeRight = createSvelteEvent('swiperight', [SwipeHorizontal]);
export function enter(element, callback)
{
  element.addEventListener('keydown', e =>
  {
    if (e.keyCode === 13)
    {
      e.preventDefault();
      callback(e);
    }
  });

  return {
    teardown()
    {
      element.removeEventListener('keydown', callback);
    }
  };
}
