export const utils = async () => {
  const { links } = await import('./links');
  links();
};
