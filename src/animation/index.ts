import { glow } from './glow';
import { smoothScroll } from './smooth-scroll';
import { workList } from './work-list';

export const animation = () => {
  smoothScroll();
  workList();
  glow();
};
