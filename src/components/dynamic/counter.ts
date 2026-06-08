/**
 * Counter group manager
 * Handles all counter elements within a group
 */
class CounterGroup {
  groupName: string;
  elements: HTMLElement[];

  constructor(groupName: string) {
    this.groupName = groupName;
    this.elements = Array.from(
      document.querySelectorAll<HTMLElement>(`[data-counter="${groupName}"]`)
    );
  }

  init(): void {
    const total = this.elements.length;

    this.elements.forEach((element, index) => {
      const current = index + 1;
      const currentElement = element.querySelector('[data-counter="current"]') as HTMLElement;
      const totalElement = element.querySelector('[data-counter="total"]') as HTMLElement;

      if (!currentElement || !totalElement) {
        console.warn('Counter element missing current or total elements:', element);
        return;
      }

      currentElement.textContent = current.toString().padStart(2, '0');
      totalElement.textContent = total.toString().padStart(2, '0');
    });
  }
}

// Track initialized groups to avoid duplicate processing
const initializedGroups = new Set<string>();

/**
 * Initialize counter display for an element
 * @param element - Element with data-counter="{groupName}" and child elements with data-counter="current" and data-counter="total"
 */
export function initCounter(element: HTMLElement): void {
  const groupName = element.getAttribute('data-counter');

  if (!groupName) {
    console.warn('Counter element missing data-counter group name:', element);
    return;
  }

  // Only initialize each group once
  if (initializedGroups.has(groupName)) {
    return;
  }

  initializedGroups.add(groupName);

  const group = new CounterGroup(groupName);
  group.init();
}
