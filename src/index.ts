import { cal } from './components/cal';
import { squares } from './components/squares';
import { timeline } from './components/timeline';

window.Webflow ||= [];
window.Webflow.push(() => {
  squares();
  timeline();
  cal();
});
