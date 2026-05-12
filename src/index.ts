import { cal } from './components/cal';
import { dynamic } from './components/dynamic';
import { squares } from './components/squares';
import { timeline } from './components/timeline';

window.Webflow ||= [];
window.Webflow.push(() => {
  dynamic();
  squares();
  timeline();
  cal();
});
