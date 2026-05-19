import { Shader } from './Shader';

export const shaders = () => {
  const components = document.querySelectorAll<HTMLCanvasElement>('[data-shader]');
  components.forEach((component) => {
    const instance = new Shader(component);
    instance.init();
  });
};
