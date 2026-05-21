export const glow = () => {
  // Only run on devices with mouse
  if (!matchMedia('(pointer: fine)').matches) return;

  const glowElements = document.querySelectorAll<HTMLElement>('.u-glow');
  if (!glowElements.length) return;

  let glowVisible = false;

  const updateGlowPosition = (e: MouseEvent) => {
    if (!glowVisible) {
      glowVisible = true;
      gsap.to(
        {},
        {
          duration: 0.5,
          ease: 'power2.out',
          onUpdate: function () {
            document.documentElement.style.setProperty('--glow--opacity', `${this.progress()}`);
          },
        }
      );
    }

    glowElements.forEach((element) => {
      const parent = element.offsetParent as HTMLElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - elementRect.width / 2;
      const y = e.clientY - rect.top - elementRect.height / 2;

      gsap.to(element, {
        x,
        y,
        duration: 1,
        ease: 'power2.out',
      });
    });
  };

  window.addEventListener('mousemove', updateGlowPosition);
};
