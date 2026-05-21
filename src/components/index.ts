export const components = async () => {
  // Load all components in parallel for faster initialization
  await Promise.all([
    import('./nav').then((m) => m.nav()),
    import('./dynamic').then((m) => m.dynamic()),
    import('./timeline').then((m) => m.timeline()),
    import('./videos').then((m) => m.videos()),
    import('./shaders').then((m) => m.shaders()),
  ]);
};
