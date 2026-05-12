import { Square } from './Square';

export const squares = () => {
  const components = document.querySelectorAll<HTMLDivElement>('[data-component="squares"]');
  components.forEach((component) => {
    const instance = new Square(component);
    instance.init();
  });
};
