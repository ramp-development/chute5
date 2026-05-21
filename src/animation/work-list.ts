export const workList = () => {
  // Only run on devices with mouse
  if (
    !matchMedia('(pointer: fine)').matches ||
    matchMedia('prefers-reduced-motion: reduce').matches
  )
    return;

  const listElement = document.querySelector<HTMLDivElement>('.work-list_list');
  if (!listElement) return;

  const thumbnails = listElement.querySelectorAll<HTMLDivElement>('.work-list_thumbnail_item');
  if (!thumbnails.length) return;

  const position = { x: 0, y: 0 };

  const updateThumbnailPosition = (e: MouseEvent) => {
    const rect = listElement.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;

    // Map 0-1 range to -1 to 1 range (left/top = -1, right/bottom = 1)
    const normalizedX = (relativeX - 0.5) * 2;
    const normalizedY = (relativeY - 0.5) * 2;

    gsap.to(position, {
      x: normalizedX * 5,
      y: normalizedY * 2.5,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => {
        thumbnails.forEach((thumbnail) => {
          (thumbnail as HTMLElement).style.transform = `translate(${position.x}%, ${position.y}%)`;
        });
      },
    });
  };

  listElement.addEventListener('mousemove', updateThumbnailPosition);
};
