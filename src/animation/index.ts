export const animation = async () => {
  // Start all animations in parallel for faster initialization
  await Promise.all([
    import('./smooth-scroll').then((m) => m.smoothScroll()),
    import('./work-list').then((m) => m.workList()),
    import('./glow').then((m) => m.glow()),
  ]);
};
