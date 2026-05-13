import { cal } from './cal';
import { dynamic } from './dynamic';
import { squares } from './squares';
import { timeline } from './timeline';

export const components = () => {
  console.log('components');

  cal();
  dynamic();
  squares();
  timeline();
};
