// ==========================================
// 🎵 WEB AUDIO API SOUND SYNTHESIZER
// Zero external files, 100% reliable in all modern browsers!
// ==========================================

class BirthdayAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.musicGain = null;
    this.isMusicPlaying = false;
    this.melodyTimer = null;
    this.melodyStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.7, this.ctx.currentTime, 0.05);
    }
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // Knock on wooden door effect
  playKnock() {
    this.init();
    if (this.isMuted) return;

    const knockTimes = [0, 0.18];
    knockTimes.forEach((delay) => {
      const t = this.ctx.currentTime + delay;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(30, t + 0.08);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, t);

      gain.gain.setValueAtTime(0.8, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.1);
    });
  }

  // Snappy light switch click
  playSwitch() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.04);

    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  // Balloon pop sound with festive chime
  playPop() {
    this.init();
    if (this.isMuted) return;

    const t = this.ctx.currentTime;

    // Pop burst (noise-like pitch drop)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(350, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.06);

    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.08);

    // Sparkling bell after pop
    this.playBell(t + 0.04, 880 + Math.random() * 400, 0.35, 0.2);
  }

  // Helper for sparkling bell
  playBell(startTime, freq, duration = 0.5, volume = 0.25) {
    if (!this.ctx || this.isMuted) return;
    const t = startTime || this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + duration + 0.01);
  }

  // Candle blowing out wind sound
  playBlow() {
    this.init();
    if (this.isMuted) return;

    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.6, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.45);
  }

  // Celebratory fanfare arpeggio
  playFanfare() {
    this.init();
    if (this.isMuted) return;

    const notes = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.14 }, // G5
      { f: 1046.50, d: 0.35 } // C6
    ];

    let t = this.ctx.currentTime;
    notes.forEach((n) => {
      this.playBell(t, n.f, n.d + 0.25, 0.4);
      t += n.d;
    });
  }

  // Magical chime glissando for gift opening
  playGiftOpen() {
    this.init();
    if (this.isMuted) return;

    const chords = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98];
    chords.forEach((freq, idx) => {
      this.playBell(this.ctx.currentTime + idx * 0.07, freq, 0.6, 0.3);
    });
  }

  // Background Music: Warm Music Box "Happy Birthday to You"
  startBackgroundMusic() {
    this.init();
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    // Happy birthday melody notes [frequency, beatDuration]
    // C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25
    const melody = [
      // Hap-py birth-day to you
      [261.63, 0.75], [261.63, 0.25], [293.66, 1.0], [261.63, 1.0], [349.23, 1.0], [329.63, 2.0],
      // Hap-py birth-day to you
      [261.63, 0.75], [261.63, 0.25], [293.66, 1.0], [261.63, 1.0], [392.00, 1.0], [349.23, 2.0],
      // Hap-py birth-day dear Sarah
      [261.63, 0.75], [261.63, 0.25], [523.25, 1.0], [440.00, 1.0], [349.23, 1.0], [329.63, 1.0], [293.66, 1.5],
      // Hap-py birth-day to you
      [466.16, 0.75], [466.16, 0.25], [440.00, 1.0], [349.23, 1.0], [392.00, 1.0], [349.23, 2.5]
    ];

    const tempo = 380; // milliseconds per beat
    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isMusicPlaying) return;

      const [freq, beats] = melody[noteIndex];
      const durationSec = (beats * tempo) / 1000;

      // Play soft celesta/music-box tone
      this.playMusicBoxTone(freq, durationSec * 0.95);

      noteIndex = (noteIndex + 1) % melody.length;
      const pauseBetweenLoops = (noteIndex === 0) ? 2200 : 0;
      this.melodyTimer = setTimeout(playNextNote, durationSec * 1000 + pauseBetweenLoops);
    };

    playNextNote();
  }

  stopBackgroundMusic() {
    this.isMusicPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }

  playMusicBoxTone(freq, duration) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Soft sine + subtle second harmonic for music box chime
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    // Warm envelope
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.18, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(t);
    osc.stop(t + duration + 0.05);

    // Subtle gentle overtone
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, t);
    gain2.gain.setValueAtTime(0.05, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.5);
    osc2.connect(gain2);
    gain2.connect(this.musicGain);
    osc2.start(t);
    osc2.stop(t + duration * 0.5 + 0.05);
  }
}

// Global instance
window.birthdayAudio = new BirthdayAudioEngine();
