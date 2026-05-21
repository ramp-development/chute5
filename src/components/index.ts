import { dynamic } from './dynamic';
import { nav } from './nav';
import { shaders } from './shaders';
import { timeline } from './timeline';
import { videos } from './videos';

export const components = () => {
  nav();
  dynamic();
  timeline();
  videos();
  shaders();
};
