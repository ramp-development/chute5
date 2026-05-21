import type { gsap } from 'gsap';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';

type GSAP = typeof gsap;
type ScrollTriggerStatic = typeof ScrollTrigger;

declare global {
  const gsap: GSAP;
  const ScrollTrigger: ScrollTriggerStatic;
}

export {};
