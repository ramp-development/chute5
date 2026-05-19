import { dynamic } from './dynamic';
import { shaders } from './shaders';
import { timeline } from './timeline';

export const components = () => {
  shaders();
  dynamic();
  timeline();
};
