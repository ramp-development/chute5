export const links = () => {
  console.log('links');

  const workItems = document.querySelectorAll<HTMLDivElement>('[data-work-item]');
  workItems.forEach((item) => {
    item.id = item.dataset.workItem || '';
  });

  const workLinks = document.querySelectorAll<HTMLDivElement>('[data-link-work]');
  workLinks.forEach((item) => {
    const link = item.querySelector<HTMLAnchorElement>('a');
    if (!link) return;
    link.href = `#${item.dataset.linkWork}`;
  });
};
