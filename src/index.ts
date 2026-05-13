import { components } from './components';
import { utils } from './utils';

window.Webflow ||= [];
window.Webflow.push(() => {
  components();
  utils();
});
