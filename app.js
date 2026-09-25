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
    const headerTitle = cfg.shortName ? `${cfg.shortName}'s Birthday` : `${name}'s Birthday`;
    document.getElementById('header-logo-text').textContent = headerTitle;
    document.getElementById('door-plaque-text').textContent = `FOR ${name.toUpperCase()}`;
    document.getElementById('door-main-heading').textContent = `Special Celebration for ${name}`;
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
    if (cfg.cakeTitle) {
      document.getElementById('cake-subtext').textContent = cfg.cakeTitle;
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

    // Special Photo inside the Letter
    const photoWrap = document.getElementById('letter-photo-wrap');
    const photoImg = document.getElementById('letter-photo-img');
    if (cfg.photoUrl && photoWrap && photoImg) {
      photoImg.src = cfg.photoUrl;
      photoImg.onload = () => {
        photoWrap.style.display = 'flex';
      };
      photoImg.onerror = () => {
        photoWrap.style.display = 'none';
      };
    }
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
  const guideStage1 = document.getElementById('guide-stage-1');
  let doorOpened = false;

  function openDoor() {
    if (doorOpened) return;
    doorOpened = true;

    if (navigator.vibrate) {
      try { navigator.vibrate(40); } catch (e) {}
    }

    if (guideStage1) {
      guideStage1.classList.add('fade-out');
    }

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

  // ================= STAGE 2: LIGHTS (WALL SOCKET SWITCH) =================
  const wallSwitch = document.getElementById('wall-switch');
  const lightScene = document.getElementById('light-scene');
  const btnToStage3 = document.getElementById('btn-to-stage-3');
  const guideStage2 = document.getElementById('guide-stage-2');
  let lightsTurnedOn = false;

  function turnOnLights() {
    if (lightsTurnedOn) return;
    lightsTurnedOn = true;

    if (wallSwitch) {
      wallSwitch.classList.add('is-on');
    }

    if (navigator.vibrate) {
      try { navigator.vibrate(35); } catch (e) {}
    }

    if (guideStage2) {
      guideStage2.classList.add('fade-out');
    }

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

  if (wallSwitch) {
    wallSwitch.addEventListener('click', turnOnLights);
    wallSwitch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        turnOnLights();
      }
    });
  }

  if (btnToStage3) btnToStage3.addEventListener('click', () => {
    goToStage(3);
    initBalloons();
  });

  // ================= STAGE 3: BALLOONS (STABLE RACK & FEED) =================
  const balloonsRack = document.getElementById('balloons-rack');
  const wishesCardList = document.getElementById('wishes-card-list');
  const wishesSectionTitle = document.getElementById('wishes-section-title');
  const balloonProgressText = document.getElementById('balloon-progress-text');
  const btnToStage4 = document.getElementById('btn-to-stage-4');
  const guideStage3 = document.getElementById('guide-stage-3');
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
    if (balloonsRack) balloonsRack.innerHTML = '';
    if (wishesCardList) wishesCardList.innerHTML = '';
    balloonsPopped = 0;

    const wishes = cfg.balloonWishes || [
      { title: "Joy", text: "May your year be filled with laughter and delight! ✨" },
      { title: "Adventure", text: "Exciting journeys ahead! 🚀" },
      { title: "Dreams", text: "May all your wishes come true! 🌟" },
      { title: "Love", text: "Always surrounded by warmth & happiness! 💖" },
      { title: "Magic", text: "Stay fabulous and bright! 🥂" }
    ];

    wishes.forEach((item, index) => {
      const slot = document.createElement('div');
      slot.className = 'balloon-slot';
      slot.id = `balloon-slot-${index}`;

      const wrap = document.createElement('div');
      wrap.className = 'balloon-wrap';
      const color = balloonColors[index % balloonColors.length];

      wrap.innerHTML = `
        <div class="balloon" style="background: ${color}; animation-delay: ${(index * 0.35).toFixed(1)}s;">
          <div class="balloon-highlight"></div>
          <span class="balloon-label">Pop!</span>
        </div>
        <div class="balloon-knot" style="background: ${color};"></div>
        <div class="balloon-string"></div>
      `;

      wrap.addEventListener('click', () => {
        if (slot.dataset.popped) return;
        slot.dataset.popped = 'true';

        if (navigator.vibrate) {
          try { navigator.vibrate(30); } catch (e) {}
        }

        // Sound & Confetti
        if (window.birthdayAudio) window.birthdayAudio.playPop();
        if (window.birthdayConfetti) {
          const rect = wrap.getBoundingClientRect();
          window.birthdayConfetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
        }

        // Replace balloon in its slot with a neat popped badge so other balloons never jump or move
        slot.innerHTML = `
          <div class="popped-badge">
            <span class="popped-badge-icon">✨</span>
            <span class="popped-badge-num">#${index + 1}</span>
          </div>
        `;

        // Reveal wish card in the dedicated list below
        if (wishesSectionTitle) wishesSectionTitle.style.display = 'block';
        if (wishesCardList) {
          const card = document.createElement('div');
          card.className = 'wish-card';
          card.innerHTML = `
            <div class="wish-card-header">
              <div class="wish-card-title">${item.title}</div>
              <span class="wish-card-tag">Wish #${index + 1}</span>
            </div>
            <div class="wish-card-text">${item.text}</div>
          `;
          wishesCardList.appendChild(card);
        }

        balloonsPopped++;
        balloonProgressText.textContent = `Wishes Unlocked: ${balloonsPopped} / ${wishes.length}`;

        if (guideStage3) {
          if (balloonsPopped === wishes.length) {
            guideStage3.classList.add('fade-out');
          } else {
            guideStage3.innerHTML = `<span class="guide-arrow">👇</span> Tap the remaining ${wishes.length - balloonsPopped} balloons!`;
          }
        }

        if (balloonsPopped === wishes.length) {
          balloonProgressText.textContent = `🎉 All ${wishes.length} wishes revealed! The cake is waiting!`;
          if (window.birthdayAudio) window.birthdayAudio.playFanfare();
          if (window.birthdayConfetti) window.birthdayConfetti.cannon();
          btnToStage4.style.display = 'inline-flex';
        }
      });

      slot.appendChild(wrap);
      balloonsRack.appendChild(slot);
    });
  }

  if (btnToStage4) btnToStage4.addEventListener('click', () => goToStage(4));

  // ================= STAGE 4: CAKE & CANDLES =================
  const btnBlowCandles = document.getElementById('btn-blow-candles');
  const btnMicBlow = document.getElementById('btn-mic-blow');
  const micMeterBox = document.getElementById('mic-meter-box');
  const micLevelBar = document.getElementById('mic-level');
  const btnToStage5 = document.getElementById('btn-to-stage-5');
  const cakeScene = document.getElementById('cake-scene');
  const candles = document.querySelectorAll('.candle');
  const guideStage4 = document.getElementById('guide-stage-4');

  function extinguishCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    if (navigator.vibrate) {
      try { navigator.vibrate(35); } catch (e) {}
    }

    if (guideStage4) {
      guideStage4.classList.add('fade-out');
    }

    if (window.birthdayAudio) {
      window.birthdayAudio.playBlow();
    }

    candles.forEach((candle, idx) => {
      setTimeout(() => {
        candle.classList.add('extinguished');
      }, idx * 100);
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
    }, 480);
  }

  // Click on cake candles or button to blow out
  if (btnBlowCandles) btnBlowCandles.addEventListener('click', extinguishCandles);
  if (cakeScene) cakeScene.addEventListener('click', extinguishCandles);
  candles.forEach(c => c.addEventListener('click', (e) => {
    e.stopPropagation();
    extinguishCandles();
  }));

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

  // ================= STAGE 5: GIFT & LETTER =================
  const giftBox = document.getElementById('gift-box');
  const birthdayLetter = document.getElementById('birthday-letter');
  const partyToolbar = document.getElementById('party-toolbar');
  const guideStage5 = document.getElementById('guide-stage-5');
  let giftOpened = false;

  function openGift() {
    if (giftOpened) return;
    giftOpened = true;

    if (navigator.vibrate) {
      try { navigator.vibrate(40); } catch (e) {}
    }

    if (guideStage5) {
      guideStage5.classList.add('fade-out');
    }

    if (window.birthdayAudio) window.birthdayAudio.playGiftOpen();
    if (window.birthdayConfetti) window.birthdayConfetti.cannon();

    giftBox.classList.add('opened');

    setTimeout(() => {
      giftBox.style.display = 'none';
      birthdayLetter.style.display = 'block';
      partyToolbar.style.display = 'flex';
    }, 600);
  }

  if (giftBox) giftBox.addEventListener('click', openGift);

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
      // Reset state for full replay experience
      doorOpened = false;
      doorLeaf.classList.remove('open', 'shake');
      if (guideStage1) {
        guideStage1.classList.remove('fade-out');
        guideStage1.style.display = 'inline-flex';
      }

      lightsTurnedOn = false;
      if (wallSwitch) wallSwitch.classList.remove('is-on');
      if (lightScene) lightScene.classList.remove('lights-on');
      btnToStage3.style.display = 'none';
      if (guideStage2) {
        guideStage2.classList.remove('fade-out');
        guideStage2.style.display = 'inline-flex';
      }

      balloonsInitialized = false;
      balloonsPopped = 0;
      if (balloonsRack) balloonsRack.innerHTML = '';
      if (wishesCardList) wishesCardList.innerHTML = '';
      if (wishesSectionTitle) wishesSectionTitle.style.display = 'none';
      balloonProgressText.textContent = 'Wishes Unlocked: 0 / 5';
      btnToStage4.style.display = 'none';
      if (guideStage3) {
        guideStage3.classList.remove('fade-out');
        guideStage3.style.display = 'inline-flex';
        guideStage3.innerHTML = '<span class="guide-arrow">👇</span> Tap each balloon to pop & reveal wishes!';
      }

      candlesBlown = false;
      candles.forEach(c => c.classList.remove('extinguished'));
      btnBlowCandles.style.display = 'inline-flex';
      if (btnMicBlow) btnMicBlow.style.display = 'inline-flex';
      btnToStage5.style.display = 'none';
      if (guideStage4) {
        guideStage4.classList.remove('fade-out');
        guideStage4.style.display = 'inline-flex';
      }

      giftOpened = false;
      giftBox.classList.remove('opened');
      giftBox.style.display = 'block';
      birthdayLetter.style.display = 'none';
      partyToolbar.style.display = 'none';
      if (guideStage5) {
        guideStage5.classList.remove('fade-out');
        guideStage5.style.display = 'inline-flex';
      }

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

  // Strictly prevent pinch-to-zoom and multi-touch zooming
  document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
  document.addEventListener('gesturechange', (e) => e.preventDefault(), { passive: false });
  document.addEventListener('gestureend', (e) => e.preventDefault(), { passive: false });

  // Strictly prevent double-tap to zoom on mobile
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });

  // Run initialization
  applyConfig();
  createAmbientParticles();
});
