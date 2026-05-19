import { createShader } from 'shaders/js';

export class Shader {
  element: HTMLCanvasElement;
  selector: string = 'data-shader';
  location: string;
  resizeTimeout: number | null = null;

  constructor(component: HTMLCanvasElement) {
    this.element = component;
    this.location = component.dataset.shader as string;
  }

  init() {
    this.setupShader();
    this.handleResize();
  }

  async setupShader() {
    // get background colour from this.element var(--_theme---background-2)
    const style = getComputedStyle(this.element);
    const background1 = style.getPropertyValue('--_theme---background');
    const background2 = style.getPropertyValue('--_theme---background-2');
    await createShader(this.element, {
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
            strength: 0.25,
          },
        },
      ],
    });
  }

  handleResize() {
    // window.addEventListener('resize', () => {
    //   if (this.resizeTimeout) {
    //     clearTimeout(this.resizeTimeout);
    //   }
    //   this.resizeTimeout = window.setTimeout(() => {
    //     this.setupShader();
    //   }, 50);
    // });
  }

  destroy() {
    // if (this.resizeTimeout) {
    //   clearTimeout(this.resizeTimeout);
    // }
  }
}
