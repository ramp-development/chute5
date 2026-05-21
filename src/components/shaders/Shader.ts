import { createShader, type ShaderInstance } from 'shaders/js';

export class Shader {
  element: HTMLCanvasElement;
  shader: ShaderInstance | null = null;
  resizeTimeout: number | null = null;
  observer: IntersectionObserver | null = null;
  isTouchDevice: boolean;

  constructor(component: HTMLCanvasElement) {
    this.element = component;
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  async init() {
    if (this.isTouchDevice) return;

    this.setupObserver();
    this.handleResize();
  }

  setupObserver() {
    const viewportHeight = window.innerHeight;
    const rootMargin = `${viewportHeight * 0.2}px`;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.shader) {
            this.setupShader();
          } else if (!entry.isIntersecting && this.shader) {
            this.destroyShader();
          }
        });
      },
      {
        rootMargin,
      }
    );

    this.observer.observe(this.element);
  }

  async setupShader() {
    // get background colour from this.element var(--_theme---background-2)
    const style = getComputedStyle(this.element);
    const background1 = style.getPropertyValue('--_theme---background');
    const background2 = style.getPropertyValue('--_theme---background-2');
    this.shader = await createShader(this.element, {
      components: [
        {
          type: 'Swirl',
          id: 'idmopuqc7pml2j3z58j',
          props: {
            colorA: background2,
            colorB: background2,
            detail: 1.7,
          },
        },
        {
          type: 'ChromaFlow',
          id: 'idmopucfslad9zri29r',
          props: {
            baseColor: background1,
            downColor: '#fe7f2d',
            leftColor: '#fe7f2d',
            momentum: 13,
            opacity: 1,
            radius: 5,
            rightColor: '#fe7f2d',
            upColor: '#fe7f2d',
          },
        },
        {
          type: 'FlutedGlass',
          id: 'idmopubojpm8gm5raws',
          props: {
            aberration: 0.61,
            angle: 28,
            frequency: 10,
            highlight: 0.12,
            highlightSoftness: 0,
            lightAngle: -90,
            refraction: 4,
            shape: 'rounded',
            softness: 1,
            speed: 0.15,
          },
        },
        {
          type: 'FilmGrain',
          id: 'idmopv498snizgmx7xn',
          props: {
            strength: 0,
          },
        },
      ],
    });
  }

  handleResize() {
    window.addEventListener('resize', () => {
      this.shader?.resize();
    });
  }

  destroyShader() {
    if (this.shader) {
      this.shader.destroy();
      this.shader = null;
    }
  }

  async destroy() {
    this.destroyShader();

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
  }
}
