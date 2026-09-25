// ==========================================
// 🎂 BIRTHDAY CONFIGURATION
// You can edit any details below to personalize the birthday website!
// ==========================================

const BIRTHDAY_CONFIG = {
  // Birthday Person's details
  name: "Sarah",               // Main name displayed on banners, cake, and letter
  nickname: "Sunshine",        // Cute nickname (e.g. Bestie, Queen, Champ, Sunshine)
  age: "25",                   // Age (leave as "" if you prefer not to display age)
  date: "Today",               // Display date or leave "Special Day"

  // Quick greetings displayed during stages
  doorSubtitle: "A magical celebration crafted just for you ✨",
  lightsBanner: "HAPPY BIRTHDAY",
  cakeTitle: "Make a wish & blow out the candles!",

  // Pop-up wishes revealed when balloons are popped (5 balloons)
  balloonWishes: [
    { title: "Endless Joy", text: "May your days overflow with laughter, warmth, and genuine smiles! ✨" },
    { title: "Big Adventures", text: "May this upcoming year be packed with exciting journeys and new memories! 🚀" },
    { title: "Unstoppable Dreams", text: "May every goal you set your heart on turn into reality! 🌟" },
    { title: "Peace & Love", text: "Surrounded always by peace, good health, and people who adore you! 💖" },
    { title: "Pure Magic", text: "Never forget how extraordinary, talented, and radiant you are! 🥂" }
  ],

  // Grand Letter content revealed inside the Gift Box
  letter: {
    salutation: "Dearest Sarah,",
    paragraphs: [
      "Happy Birthday! Today is all about celebrating the wonderful, radiant, and inspiring soul that you are.",
      "Thank you for bringing so much brightness, warmth, and laughter into everyone's lives. Your kindness, resilience, and unique spark make the world an infinitely better place.",
      "As you step into this exciting new year, I hope it brings you boundless joy, cherished memories, thrilling breakthroughs, and peace of mind.",
      "May all your quietest hopes and biggest dreams come true. Always stay true to yourself, because the world is so lucky to have you in it!"
    ],
    closing: "With all my love & warmest wishes,",
    author: "Your Favorite Person ❤️"
  },

  // Memory Polaroids (can replace with local image paths e.g. './photo1.jpg' or external URLs)
  polaroids: [
    {
      caption: "Unforgettable Moments ✨",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"
    },
    {
      caption: "Endless Laughter & Fun 🥂",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80"
    },
    {
      caption: "Cheers to New Beginnings 🌟",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // Background Music Settings
  audio: {
    defaultVolume: 0.4,
    autoPlayMelody: true       // Melodic synthesized music starts after door opens
  }
};

// Export to window object for browser access
if (typeof window !== "undefined") {
  window.BIRTHDAY_CONFIG = BIRTHDAY_CONFIG;
}
