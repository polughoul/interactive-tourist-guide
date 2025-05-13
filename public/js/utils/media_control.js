document.addEventListener('DOMContentLoaded', () => {
    // Get the audio element by its id
    const audioPlayer = document.getElementById('route-audio');
    if (!audioPlayer) return;
    
    // Remove default controls 
    audioPlayer.removeAttribute('controls');

    // container for custom audio control
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'custom-audio-controls';

    // Play Button
    const playBtn = document.createElement('button');
    playBtn.className = 'btn-play';
    playBtn.textContent = 'Play';
    playBtn.addEventListener('click', () => {
      audioPlayer.play();
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'inline-block';
    });
    controlsContainer.appendChild(playBtn);

    // Pause Button
    const pauseBtn = document.createElement('button');
    pauseBtn.className = 'btn-pause';
    pauseBtn.textContent = 'Pause';
    pauseBtn.style.display = 'none';
    pauseBtn.addEventListener('click', () => {
      audioPlayer.pause();
      pauseBtn.style.display = 'none';
      playBtn.style.display = 'inline-block';
    });
    controlsContainer.appendChild(pauseBtn);

    // Volume Slider
    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = 0;
    volumeSlider.max = 1;
    volumeSlider.step = 0.05;
    volumeSlider.value = audioPlayer.volume;
    volumeSlider.className = 'volume-slider';
    volumeSlider.addEventListener('input', () => {
      audioPlayer.volume = volumeSlider.value;
    });
    controlsContainer.appendChild(volumeSlider);

    // Progress Bar for playback and attach an event to allow seeking
    const progressBar = document.createElement('input');
    progressBar.type = 'range';
    progressBar.min = 0;
    progressBar.max = 100;
    progressBar.value = 0;
    progressBar.className = 'progress-bar';
    progressBar.addEventListener('input', () => {
      const seekTime = audioPlayer.duration * (progressBar.value / 100);
      audioPlayer.currentTime = seekTime;
    });
    controlsContainer.appendChild(progressBar);

    // dropdown for selecting playback speed
    const speedSelect = document.createElement('select');
    speedSelect.className = 'speed-select';
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    speeds.forEach(speed => {
      const option = document.createElement('option');
      option.value = speed;
      option.textContent = `${speed}x`;
      if (speed === 1) option.selected = true;
      speedSelect.appendChild(option);
    });
    speedSelect.addEventListener('change', () => {
      audioPlayer.playbackRate = parseFloat(speedSelect.value);
    });
    controlsContainer.appendChild(speedSelect);

    // Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'btn-download';
    downloadBtn.textContent = 'Download Audio';
    downloadBtn.addEventListener('click', () => {
      const source = audioPlayer.querySelector('source').src;
      const a = document.createElement('a');
      a.href = source;
      a.download = source.substring(source.lastIndexOf('/') + 1);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
    controlsContainer.appendChild(downloadBtn);

    //  Update the progress bar
    audioPlayer.addEventListener('timeupdate', () => {
      if (audioPlayer.duration) {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      }
    });
    audioPlayer.parentNode.insertBefore(controlsContainer, audioPlayer.nextSibling);
});