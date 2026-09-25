// ==========================================
// 🎂 BIRTHDAY APPLICATION CONTROLLER
// Handles stages, animations, mic input, polaroids, and lantern wishes
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.BIRTHDAY_CONFIG || {};

  // State variables
  let currentStage = 1;
  let balloonsPopped = 0;
  let candlesBlown = false;
  let micStream = null;
  let micAudioContext = null;
  let micAnalyser = null;
  let isMicActive = false;

  // DOM Elements
  const stageSections = document.querySelectorAll('.stage-section');
  const stageSteps = document.querySelectorAll('.stage-step');
  const ambientContainer = document.getElementById('ambient-particles');

  // Initialize Config into UI
  function applyConfig() {
    const name = cfg.name || 'Friend';
    const age = cfg.age ? `${cfg.age}th ` : '';
    const nickname = cfg.nickname ? `(${cfg.nickname})` : '';

    // Document title
    document.title = `Happy Birthday ${name}! ✨ A Special Celebration`;

    // Header & Plaque
    document.getElementById('header-logo-text').textContent = `${name}'s Birthday`;
    document.getElementById('door-plaque-text').textContent = `FOR ${name.toUpperCase()}`;
    document.getElementById('door-main-heading').textContent = `Special Surprise for ${name} ${nickname}`;
    if (cfg.doorSubtitle) {
      document.getElementById('door-desc').textContent = cfg.doorSubtitle;
    }

    // Stage 2 Neon
    document.getElementById('neon-birthday-name').textContent = `HAPPY ${age.toUpperCase()}BIRTHDAY, ${name.toUpperCase()}!`;

    // Stage 4 Cake
    if (cfg.age) {
      document.getElementById('cake-heading').textContent = `Happy ${cfg.age}th Birthday, ${name}!`;
    } else {
      document.getElementById('cake-heading').textContent = `Happy Birthday, ${name}!`;
    }

    // Stage 5 Letter
    if (cfg.letter) {
      document.getElementById('letter-salutation').textContent = cfg.letter.salutation || `Dearest ${name},`;
      const letterBody = document.getElementById('letter-body');
      letterBody.innerHTML = '';
      if (Array.isArray(cfg.letter.paragraphs)) {
        cfg.letter.paragraphs.forEach(p => {
          const para = document.createElement('p');
          para.textContent = p;
          letterBody.appendChild(para);
        });
      }
      document.getElementById('letter-closing').textContent = cfg.letter.closing || 'With love,';
      document.getElementById('letter-author').textContent = cfg.letter.author || 'Your Friend';
    }

    // Render Polaroids
    renderPolaroids(cfg.polaroids || []);
  }

  // Generate Ambient Floating Sparkles
  function createAmbientParticles() {
    if (!ambientContainer) return;
    for (let i = 0; i < 28; i++) {
      const mote = document.createElement('div');
      mote.className = 'mote';
      const size = 3 + Math.random() * 5;
      mote.style.width = `${size}px`;
      mote.style.height = `${size}px`;
      mote.style.left = `${Math.random() * 100}vw`;
      mote.style.animationDuration = `${10 + Math.random() * 14}s`;
      mote.style.animationDelay = `${Math.random() * 10}s`;
      ambientContainer.appendChild(mote);
    }
  }

  // Stage Switcher
  function goToStage(stageNum) {
    if (stageNum < 1 || stageNum > 5) return;
    currentStage = stageNum;

    stageSections.forEach(sec => sec.classList.remove('active'));
    const targetSection = document.getElementById(`stage-${stageNum}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    stageSteps.forEach(step => {
      const stepNum = parseInt(step.dataset.stage);
      step.classList.remove('active');
      if (stepNum === stageNum) {
        step.classList.add('active');
      } else if (stepNum < stageNum) {
        step.classList.add('completed');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Header Nav Click Handlers
  stageSteps.forEach(step => {
    step.addEventListener('click', () => {
      const s = parseInt(step.dataset.stage);
      goToStage(s);
    });
  });

  // ================= STAGE 1: DOOR =================
  const doorLeaf = document.getElementById('door-leaf');
  const btnKnock = document.getElementById('btn-knock');
  let doorOpened = false;

  function openDoor() {
    if (doorOpened) return;
    doorOpened = true;

    if (window.birthdayAudio) {
      window.birthdayAudio.playKnock();
    }

    doorLeaf.classList.add('shake');

    setTimeout(() => {
      doorLeaf.classList.remove('shake');
      doorLeaf.classList.add('open');

      if (window.birthdayConfetti) {
        window.birthdayConfetti.burst(window.innerWidth / 2, window.innerHeight / 2, 40);
      }

      // Auto start melody if configured
      if (cfg.audio && cfg.audio.autoPlayMelody && window.birthdayAudio) {
        setTimeout(() => {
          window.birthdayAudio.startBackgroundMusic();
          updateMusicButtonState(true);
        }, 800);
      }

      // Transition to Stage 2
      setTimeout(() => {
        goToStage(2);
      }, 1400);
    }, 450);
  }

  if (btnKnock) btnKnock.addEventListener('click', openDoor);
  if (doorLeaf) doorLeaf.addEventListener('click', openDoor);

  // ================= STAGE 2: LIGHTS =================
  const switchCord = document.getElementById('switch-cord');
  const lightScene = document.getElementById('light-scene');
  const btnToStage3 = document.getElementById('btn-to-stage-3');
  let lightsTurnedOn = false;

  function turnOnLights() {
    if (lightsTurnedOn) return;
    lightsTurnedOn = true;

    // Switch cord bounce
    switchCord.style.transform = 'translateY(22px)';
    setTimeout(() => {
      switchCord.style.transform = 'translateY(0px)';
    }, 200);

    if (window.birthdayAudio) {
      window.birthdayAudio.playSwitch();
    }

    setTimeout(() => {
      lightScene.classList.add('lights-on');

      if (window.birthdayAudio) {
        window.birthdayAudio.playFanfare();
      }

      if (window.birthdayConfetti) {
        window.birthdayConfetti.burst(window.innerWidth / 2, window.innerHeight * 0.4, 50);
      }

      btnToStage3.style.display = 'inline-flex';
    }, 250);
  }

  if (switchCord) switchCord.addEventListener('click', turnOnLights);
  if (btnToStage3) btnToStage3.addEventListener('click', () => {
    goToStage(3);
    initBalloons();
  });

  // ================= STAGE 3: BALLOONS =================
  const balloonsArena = document.getElementById('balloons-arena');
  const balloonProgressText = document.getElementById('balloon-progress-text');
  const btnToStage4 = document.getElementById('btn-to-stage-4');
  let balloonsInitialized = false;

  const balloonColors = [
    '#ff758c', // Sunset Rose
    '#fda085', // Warm Peach
    '#ffd369', // Champagne Gold
    '#e056fd', // Lavender
    '#ff9ff3'  // Pastel Pink
  ];

  function initBalloons() {
    if (balloonsInitialized) return;
    balloonsInitialized = true;
    balloonsArena.innerHTML = '';
    balloonsPopped = 0;

    const wishes = cfg.balloonWishes || [
      { title: "Joy", text: "May your year be filled with laughter and delight! ✨" },
      { title: "Adventure", text: "Exciting journeys ahead! 🚀" },
      { title: "Dreams", text: "May all your wishes come true! 🌟" },
      { title: "Love", text: "Always surrounded by warmth & happiness! 💖" },
      { title: "Magic", text: "Stay fabulous and bright! 🥂" }
    ];

    wishes.forEach((item, index) => {
      const wrap = document.createElement('div');
      wrap.className = 'balloon-wrap';

      const color = balloonColors[index % balloonColors.length];

      wrap.innerHTML = `
        <div class="balloon" style="background: ${color};">
          <div class="balloon-highlight"></div>
          <span class="balloon-label">Pop!</span>
        </div>
        <div class="balloon-knot" style="background: ${color};"></div>
        <div class="balloon-string"></div>
      `;

      wrap.addEventListener('click', (e) => {
        if (wrap.dataset.popped) return;
        wrap.dataset.popped = 'true';

        // Sound & Confetti
        if (window.birthdayAudio) window.birthdayAudio.playPop();
        if (window.birthdayConfetti) {
          const rect = wrap.getBoundingClientRect();
          window.birthdayConfetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
        }

        // Replace balloon with wish card
        wrap.innerHTML = `
          <div class="wish-card">
            <div class="wish-card-title">${item.title}</div>
            <div class="wish-card-text">${item.text}</div>
          </div>
        `;

        balloonsPopped++;
        balloonProgressText.textContent = `Wishes Unlocked: ${balloonsPopped} / ${wishes.length}`;

        if (balloonsPopped === wishes.length) {
          balloonProgressText.textContent = `🎉 All ${wishes.length} wishes revealed! The cake is waiting!`;
          if (window.birthdayAudio) window.birthdayAudio.playFanfare();
          if (window.birthdayConfetti) window.birthdayConfetti.cannon();
          btnToStage4.style.display = 'inline-flex';
        }
      });

      balloonsArena.appendChild(wrap);
    });
  }

  if (btnToStage4) btnToStage4.addEventListener('click', () => goToStage(4));

  // ================= STAGE 4: CAKE & CANDLES =================
  const btnBlowCandles = document.getElementById('btn-blow-candles');
  const btnMicBlow = document.getElementById('btn-mic-blow');
  const micMeterBox = document.getElementById('mic-meter-box');
  const micLevelBar = document.getElementById('mic-level');
  const btnToStage5 = document.getElementById('btn-to-stage-5');
  const candles = document.querySelectorAll('.candle');

  function extinguishCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    if (window.birthdayAudio) {
      window.birthdayAudio.playBlow();
    }

    candles.forEach((candle, idx) => {
      setTimeout(() => {
        candle.classList.add('extinguished');
      }, idx * 120);
    });

    setTimeout(() => {
      if (window.birthdayAudio) window.birthdayAudio.playFanfare();
      if (window.birthdayConfetti) window.birthdayConfetti.cannon();

      document.getElementById('cake-subtext').textContent = '✨ Wish made! Now let\'s unwrap your special present!';
      btnBlowCandles.style.display = 'none';
      if (btnMicBlow) btnMicBlow.style.display = 'none';
      if (micMeterBox) micMeterBox.style.display = 'none';
      btnToStage5.style.display = 'inline-flex';

      // Stop mic if running
      stopMic();
    }, 450);
  }

  // Click on cake candles or button
  if (btnBlowCandles) btnBlowCandles.addEventListener('click', extinguishCandles);
  candles.forEach(c => c.addEventListener('click', extinguishCandles));

  // Microphone Blowing Detection
  if (btnMicBlow) {
    btnMicBlow.addEventListener('click', async () => {
      if (isMicActive) {
        stopMic();
        return;
      }

      try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        micAudioContext = new AudioContextClass();
        const source = micAudioContext.createMediaStreamSource(micStream);
        micAnalyser = micAudioContext.createAnalyser();
        micAnalyser.fftSize = 256;
        source.connect(micAnalyser);

        isMicActive = true;
        micMeterBox.style.display = 'flex';
        btnMicBlow.textContent = '🛑 Stop Microphone';
        listenToMicBlow();
      } catch (err) {
        alert('Could not access microphone. You can simply click the "Blow Out Candles!" button instead!');
      }
    });
  }

  function listenToMicBlow() {
    if (!isMicActive || candlesBlown) return;

    const dataArray = new Uint8Array(micAnalyser.frequencyBinCount);
    micAnalyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length;
    const percentage = Math.min(100, Math.round((average / 110) * 100));

    if (micLevelBar) {
      micLevelBar.style.width = `${percentage}%`;
    }

    // If blowing volume threshold exceeded
    if (average > 48) {
      extinguishCandles();
      return;
    }

    requestAnimationFrame(listenToMicBlow);
  }

  function stopMic() {
    isMicActive = false;
    if (micStream) {
      micStream.getTracks().forEach(track => track.stop());
      micStream = null;
    }
    if (micAudioContext) {
      micAudioContext.close();
      micAudioContext = null;
    }
    if (btnMicBlow) btnMicBlow.textContent = '🎙️ Use Microphone';
    if (micMeterBox) micMeterBox.style.display = 'none';
  }

  if (btnToStage5) btnToStage5.addEventListener('click', () => goToStage(5));

  // ================= STAGE 5: GIFT, LETTER, POLAROIDS, LANTERN =================
  const giftBox = document.getElementById('gift-box');
  const birthdayLetter = document.getElementById('birthday-letter');
  const memoriesSection = document.getElementById('memories-section');
  const lanternSection = document.getElementById('lantern-section');
  const partyToolbar = document.getElementById('party-toolbar');
  let giftOpened = false;

  function openGift() {
    if (giftOpened) return;
    giftOpened = true;

    if (window.birthdayAudio) window.birthdayAudio.playGiftOpen();
    if (window.birthdayConfetti) window.birthdayConfetti.cannon();

    giftBox.classList.add('opened');

    setTimeout(() => {
      giftBox.style.display = 'none';
      birthdayLetter.style.display = 'block';
      memoriesSection.style.display = 'flex';
      lanternSection.style.display = 'flex';
      partyToolbar.style.display = 'flex';
      loadSavedWishes();
    }, 600);
  }

  if (giftBox) giftBox.addEventListener('click', openGift);

  // Render Polaroids
  function renderPolaroids(polaroids) {
    const grid = document.getElementById('polaroid-grid');
    if (!grid) return;
    grid.innerHTML = '';

    polaroids.forEach(item => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      card.innerHTML = `
        <img class="polaroid-img" src="${item.image}" alt="${item.caption}" loading="lazy">
        <div class="polaroid-caption">${item.caption}</div>
      `;
      grid.appendChild(card);
    });
  }

  // Photo Upload Handler (Allows user to add their own photo instantly)
  const photoUploadInput = document.getElementById('photo-upload-input');
  if (photoUploadInput) {
    photoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const grid = document.getElementById('polaroid-grid');
        const card = document.createElement('div');
        card.className = 'polaroid-card';
        card.innerHTML = `
          <img class="polaroid-img" src="${event.target.result}" alt="New Memory">
          <div class="polaroid-caption">Cherished Memory ❤️</div>
        `;
        grid.prepend(card);
        showToast('Photo added to memories gallery!');
        if (window.birthdayConfetti) window.birthdayConfetti.burst();
      };
      reader.readAsDataURL(file);
    });
  }

  // Sky Lantern Wish System
  const skyWishInput = document.getElementById('sky-wish-input');
  const btnReleaseLantern = document.getElementById('btn-release-lantern');
  const savedWishesList = document.getElementById('saved-wishes-list');

  function releaseSkyLantern() {
    const text = skyWishInput.value.trim();
    if (!text) {
      alert('Please enter your wish before sending it to the stars!');
      return;
    }

    // Create floating lantern element
    const lantern = document.createElement('div');
    lantern.className = 'floating-lantern';
    lantern.innerHTML = `<span>🏮</span><br><span>${text}</span>`;
    document.body.appendChild(lantern);

    if (window.birthdayAudio) window.birthdayAudio.playBell(null, 1046.5, 0.8, 0.4);

    // Save to localStorage
    saveWishToStorage(text);
    skyWishInput.value = '';

    // Remove DOM element after animation
    setTimeout(() => {
      lantern.remove();
    }, 7200);

    showToast('Your wish is floating into the starry sky! ✨');
  }

  function saveWishToStorage(wishText) {
    try {
      const existing = JSON.parse(localStorage.getItem('birthday_wishes') || '[]');
      existing.push({ text: wishText, date: new Date().toLocaleDateString() });
      localStorage.setItem('birthday_wishes', JSON.stringify(existing));
      loadSavedWishes();
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function loadSavedWishes() {
    if (!savedWishesList) return;
    try {
      const existing = JSON.parse(localStorage.getItem('birthday_wishes') || '[]');
      if (existing.length === 0) {
        savedWishesList.innerHTML = '';
        return;
      }
      savedWishesList.innerHTML = `<strong>Wishes Sent to the Stars:</strong><br>` +
        existing.map(w => `✨ "${w.text}" (${w.date})`).join('<br>');
    } catch (e) {}
  }

  if (btnReleaseLantern) btnReleaseLantern.addEventListener('click', releaseSkyLantern);
  if (skyWishInput) {
    skyWishInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') releaseSkyLantern();
    });
  }

  // Party Action Toolbar buttons
  const btnBlastConfetti = document.getElementById('btn-blast-confetti');
  const btnReplay = document.getElementById('btn-replay');
  const btnShare = document.getElementById('btn-share');

  if (btnBlastConfetti) {
    btnBlastConfetti.addEventListener('click', () => {
      if (window.birthdayConfetti) window.birthdayConfetti.cannon();
      if (window.birthdayAudio) window.birthdayAudio.playFanfare();
    });
  }

  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      goToStage(1);
    });
  }

  if (btnShare) {
    btnShare.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Birthday link copied to clipboard! Share it with the birthday star! 🌟');
        });
      } else {
        showToast('Link: ' + window.location.href);
      }
    });
  }

  // Toast Helper
  const toastMsg = document.getElementById('toast-msg');
  let toastTimer = null;
  function showToast(text) {
    if (!toastMsg) return;
    toastMsg.textContent = text;
    toastMsg.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 3200);
  }

  // ================= AUDIO HEADER CONTROLS =================
  const btnToggleSound = document.getElementById('btn-toggle-sound');
  const soundIcon = document.getElementById('sound-icon');
  const btnToggleMusic = document.getElementById('btn-toggle-music');
  const musicIcon = document.getElementById('music-icon');

  if (btnToggleSound) {
    btnToggleSound.addEventListener('click', () => {
      if (window.birthdayAudio) {
        const isMuted = window.birthdayAudio.toggleMute();
        soundIcon.textContent = isMuted ? '🔇' : '🔊';
        showToast(isMuted ? 'Sound muted' : 'Sound unmuted');
      }
    });
  }

  function updateMusicButtonState(isPlaying) {
    if (musicIcon) {
      musicIcon.textContent = isPlaying ? '🎶' : '🎵';
      musicIcon.style.color = isPlaying ? '#ffd369' : '';
    }
  }

  if (btnToggleMusic) {
    btnToggleMusic.addEventListener('click', () => {
      if (!window.birthdayAudio) return;
      if (window.birthdayAudio.isMusicPlaying) {
        window.birthdayAudio.stopBackgroundMusic();
        updateMusicButtonState(false);
        showToast('Melody paused');
      } else {
        window.birthdayAudio.startBackgroundMusic();
        updateMusicButtonState(true);
        showToast('Melody playing 🎶');
      }
    });
  }

  // Run initialization
  applyConfig();
  createAmbientParticles();
});
