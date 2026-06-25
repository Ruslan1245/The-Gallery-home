// assets/slideshow.js

(function() {
  // Grab all videos once this script loads (at end of <body>, so DOM is ready)
  document.querySelectorAll('.video-banner').forEach(video => {
    const id       = video.id.replace('video-', '');
    const fallback = document.getElementById(`fallback-${id}`);

    // Hide the picture fallback once the video paints its first frame
    video.addEventListener('loadeddata', () => {
      if (fallback) fallback.style.display = 'none';
    });

    // Log errors, keep fallback visible
    video.addEventListener('error', () => {
      console.warn(`Video ${video.id} failed to load.`);
    });

    // Try to force‐play if autoplay didn’t trigger
    if (video.autoplay) {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(err => {
          console.warn(`Autoplay prevented on ${video.id}:`, err);
        });
      }
    }
  });
})();
