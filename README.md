# 🎂 Interactive Birthday Celebration Website

An aesthetic, interactive birthday journey website built with modern web technologies, smooth animations, Web Audio API sound effects, and zero external build dependencies. Perfect for deploying in seconds to **Vercel**!

---

## ✨ Features & Stages

1. **✉️ Stage 1: Warkah Undangan Diraja**
   - 3D Royal Golden Envelope sealed with an authentic wax seal stamped with Makjon's name.
   - Interactive wax break sound effect and smooth unsealing animation revealing the VIP invitation card.

2. **🥁 Stage 2: Paluan Gong Emas Diraja**
   - Traditional carved timber stand with brass Royal Gong and beater mallet.
   - Strike the gong to hear a deep acoustic resonant strike and unleash a golden shockwave ripple.
   - Illuminates the grand banquet hall with fairy lights and golden neon celebration marquee!

3. **🪔 Stage 3: Pelita Emas Diraja (5 Royal Oil Lamps)**
   - 5 traditional ornate brass oil lamps (*Pelita Panjut Tembaga*) set upon a carved timber railing.
   - Tap each pelita to ignite the warm golden flame with a match strike sound and harmonic singing bowl chimes.
   - Each lit pelita radiates a heartfelt prayer (*Doa & Ucapan*) for Makjon's health, peace, prosperity, and blessings.

4. **🎂 Stage 4: Niatkan Hajat & Tiup Lilin Hari Lahir**
   - Elegant champagne silk & chocolate velvet birthday cake with glowing flickering candles.
   - **Interactive Blow Options**:
     - Click/tap to extinguish candles.
     - **Microphone Blowing Detection**: Blow directly into your device's microphone to extinguish the candles!
   - Confetti cannon explosion and cheering celebratory fanfare!

5. **🎁 Stage 5: Peti Rahsia Makjon & Cabaran Kad Memori**
   - Luxury golden vault padlock guarding Makjon's birthday gift box.
   - **Memory Card Matching Challenge**: Match 3 iconic Makjon card pairs to unlock the golden keys and unseal the vault!
   - Unfolds an authentic gold-stamped royal parchment letter with heartfelt words, closing blessings, and featured celebration photo.

---

## 🎨 How to Personalize

Open `config.js` in your editor. You can easily customize:
- `name`: Celebrant's name (e.g. `"Makjon"`)
- `invitationSubtitle`: Subtitle displayed on the Royal Envelope stage
- `pelitaWishes`: The 5 custom prayer messages revealed when each brass oil lamp is lit
- `letter`: Salutation, body paragraphs, closing, and author signature
- `photoUrl`: Local path or URL to the featured celebration photo

---

## 🚀 How to Run Locally

You can simply double-click `index.html` to open it in any web browser!

Or run a local static server with Python:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🌐 Deploy to GitHub & Vercel in 2 Minutes

### 1. Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new) (e.g. `birthday-wish`).
2. Run the following commands in this folder:
```bash
git add .
git commit -m "feat: complete interactive birthday website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..." > "Project"**.
3. Select your `birthday-wish` repository and click **"Import"**.
4. Framework Preset: Leave as **"Other"** (Root Directory: `./`).
5. Click **"Deploy"**!
6. Your birthday website will be live at `https://your-project-name.vercel.app` in seconds! 🌟
