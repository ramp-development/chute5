export class Timeline {
  element: HTMLElement;
  selector: string = 'data-timeline';
  currentWeek: HTMLElement;
  nextWeek: HTMLElement;
  todayMarker: HTMLElement;

  constructor(component: HTMLElement) {
    this.element = component;
    this.currentWeek = this.element.querySelector(`[${this.selector}="current"]`);
    this.nextWeek = this.element.querySelector(`[${this.selector}="next"]`);
    this.todayMarker = this.element.querySelector(`[${this.selector}="today"]`);
  }

  init() {
    this.updateWeekLabels();
    this.positionTodayMarker();
    this.handleResize();
  }

  updateWeekLabels() {
    const today = new Date();
    const showWeekends = this.areWeekendsVisible();

    // Get Monday of current week
    const currentMonday = this.getMonday(today);
    const currentEnd = new Date(currentMonday);
    currentEnd.setDate(currentMonday.getDate() + (showWeekends ? 6 : 4));

    // Get Monday of next week
    const nextMonday = new Date(currentMonday);
    nextMonday.setDate(currentMonday.getDate() + 7);
    const nextEnd = new Date(nextMonday);
    nextEnd.setDate(nextMonday.getDate() + (showWeekends ? 6 : 4));

    this.currentWeek.textContent = this.formatWeekRange(currentMonday, currentEnd);
    this.nextWeek.textContent = this.formatWeekRange(nextMonday, nextEnd);
  }

  areWeekendsVisible(): boolean {
    const weekend = this.element.querySelector(`[${this.selector}="weekend"]`) as HTMLElement;
    if (!weekend) return true;

    const style = window.getComputedStyle(weekend);
    return style.display !== 'none';
  }

  getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  }

  formatWeekRange(start: Date, end: Date): string {
    const startDay = start.getDate();
    const endDay = end.getDate();
    const startMonth = start.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const endMonth = end.toLocaleString('en-US', { month: 'short' }).toUpperCase();

    if (startMonth === endMonth) {
      return `${startDay}-${endDay} ${startMonth}`;
    }
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  }

  positionTodayMarker() {
    const today = new Date();
    const dayOfWeek = today.getDay();

    // Convert Sunday (0) to 6, and Monday (1) to 0, etc.
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Calculate percentage based on visible days
    const position = (adjustedDay / 5) * 100;

    this.todayMarker.style.left = `${position}%`;
  }

  handleResize() {
    window.addEventListener('resize', () => {
      this.updateWeekLabels();
      this.positionTodayMarker();
    });
  }
}
