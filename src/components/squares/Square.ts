export class Square {
  element: HTMLDivElement;
  selector: string = 'data-squares';
  verticalWrap: HTMLDivElement;
  horizontalWrap: HTMLDivElement;
  targetSquareSize: number = 96;
  resizeTimeout: number | null = null;

  constructor(component: HTMLDivElement) {
    this.element = component;
    this.verticalWrap = this.element.querySelector(`[${this.selector}="vertical"]`);
    this.horizontalWrap = this.element.querySelector(`[${this.selector}="horizontal"]`);
  }

  init() {
    this.setupGrid();
    this.handleResize();
  }

  setupGrid() {
    const verticalStyle = window.getComputedStyle(this.verticalWrap);
    const width = this.verticalWrap.offsetWidth - parseFloat(verticalStyle.paddingInline) * 2;
    const height = this.element.offsetHeight;

    const verticalCount = Math.round(width / this.targetSquareSize) + 1;
    const horizontalCount = Math.round(height / this.targetSquareSize) + 1;

    this.createLines(this.verticalWrap, verticalCount);
    this.createLines(this.horizontalWrap, horizontalCount);
  }

  createLines(wrapper: HTMLElement, count: number) {
    const template = wrapper.firstElementChild as HTMLElement;
    if (!template) return;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      fragment.appendChild(template.cloneNode(true));
    }

    wrapper.innerHTML = '';
    wrapper.appendChild(fragment);
  }

  handleResize() {
    window.addEventListener('resize', () => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = window.setTimeout(() => {
        this.setupGrid();
      }, 50);
    });
  }

  destroy() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }
}
