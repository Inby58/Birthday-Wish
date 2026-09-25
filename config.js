// ==========================================
// 🎂 BIRTHDAY CONFIGURATION
// Personalized for Eira Nadhirah & Mamipah ✨
// ==========================================

const BIRTHDAY_CONFIG = {
  // Birthday Celebrants' Details
  name: "Eira Nadhirah & Mamipah", // Main names displayed across all stages
  shortName: "Eira & Mamipah",     // Shorter version for compact navigation
  nickname: "Our Beloved Celebrants", // Title or sweet descriptor
  age: "",                         // Leave empty for joint celebration
  date: "Today",                   // Display date

  // Quick greetings displayed during stages
  doorSubtitle: "A double celebration of love, gratitude & happiness crafted just for you both ✨",
  lightsBanner: "HAPPY BIRTHDAY",
  cakeTitle: "Close your eyes, make your wishes together, and blow out the candles! 🎂",

  // Pop-up wishes revealed when balloons are popped (5 balloons)
  balloonWishes: [
    { 
      title: "Endless Joy", 
      text: "May both of your lives be blessed with abundant smiles, peaceful days, and hearty laughter! ✨" 
    },
    { 
      title: "Good Health & Vitality", 
      text: "Wishing Eira Nadhirah & Mamipah lifelong wellness, strength, and serenity in everything you do! 🌿" 
    },
    { 
      title: "Dreams Fulfilled", 
      text: "May every quiet hope, heartfelt prayer, and wonderful ambition turn into reality! 🌟" 
    },
    { 
      title: "Boundless Love", 
      text: "Always surrounded by the warmest love, respect, and gratitude from family and friends! 💖" 
    },
    { 
      title: "Pure Grace", 
      text: "Celebrating the two incredible, inspiring souls that light up our family and world every day! 🥂" 
    }
  ],

  // Grand Letter content revealed inside the Gift Box
  letter: {
    salutation: "Dearest Eira Nadhirah & Mamipah,",
    paragraphs: [
      "Happy Birthday to two of the most wonderful, loving, and radiant souls! Today is an extraordinary day because we get to celebrate both of you together.",
      "Thank you for the endless warmth, selfless love, guidance, and laughter that you bring into our lives. You both hold an irreplaceable place in our hearts, and each day is so much brighter with you in it.",
      "As you step into another blessed milestone year, I pray and hope that the journey ahead brings boundless peace of mind, sound health, joyous moments, and countless blessings.",
      "May all your prayers be answered, your smiles never fade, and your days be filled with happiness and harmony. Always remember how deeply loved, appreciated, and cherished you both are!"
    ],
    closing: "With all our love, gratitude & warmest prayers,",
    author: "Forever In Our Hearts ❤️"
  },

  // Memory Polaroids (can replace with local image paths e.g. './photo1.jpg' or your uploaded photos)
  polaroids: [
    {
      caption: "Cherished Moments Together ✨",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"
    },
    {
      caption: "Laughter, Love & Joy 🥂",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80"
    },
    {
      caption: "Blessed New Beginnings 🌟",
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
