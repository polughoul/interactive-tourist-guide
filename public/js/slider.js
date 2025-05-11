// Slider class using requestAnimationFrame for smooth animation.
class Slider {
  constructor(sliderTrackSelector, prevBtnSelector, nextBtnSelector, duration = 400) {
    this.sliderTrack = document.querySelector(sliderTrackSelector);
    this.prevBtn = document.querySelector(prevBtnSelector);
    this.nextBtn = document.querySelector(nextBtnSelector);
    this.duration = duration; // Duration of transition in ms.
    this.currentIndex = 0;
    this.slides = [];
    this.isAnimating = false; // Prevents overlapping animations.
    this.init();
  }
  
  // Initializes slider by selecting images and setting up event listeners.
  init() {
    if (!this.sliderTrack) return;
    this.slides = Array.from(this.sliderTrack.querySelectorAll('img'));
    // Set initial position.
    this.updateSlider(0);
    if (this.prevBtn && this.nextBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());
    }
    window.addEventListener('resize', () => this.updateSlider(0)); // Reset slider on resize.
  }
  
  // Returns current slide width.
  get slideWidth() {
    return this.sliderTrack.clientWidth;
  }
  
  // Updated updateSlider method: calculates the target offset using a negative value for left translation,
  // determines the current position by extracting the numeric value from the transform property,
  // calculates the travel distance and adjusts the animation duration proportionally.
  // If the distance is greater than 1 pixel, it triggers the smooth animation via animateSlider.
  updateSlider(animateDuration = this.duration) {
    const targetPosition = -(this.currentIndex * this.slideWidth);
    const currentTransform = this.sliderTrack.style.transform;
    const currentPosition = currentTransform
      ? parseFloat(currentTransform.match(/-?\d+(\.\d+)?/)[0])
      : 0;
    const distance = Math.abs(currentPosition - targetPosition);
    const adjustedDuration = animateDuration * (distance / this.slideWidth);
    if (distance > 1) {
      this.isAnimating = true;
      this.animateSlider(currentPosition, targetPosition, adjustedDuration);
    } else {
      this.sliderTrack.style.transform = `translateX(${targetPosition}px)`;
    }
  }

  // Updated animateSlider method: performs smooth animation using requestAnimationFrame.
  // The easeInOutCubic function is used to interpolate the transition for smoother acceleration and deceleration.
  // The function calculates the new position of the sliderTrack at each frame until the desired position is reached.
  animateSlider(start, end, duration) {
    const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const startTime = performance.now();
    const animate = currentTime => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      const progress = easeInOutCubic(t);
      const newPosition = start + (end - start) * progress;
      this.sliderTrack.style.transform = `translateX(${newPosition}px)`;
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isAnimating = false;
      }
    };
    requestAnimationFrame(animate);
  }
  
  // Navigate to the previous slide.
  prev() {
    if (this.isAnimating) return;
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slides.length - 1;
    this.updateSlider();
  }
  
  // Navigate to the next slide.
  next() {
    if (this.isAnimating) return;
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlider();
  }
}

export default Slider;