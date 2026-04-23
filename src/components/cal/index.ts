export const cal = () => {
  const triggers = document.querySelectorAll('[data-action="cal"]');
  triggers.forEach((trigger) => {
    trigger.setAttribute('data-cal-link', 'gregfaulkner/chute5');
    trigger.setAttribute('data-cal-namespace', 'chute5');
    trigger.setAttribute(
      'data-cal-config',
      '{&quot;layout&quot;:&quot;month_view&quot;,&quot;useSlotsViewOnSmallScreen&quot;:&quot;true&quot;}'
    );
  });
};
