export const videos = () => {
  const lazyVideos = document.querySelectorAll<HTMLVideoElement>('video:has(source[data-src])');

  if (!lazyVideos.length || !('IntersectionObserver' in window)) return;

  const viewportHeight = window.innerHeight;
  const rootMargin = `${viewportHeight * 0.2}px`;

  const lazyVideoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          const sources = video.querySelectorAll<HTMLSourceElement>('source[data-src]');

          sources.forEach((source) => {
            if (source.dataset.src) {
              source.src = source.dataset.src;
            }
          });

          video.load();
          lazyVideoObserver.unobserve(video);
        }
      });
    },
    {
      rootMargin,
    }
  );

  lazyVideos.forEach((video) => lazyVideoObserver.observe(video));
};
