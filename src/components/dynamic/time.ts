/**
 * Dynamic time component
 * Updates elements with current time based on format string
 * Supports timezones via data-timezone attribute (e.g., "America/New_York", "Europe/London")
 */

interface TimeConfig {
  format: string;
  timezone: string | null;
  updateInterval: number | null;
}

/**
 * Parse format string to determine required update interval
 * @param format - Format string (e.g., "hh:mm:ss A")
 * @returns Update interval in milliseconds, or null if no updates needed
 */
function getUpdateInterval(format: string): number | null {
  if (format.includes('ms')) return 1; // Every millisecond
  if (format.includes('ss')) return 1000; // Every second
  if (format.includes('mm')) return 60000; // Every minute
  if (format.includes('hh') || format.includes('HH')) return 3600000; // Every hour
  return null; // Static date, no updates
}

/**
 * Get date components in specified timezone
 * @param timezone - IANA timezone string (e.g., "America/New_York")
 * @returns Object with date/time components
 */
function getTimeInZone(timezone: string | null): {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  timezoneShort: string;
  timezoneOffset: string;
} {
  const now = new Date();

  if (!timezone) {
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      milliseconds: now.getMilliseconds(),
      timezoneShort:
        new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2] || '',
      timezoneOffset: (() => {
        const offset = -now.getTimezoneOffset();
        const sign = offset >= 0 ? '+' : '-';
        const hours = Math.floor(Math.abs(offset) / 60)
          .toString()
          .padStart(2, '0');
        const minutes = (Math.abs(offset) % 60).toString().padStart(2, '0');
        return `${sign}${hours}:${minutes}`;
      })(),
    };
  }

  // Get formatted parts in the specified timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const getValue = (type: string) => parts.find((p) => p.type === type)?.value || '0';

  // Get timezone abbreviation and offset
  const timezoneName =
    new Date()
      .toLocaleTimeString('en-us', {
        timeZone: timezone,
        timeZoneName: 'short',
      })
      .split(' ')[2] || timezone;

  const timezoneOffset = (() => {
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate.getTime() - utcDate.getTime()) / 60000;
    const sign = offset >= 0 ? '+' : '-';
    const hours = Math.floor(Math.abs(offset) / 60)
      .toString()
      .padStart(2, '0');
    const minutes = (Math.abs(offset) % 60).toString().padStart(2, '0');
    return `${sign}${hours}:${minutes}`;
  })();

  return {
    year: parseInt(getValue('year')),
    month: parseInt(getValue('month')),
    day: parseInt(getValue('day')),
    hours: parseInt(getValue('hour')),
    minutes: parseInt(getValue('minute')),
    seconds: parseInt(getValue('second')),
    milliseconds: now.getMilliseconds(),
    timezoneShort: timezoneName,
    timezoneOffset,
  };
}

/**
 * Format current date/time according to format string
 * @param format - Format string
 * @param timezone - Optional IANA timezone string
 * @returns Formatted time string
 */
function formatTime(format: string, timezone: string | null = null): string {
  const time = getTimeInZone(timezone);

  const tokens: Record<string, () => string> = {
    YYYY: () => time.year.toString(),
    MM: () => time.month.toString().padStart(2, '0'),
    DD: () => time.day.toString().padStart(2, '0'),
    hh: () => time.hours.toString().padStart(2, '0'),
    HH: () => {
      const hours = time.hours % 12 || 12;
      return hours.toString().padStart(2, '0');
    },
    mm: () => time.minutes.toString().padStart(2, '0'),
    ss: () => time.seconds.toString().padStart(2, '0'),
    ms: () => time.milliseconds.toString().padStart(3, '0'),
    A: () => (time.hours >= 12 ? 'PM' : 'AM'),
    ZZ: () => time.timezoneOffset,
    Z: () => time.timezoneShort,
  };

  let result = format;
  // Sort by length (descending) to replace longer tokens first
  const sortedTokens = Object.keys(tokens).sort((a, b) => b.length - a.length);

  for (const token of sortedTokens) {
    result = result.replace(new RegExp(token, 'g'), tokens[token]());
  }

  return result;
}

/**
 * Update element's text content with formatted time
 * @param element - Element to update
 * @param format - Format string
 * @param timezone - Optional timezone
 */
function updateElement(element: HTMLElement, format: string, timezone: string | null): void {
  element.textContent = formatTime(format, timezone);
}

/**
 * Initialize time display for an element
 * @param element - Element with data-dynamic="time", data-format, and optional data-timezone attributes
 */
export function initTime(element: HTMLElement): void {
  const format = element.getAttribute('data-format');
  const timezone = element.getAttribute('data-timezone');

  if (!format) {
    console.warn('Time element missing data-format attribute:', element);
    return;
  }

  const config: TimeConfig = {
    format,
    timezone: timezone || null,
    updateInterval: getUpdateInterval(format),
  };

  // Initial update
  updateElement(element, config.format, config.timezone);

  // Set up periodic updates if needed
  if (config.updateInterval) {
    setInterval(() => {
      updateElement(element, config.format, config.timezone);
    }, config.updateInterval);
  }
}
