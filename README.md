# 🎂 Interactive Birthday Celebration Website

An aesthetic, interactive birthday journey website built with modern web technologies, smooth animations, Web Audio API sound effects, and zero external build dependencies. Perfect for deploying in seconds to **Vercel**!

---

## ✨ Features & Stages

1. **🚪 Stage 1: Knock to Enter**
   - 3D perspective luxury doorway with custom VIP plaque for the birthday person.
   - Interactive brass knocker with wood knocking sound effects.
   - Smooth door opening animation revealing the party hall.

2. **💡 Stage 2: Turn on the Lights**
   - Pull the dangling glowing switch cord to illuminate the room.
   - Glowing warm fairy lights cascade across the ceiling.
   - Neon marquee banner with personalized name lights up.
   - Background music box "Happy Birthday" melody starts playing!

3. **🎈 Stage 3: Pop the Birthday Balloons**
   - 5 floating balloons with authentic buoyancy and sway.
   - Tap balloons to pop them with crisp sound effects and confetti bursts.
   - Each balloon reveals a secret wish & heartfelt compliment card!

4. **🎂 Stage 4: Make a Wish & Blow Out Candles**
   - 3-tier birthday cake with glowing flickering candle flames.
   - **Interactive Blow Options**:
     - Click/tap to blow out candles.
     - **Microphone Blowing Detection**: Blow directly into your device's microphone to extinguish the candles!
   - Confetti cannon explosion and cheering fanfare!

5. **🎁 Stage 5: The Grand Gift & Unfolding Letter**
   - 3D luxury gift box unties and opens.
   - Unfolds an authentic wax-sealed parchment letter with personalized messages.
   - **Polaroid Memories Gallery**: Polaroid cards with hover tilt effects + interactive photo upload button.
   - **Sky Lantern Wish**: Type a wish for the new year and release a glowing sky lantern that floats into the starry night sky (saved in local storage).
   - Confetti blaster, replay journey, and one-click share link buttons.

---

## 🎨 How to Personalize

Open `config.js` in your editor. You can easily customize:
- `name`: The birthday person's name (e.g. `"Sarah"`)
- `nickname`: Cute nickname or title (e.g. `"Sunshine"` or `"Bestie"`)
- `age`: Age number (e.g. `"25"`), or `""` to hide age
- `balloonWishes`: The 5 custom messages revealed when balloons pop
- `letter`: The salutation, paragraphs, closing, and author signature
- `polaroids`: Image URLs or local paths with custom captions

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
