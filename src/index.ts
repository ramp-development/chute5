window.Webflow ||= [];
window.Webflow.push(async () => {
  // Load all modules in parallel for optimal performance
  const [{ components }, { animation }, { utils }] = await Promise.all([
    import('./components'),
    import('./animation'),
    import('./utils'),
  ]);

  // Initialize all features in parallel
  await Promise.all([components(), animation(), utils()]);
});
