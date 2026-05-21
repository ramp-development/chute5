import { animation } from './animation';
import { components } from './components';
import { utils } from './utils';

window.Webflow ||= [];
window.Webflow.push(() => {
  components();
  animation();
  utils();
});
