import { initCounter } from './counter';
import { initTime } from './time';

/**
 * Dynamic component handlers
 * Maps data-dynamic attribute values to their initialization functions
 */
const handlers: Record<string, (element: HTMLElement) => void> = {
  time: initTime,
  counter: initCounter,
};

/**
 * Initialize all dynamic components in the document
 * Finds all elements with data-dynamic attribute and initializes them
 */
export const dynamic = (): void => {
  const elements = document.querySelectorAll<HTMLElement>('[data-dynamic]');

  elements.forEach((element) => {
    const type = element.getAttribute('data-dynamic');

    if (!type) {
      console.warn('Element has data-dynamic attribute but no value:', element);
      return;
    }

    const handler = handlers[type];

    if (handler) {
      handler(element);
    } else {
      console.warn(`No handler found for data-dynamic="${type}"`, element);
    }
  });
};
