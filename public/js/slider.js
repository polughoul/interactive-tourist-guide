// Slider class handles the image gallery slider functionality.
class Slider {
  constructor(sliderTrackSelector, prevBtnSelector, nextBtnSelector) {
    this.sliderTrack = document.querySelector(sliderTrackSelector);
    this.prevBtn = document.querySelector(prevBtnSelector);
    this.nextBtn = document.querySelector(nextBtnSelector);
    this.currentIndex = 0;
    this.slides = [];
    this.init();
  }
  
   // Initializes slider by selecting images and setting up event listeners.
  init() {
    if (!this.sliderTrack) return;
    this.slides = Array.from(this.sliderTrack.querySelectorAll('img'));
    this.updateSlider();
    if (this.prevBtn && this.nextBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());
    }
    window.addEventListener('resize', () => this.updateSlider());
  }
  
  // Updates the slider position based on the current index.
  updateSlider() {
    const slideWidth = this.sliderTrack.clientWidth;
    this.sliderTrack.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
  }
  
  // Navigate to the previous slide.
  prev() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slides.length - 1;
    this.updateSlider();
  }
  
  // Navigate to the next slide.
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlider();
  }
}

export default Slider;