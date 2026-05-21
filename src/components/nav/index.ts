export const nav = (): void => {
  const component = document.querySelector<HTMLDivElement>('[data-component="nav"]');
  const hero = document.querySelector<HTMLDivElement>('[data-section="hero"]');
  if (!component || !hero) return;

  let scrollDistance = 0;
  let lastScrollY = 0;
  const bufferThreshold = window.innerHeight * 0.2; // 20vh

  // Main ScrollTrigger for hero exit/enter
  gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'bottom top',
      end: 'bottom top',
      onEnter: () => {
        // Hero bottom exits viewport top - going down
        gsap.set(component, { position: 'fixed', yPercent: -100 });
      },
      onLeaveBack: () => {
        // Hero bottom enters viewport top - going up
        gsap.to(component, {
          yPercent: -100,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(component, { position: 'absolute', yPercent: 0 });
          },
        });
      },
    },
  });

  // Direction-based show/hide after hero
  ScrollTrigger.create({
    trigger: hero,
    start: 'bottom top',
    end: 'max',
    onUpdate: (self) => {
      const currentScrollY = self.scroll();
      const { direction } = self;

      if (self.progress > 0) {
        if (direction === 1) {
          // Scrolling down - accumulate distance
          scrollDistance += Math.abs(currentScrollY - lastScrollY);

          if (scrollDistance >= bufferThreshold) {
            gsap.to(component, { yPercent: -100, duration: 0.5, ease: 'power2.out' });
            scrollDistance = 0;
          }
        } else if (direction === -1) {
          // Scrolling up - show immediately
          gsap.to(component, { yPercent: 0, duration: 0.5, ease: 'power2.out' });
          scrollDistance = 0;
        }
      }

      lastScrollY = currentScrollY;
    },
  });
};
