export const glow = () => {
  // Only run on devices with mouse
  if (!matchMedia('(pointer: fine)').matches) return;

  const glowPosition = { x: 0, y: 0 };
  let glowVisible = false;

  const updateGlowPosition = (e: MouseEvent) => {
    if (!glowVisible) {
      glowVisible = true;
      gsap.to(
        {},
        {
          duration: 0.5,
          onUpdate: function () {
            document.documentElement.style.setProperty('--glow--opacity', `${this.progress()}`);
          },
        }
      );
    }

    gsap.to(glowPosition, {
      x: e.clientX,
      y: e.clientY,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => {
        document.documentElement.style.setProperty('--glow--x', `${glowPosition.x}px`);
        document.documentElement.style.setProperty('--glow--y', `${glowPosition.y}px`);
      },
    });
  };

  window.addEventListener('mousemove', updateGlowPosition);
};
