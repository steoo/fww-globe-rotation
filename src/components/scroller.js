export default function scrollerEnabler(controls) {
  // Assuming `controls` is your instance of OrbitControls
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  // Function to enable/disable OrbitControls
  function setOrbitControlsEnabled(enabled) {
    controls.enabled = enabled;
    enabled
      ? document.querySelector('#globeSection').style.zIndex = 0
      : document.querySelector('#globeSection').style.zIndex = -1;
  }

  // Listen for touchstart event to capture the start position
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    setOrbitControlsEnabled(true);
  }, false);

  // Listen for touchmove event to determine the direction
  document.addEventListener('touchmove', (e) => {
    touchEndY = e.touches[0].clientY;

    // Calculate the difference in touch start and end Y positions
    const deltaY = touchEndY - touchStartY;

    // A threshold to determine a "vertical swipe" can be adjusted as needed
    const verticalSwipeThreshold = 10;

    // Check if the vertical movement is significant enough to be considered a swipe
    if (Math.abs(deltaY) > verticalSwipeThreshold) {
      // Disable orbit controls for vertical swipe
      setOrbitControlsEnabled(false);
    } else {
      // Enable orbit controls for horizontal movement or minor vertical movements
      setOrbitControlsEnabled(true);
    }
  }, false);

  // Optionally, re-enable controls when the touch ends
  document.addEventListener('touchend', (e) => {
    // setOrbitControlsEnabled(false);
  }, false);
}
