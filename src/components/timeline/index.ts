import { Timeline } from './Timeline';

export const timeline = () => {
  const components = document.querySelectorAll<HTMLElement>('[data-component="timeline"]');
  components.forEach((component) => {
    const instance = new Timeline(component);
    instance.init();
  });
};
