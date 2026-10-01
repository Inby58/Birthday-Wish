// ==========================================
// 🎂 BIRTHDAY APPLICATION CONTROLLER
// Handles stages, animations, mic input, polaroids, and lantern wishes
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.BIRTHDAY_CONFIG || {};

  // State variables
  let currentStage = 1;
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

    // Header & Titles
    const headerTitle = cfg.shortName ? `${cfg.shortName}'s Birthday` : `${name}'s Birthday`;
    const headerLogoEl = document.getElementById('header-logo-text');
    if (headerLogoEl) headerLogoEl.textContent = headerTitle;

    const invHeading = document.getElementById('invitation-main-heading');
    if (invHeading) invHeading.textContent = `Warkah Undangan Buat ${name}`;

    const invDesc = document.getElementById('invitation-desc');
    if (invDesc && cfg.invitationSubtitle) invDesc.textContent = cfg.invitationSubtitle;

    // Stage 2 Neon
    const neonName = document.getElementById('neon-birthday-name');
    if (neonName) neonName.textContent = `SELAMAT HARI LAHIR, ${name.toUpperCase()}!`;

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

  // ================= STAGE 1: WARKAH UNDANGAN DIRAJA =================
  const royalEnvelope = document.getElementById('royal-envelope');
  const btnOpenEnvelope = document.getElementById('btn-open-envelope');
  const btnToStage2 = document.getElementById('btn-to-stage-2');
  const guideStage1 = document.getElementById('guide-stage-1');
  let envelopeOpened = false;

  function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;

    if (navigator.vibrate) {
      try { navigator.vibrate(45); } catch (e) {}
    }

    if (guideStage1) {
      guideStage1.classList.add('fade-out');
    }

    if (window.birthdayAudio) {
      window.birthdayAudio.playWaxBreak();
    }

    if (royalEnvelope) {
      royalEnvelope.classList.add('unsealed');
    }

    if (window.birthdayConfetti) {
      const rect = royalEnvelope ? royalEnvelope.getBoundingClientRect() : null;
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
      window.birthdayConfetti.burst(x, y, 45);
    }

    if (btnOpenEnvelope) btnOpenEnvelope.style.display = 'none';
    if (btnToStage2) {
      btnToStage2.style.display = 'inline-flex';
    }

    // Auto transition to Stage 2 after invitation reveals
    setTimeout(() => {
      goToStage(2);
    }, 1800);
  }

  if (btnOpenEnvelope) btnOpenEnvelope.addEventListener('click', openEnvelope);
  if (royalEnvelope) royalEnvelope.addEventListener('click', openEnvelope);
  if (btnToStage2) btnToStage2.addEventListener('click', () => goToStage(2));

  // ================= STAGE 2: PALUAN GONG DIRAJA =================
  const gongDisc = document.getElementById('gong-disc');
  const gongMallet = document.getElementById('gong-mallet');
  const gongWave = document.getElementById('gong-wave');
  const lightScene = document.getElementById('light-scene');
  const btnStrikeGong = document.getElementById('btn-strike-gong');
  const btnToStage3 = document.getElementById('btn-to-stage-3');
  const guideStage2 = document.getElementById('guide-stage-2');
  let gongStruck = false;

  function strikeGong() {
    if (gongStruck) return;
    gongStruck = true;

    if (navigator.vibrate) {
      try { navigator.vibrate([60, 40, 80]); } catch (e) {}
    }

    if (guideStage2) {
      guideStage2.classList.add('fade-out');
    }

    // Swing mallet animation
    if (gongMallet) {
      gongMallet.classList.add('swing');
    }

    // Strike impact sound & golden resonance wave upon mallet contact (~160ms)
    setTimeout(() => {
      if (window.birthdayAudio) {
        window.birthdayAudio.playGong();
      }

      if (gongDisc) {
        gongDisc.classList.add('striking');
      }

      if (gongWave) {
        gongWave.classList.add('ripple');
      }

      if (window.birthdayConfetti) {
        const rect = gongDisc ? gongDisc.getBoundingClientRect() : null;
        const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const y = rect ? rect.top + rect.height / 2 : window.innerHeight * 0.4;
        window.birthdayConfetti.burst(x, y, 55);
      }

      // Illuminate royal hall and marquee banner
      setTimeout(() => {
        if (lightScene) lightScene.classList.add('lights-on');

        if (cfg.audio && cfg.audio.autoPlayMelody && window.birthdayAudio) {
          window.birthdayAudio.startBackgroundMusic();
          updateMusicButtonState(true);
        }

        if (btnStrikeGong) btnStrikeGong.style.display = 'none';
        if (btnToStage3) btnToStage3.style.display = 'inline-flex';
      }, 500);
    }, 180);
  }

  if (btnStrikeGong) btnStrikeGong.addEventListener('click', strikeGong);
  if (gongDisc) {
    gongDisc.addEventListener('click', strikeGong);
    gongDisc.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        strikeGong();
      }
    });
  }
  if (btnToStage3) {
    btnToStage3.addEventListener('click', () => {
      goToStage(3);
      initPelita();
    });
  }

  // ================= STAGE 3: PELITA EMAS DIRAJA =================
  const pelitaRack = document.getElementById('pelita-rack');
  const wishesCardList = document.getElementById('wishes-card-list');
  const wishesSectionTitle = document.getElementById('wishes-section-title');
  const pelitaProgressText = document.getElementById('pelita-progress-text');
  const btnToStage4 = document.getElementById('btn-to-stage-4');
  const guideStage3 = document.getElementById('guide-stage-3');
  let pelitaInitialized = false;
  let pelitaLitCount = 0;

  function initPelita() {
    if (pelitaInitialized) return;
    pelitaInitialized = true;
    if (pelitaRack) pelitaRack.innerHTML = '';
    if (wishesCardList) wishesCardList.innerHTML = '';
    pelitaLitCount = 0;

    const wishes = cfg.pelitaWishes || cfg.balloonWishes || [
      { title: "Kesihatan & Afiyat Berpanjangan 🌿", tag: "Pelita 1", icon: "🌿", text: "Semoga Makjon sentiasa sihat bertenaga, dijauhkan kemudaratan, dan segak bergaya!" },
      { title: "Keberkatan & Kelapangan Rezeki 💰", tag: "Pelita 2", icon: "💰", text: "Moga dilapangkan pintu rezeki yang melimpah ruah dan dipermudahkan urusan." },
      { title: "Ketenangan Jiwa & Hati Damai 🕊️", tag: "Pelita 3", icon: "🕊️", text: "Semoga setiap fasa kehidupan dilalui dengan kedamaian dan senyuman bahagia." },
      { title: "The Legend: Hormat & Kasih Sayang 👑", tag: "Pelita 4", icon: "👑", text: "Insan sempoi, hebat, dan sentiasa menjadi inspirasi keluarga kita!" },
      { title: "Limpahan Rahmat & Lindungan Ilahi 🤲", tag: "Pelita 5", icon: "🤲", text: "Moga Makjon sentiasa dipayungi rahmat dan lindungan Allah SWT selalu. Amin!" }
    ];

    wishes.forEach((item, index) => {
      const lamp = document.createElement('div');
      lamp.className = 'pelita-lamp';
      lamp.id = `pelita-lamp-${index}`;
      lamp.setAttribute('role', 'button');
      lamp.setAttribute('tabindex', '0');
      lamp.setAttribute('title', `Tekan untuk menyalakan Pelita #${index + 1} (${item.title})`);

      lamp.innerHTML = `
        <div class="pelita-aura"></div>
        <div class="pelita-flame-wrap">
          <div class="pelita-wick"></div>
          <div class="pelita-flame"></div>
          <div class="pelita-sparks"></div>
        </div>
        <div class="pelita-vessel">
          <div class="pelita-spout"></div>
          <div class="pelita-rim"></div>
          <div class="pelita-belly">
            <span class="pelita-songket-icon">✦</span>
          </div>
          <div class="pelita-handle"></div>
        </div>
        <div class="pelita-pedestal">
          <span class="pelita-number">#${index + 1}</span>
        </div>
        <span class="pelita-state-label">Tekan Nyala</span>
      `;

      function igniteLamp() {
        if (lamp.classList.contains('lit')) return;
        lamp.classList.add('lit');

        const stateLabel = lamp.querySelector('.pelita-state-label');
        if (stateLabel) stateLabel.textContent = 'Menyala ✨';

        if (navigator.vibrate) {
          try { navigator.vibrate(35); } catch (e) {}
        }

        // Sound: Pentatonic match strike & singing bowl chime
        if (window.birthdayAudio) {
          window.birthdayAudio.playPelitaIgnite(index);
        }

        // Confetti spark burst from the lamp position
        if (window.birthdayConfetti) {
          const rect = lamp.getBoundingClientRect();
          window.birthdayConfetti.burst(rect.left + rect.width / 2, rect.top + rect.height * 0.35, 35);
        }

        // Reveal wish card in the dedicated list below
        if (wishesSectionTitle) wishesSectionTitle.style.display = 'block';
        if (wishesCardList) {
          const card = document.createElement('div');
          card.className = 'wish-card';
          card.innerHTML = `
            <div class="wish-card-header">
              <div class="wish-card-title">${item.title}</div>
              <span class="wish-card-tag">${item.tag || `Pelita #${index + 1}`}</span>
            </div>
            <div class="wish-card-text">${item.text}</div>
          `;
          wishesCardList.appendChild(card);
        }

        pelitaLitCount++;
        if (pelitaProgressText) {
          pelitaProgressText.textContent = `Pelita Dinyalakan: ${pelitaLitCount} / ${wishes.length}`;
        }

        if (guideStage3) {
          if (pelitaLitCount === wishes.length) {
            guideStage3.classList.add('fade-out');
          } else {
            guideStage3.innerHTML = `<span class="guide-arrow">👉</span> Nyalakan ${wishes.length - pelitaLitCount} lagi pelita tembaga!`;
          }
        }

        if (pelitaLitCount === wishes.length) {
          if (pelitaProgressText) {
            pelitaProgressText.textContent = `✨ Kesemua 5 Pelita Doa Telah Menyala Sempurna! Menerangi Langkah Makjon! 🪔`;
          }
          if (window.birthdayAudio) window.birthdayAudio.playFanfare();
          if (window.birthdayConfetti) window.birthdayConfetti.cannon();
          if (btnToStage4) btnToStage4.style.display = 'inline-flex';
        }
      }

      lamp.addEventListener('click', igniteLamp);
      lamp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          igniteLamp();
        }
      });

      pelitaRack.appendChild(lamp);
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

  // ================= STAGE 5: GIFT VAULT & MEMORY GAME =================
  const giftBox = document.getElementById('gift-box');
  const giftPadlockWrap = document.getElementById('gift-padlock-wrap');
  const padlockIcon = document.getElementById('padlock-icon');
  const padlockLabel = document.getElementById('padlock-label');
  const badgeLockIcon = document.getElementById('badge-lock-icon');
  const birthdayLetter = document.getElementById('birthday-letter');
  const partyToolbar = document.getElementById('party-toolbar');
  const guideStage5 = document.getElementById('guide-stage-5');
  const memoryGrid = document.getElementById('memory-grid');
  const trackerCount = document.getElementById('tracker-count');
  const memoryStatusText = document.getElementById('memory-status-text');
  const memoryStatusBox = document.getElementById('memory-status');
  const statusIcon = document.getElementById('status-icon');
  const btnReplayGame = document.getElementById('btn-replay-game');
  const memoryGameSection = document.getElementById('memory-game-section');

  let giftOpened = false;
  let isVaultUnlocked = false;
  let flippedCards = [];
  let isCheckingCards = false;
  let matchedPairsCount = 0;
  const TOTAL_PAIRS = 3;

  // Makjon's signature pairs
  const cardData = [
    { id: 'legend', icon: '👑', title: 'The Legend', subtitle: "Ikon Keluarga" },
    { id: 'cool',   icon: '🕶️', title: 'Cool & Sempoi', subtitle: "Gaya Tersendiri" },
    { id: 'kopi',   icon: '☕', title: 'Kopi & Santai',  subtitle: "Tenang & Santai" }
  ];

  function createMemoryDeck() {
    const deck = [...cardData, ...cardData];
    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  function renderMemoryGame() {
    if (!memoryGrid) return;
    memoryGrid.innerHTML = '';
    flippedCards = [];
    isCheckingCards = false;
    matchedPairsCount = 0;
    
    // Reset tracker UI
    if (trackerCount) trackerCount.textContent = `0 / ${TOTAL_PAIRS}`;
    for (let i = 0; i < TOTAL_PAIRS; i++) {
      const slot = document.getElementById(`key-slot-${i}`);
      if (slot) slot.classList.remove('collected');
    }

    if (memoryStatusText) {
      memoryStatusText.textContent = 'Tap any card to begin matching!';
    }
    if (memoryStatusBox) {
      memoryStatusBox.classList.remove('success');
    }
    if (statusIcon) statusIcon.textContent = '💡';

    const deck = createMemoryDeck();
    deck.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'memory-card';
      cardEl.dataset.id = card.id;
      cardEl.dataset.index = index;
      cardEl.setAttribute('role', 'button');
      cardEl.setAttribute('tabindex', '0');
      cardEl.setAttribute('aria-label', `Card ${index + 1}`);

      cardEl.innerHTML = `
        <div class="memory-card-inner">
          <div class="memory-card-back">
            <span class="card-back-icon">🎁</span>
            <span class="card-back-pattern">✦ ✦ ✦</span>
          </div>
          <div class="memory-card-front">
            <span class="card-front-icon">${card.icon}</span>
            <span class="card-front-title">${card.title}</span>
          </div>
        </div>
      `;

      cardEl.addEventListener('click', () => handleCardClick(cardEl));
      cardEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(cardEl);
        }
      });

      memoryGrid.appendChild(cardEl);
    });
  }

  function handleCardClick(cardEl) {
    if (isVaultUnlocked) return;
    if (isCheckingCards) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    // Flip this card
    cardEl.classList.add('flipped');
    if (window.birthdayAudio) window.birthdayAudio.playCardFlip();
    flippedCards.push(cardEl);

    if (flippedCards.length === 1) {
      if (memoryStatusText) memoryStatusText.textContent = 'Find its matching pair!';
      if (statusIcon) statusIcon.textContent = '👀';
    } else if (flippedCards.length === 2) {
      isCheckingCards = true;
      const [cardA, cardB] = flippedCards;

      if (cardA.dataset.id === cardB.dataset.id) {
        // MATCH FOUND!
        matchedPairsCount++;
        cardA.classList.add('matched');
        cardB.classList.add('matched');

        if (window.birthdayAudio) window.birthdayAudio.playCardMatch();

        // Update key slot
        const slotIndex = matchedPairsCount - 1;
        const keySlot = document.getElementById(`key-slot-${slotIndex}`);
        if (keySlot) keySlot.classList.add('collected');
        if (trackerCount) trackerCount.textContent = `${matchedPairsCount} / ${TOTAL_PAIRS}`;

        // Micro-burst of confetti at cards
        const rectA = cardA.getBoundingClientRect();
        if (window.birthdayConfetti) {
          window.birthdayConfetti.burst(rectA.left + rectA.width / 2, rectA.top + rectA.height / 2, 18);
        }

        if (matchedPairsCount === TOTAL_PAIRS) {
          // ALL MATCHED -> UNLOCK VAULT!
          triggerVaultUnlock();
        } else {
          if (memoryStatusText) {
            memoryStatusText.textContent = `🎉 Match found! ${matchedPairsCount} of ${TOTAL_PAIRS} keys collected!`;
          }
          if (statusIcon) statusIcon.textContent = '🗝️';
          flippedCards = [];
          isCheckingCards = false;
        }
      } else {
        // MISMATCH
        if (window.birthdayAudio) window.birthdayAudio.playCardMismatch();
        cardA.classList.add('mismatch');
        cardB.classList.add('mismatch');
        if (memoryStatusText) memoryStatusText.textContent = 'Not a match! Try again...';
        if (statusIcon) statusIcon.textContent = '🤔';

        setTimeout(() => {
          cardA.classList.remove('flipped', 'mismatch');
          cardB.classList.remove('flipped', 'mismatch');
          flippedCards = [];
          isCheckingCards = false;
          if (memoryStatusText) memoryStatusText.textContent = 'Tap a card to continue!';
          if (statusIcon) statusIcon.textContent = '💡';
        }, 800);
      }
    }
  }

  function triggerVaultUnlock() {
    isVaultUnlocked = true;
    if (window.birthdayAudio) window.birthdayAudio.playUnlock();
    if (window.birthdayConfetti) window.birthdayConfetti.cannon();

    if (memoryStatusText) {
      memoryStatusText.textContent = "✨ ALL KEYS COLLECTED! Unlocking Makjon's Vault! ✨";
    }
    if (memoryStatusBox) memoryStatusBox.classList.add('success');
    if (statusIcon) statusIcon.textContent = '🔓';
    if (badgeLockIcon) badgeLockIcon.textContent = '🔓';

    // Animate padlock opening
    if (giftPadlockWrap) {
      giftPadlockWrap.classList.add('unlocked');
    }
    if (padlockIcon) padlockIcon.textContent = '🔓';
    if (padlockLabel) padlockLabel.textContent = 'OPEN';

    if (guideStage5) {
      guideStage5.innerHTML = '<span class="guide-arrow">🎁</span> Vault Unlocked! Opening gift box...';
    }

    // Automatically open the gift box smoothly after celebration
    setTimeout(() => {
      openGift();
    }, 1300);
  }

  function handleLockedGiftClick() {
    if (giftOpened) return;
    if (!isVaultUnlocked) {
      // Padlock shake & feedback
      if (giftPadlockWrap) {
        giftPadlockWrap.classList.remove('rattle');
        void giftPadlockWrap.offsetWidth; // Force reflow
        giftPadlockWrap.classList.add('rattle');
      }
      if (window.birthdayAudio) window.birthdayAudio.playCardMismatch();
      showToast("🔒 Vault is locked! Match all 3 pairs below to open Makjon's gift!");

      // Scroll smoothly to memory game
      if (memoryGameSection) {
        memoryGameSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      return;
    }

    openGift();
  }

  function openGift() {
    if (giftOpened) return;
    giftOpened = true;

    if (navigator.vibrate) {
      try { navigator.vibrate(50); } catch (e) {}
    }

    if (guideStage5) {
      guideStage5.classList.add('fade-out');
    }

    if (window.birthdayAudio) window.birthdayAudio.playGiftOpen();
    if (window.birthdayConfetti) window.birthdayConfetti.cannon();

    giftBox.classList.add('opened');

    setTimeout(() => {
      giftBox.style.display = 'none';
      if (memoryGameSection) memoryGameSection.style.display = 'none';
      birthdayLetter.style.display = 'block';
      partyToolbar.style.display = 'flex';

      // Smooth scroll to letter
      birthdayLetter.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
  }

  if (giftBox) giftBox.addEventListener('click', handleLockedGiftClick);

  // Replay Memory Game button handler
  if (btnReplayGame) {
    btnReplayGame.addEventListener('click', () => {
      giftOpened = false;
      isVaultUnlocked = false;

      giftBox.classList.remove('opened');
      giftBox.style.display = 'block';

      if (giftPadlockWrap) {
        giftPadlockWrap.classList.remove('unlocked', 'rattle');
      }
      if (padlockIcon) padlockIcon.textContent = '🔒';
      if (padlockLabel) padlockLabel.textContent = 'LOCKED';
      if (badgeLockIcon) badgeLockIcon.textContent = '🔐';

      if (memoryGameSection) memoryGameSection.style.display = 'flex';
      birthdayLetter.style.display = 'none';
      partyToolbar.style.display = 'none';

      if (guideStage5) {
        guideStage5.classList.remove('fade-out');
        guideStage5.style.display = 'inline-flex';
        guideStage5.innerHTML = '<span class="guide-arrow">👇</span> Match the 3 pairs below to unlock the gift!';
      }

      renderMemoryGame();
      giftBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast('Memory challenge reshuffled! Have fun matching!');
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
      // Reset Stage 1 (Warkah Diraja)
      envelopeOpened = false;
      if (royalEnvelope) royalEnvelope.classList.remove('unsealed');
      if (btnOpenEnvelope) btnOpenEnvelope.style.display = 'inline-flex';
      if (btnToStage2) btnToStage2.style.display = 'none';
      if (guideStage1) {
        guideStage1.classList.remove('fade-out');
        guideStage1.style.display = 'inline-flex';
      }

      // Reset Stage 2 (Paluan Gong Diraja)
      gongStruck = false;
      if (gongDisc) gongDisc.classList.remove('striking');
      if (gongMallet) gongMallet.classList.remove('swing');
      if (gongWave) gongWave.classList.remove('ripple');
      if (lightScene) lightScene.classList.remove('lights-on');
      if (btnStrikeGong) btnStrikeGong.style.display = 'inline-flex';
      if (btnToStage3) btnToStage3.style.display = 'none';
      if (guideStage2) {
        guideStage2.classList.remove('fade-out');
        guideStage2.style.display = 'inline-flex';
      }

      // Reset Stage 3 (Pelita Emas Diraja)
      pelitaInitialized = false;
      pelitaLitCount = 0;
      if (pelitaRack) pelitaRack.innerHTML = '';
      if (wishesCardList) wishesCardList.innerHTML = '';
      if (wishesSectionTitle) wishesSectionTitle.style.display = 'none';
      if (pelitaProgressText) pelitaProgressText.textContent = 'Pelita Dinyalakan: 0 / 5';
      btnToStage4.style.display = 'none';
      if (guideStage3) {
        guideStage3.classList.remove('fade-out');
        guideStage3.style.display = 'inline-flex';
        guideStage3.innerHTML = '<span class="guide-arrow">👉</span> Tekan setiap pelita tembaga untuk menyalakan apinya!';
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
      isVaultUnlocked = false;
      giftBox.classList.remove('opened');
      giftBox.style.display = 'block';

      if (giftPadlockWrap) {
        giftPadlockWrap.classList.remove('unlocked', 'rattle');
      }
      if (padlockIcon) padlockIcon.textContent = '🔒';
      if (padlockLabel) padlockLabel.textContent = 'LOCKED';
      if (badgeLockIcon) badgeLockIcon.textContent = '🔐';

      if (memoryGameSection) memoryGameSection.style.display = 'flex';
      birthdayLetter.style.display = 'none';
      partyToolbar.style.display = 'none';
      if (guideStage5) {
        guideStage5.classList.remove('fade-out');
        guideStage5.style.display = 'inline-flex';
        guideStage5.innerHTML = '<span class="guide-arrow">👇</span> Match the 3 pairs below to unlock the gift!';
      }

      renderMemoryGame();
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
  renderMemoryGame();
});
