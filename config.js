// ==========================================
// 🎂 BIRTHDAY CONFIGURATION
// Personalized for Uncle Makjon ✨
// ==========================================

const BIRTHDAY_CONFIG = {
  // Birthday Celebrant's Details
  name: "Uncle Makjon",             // Main name displayed across all stages
  shortName: "Makjon",              // Shorter version for compact navigation
  nickname: "The Legend & Coolest Uncle", // Title or sweet descriptor
  age: "",                          // Age (can be set or left empty)
  date: "Today",                    // Display date

  // Quick greetings displayed during stages
  doorSubtitle: "A special VIP celebration crafted with love and respect for our beloved Uncle Makjon! ✨",
  lightsBanner: "HAPPY BIRTHDAY UNCLE MAKJON",
  cakeTitle: "Close your eyes, make a wish in your heart, and blow out the candles, Uncle Makjon! 🎂",

  // Pop-up wishes revealed when balloons are popped (5 balloons)
  balloonWishes: [
    { 
      title: "Kesihatan & Awet Muda 🌿", 
      text: "Semoga Uncle Makjon sentiasa dikurniakan tubuh badan yang cergas sihat, panjang umur, dan kekal awet muda bergaya selalu!" 
    },
    { 
      title: "Rezeki Melimpah Ruah 💰", 
      text: "Moga dilapangkan rezeki seluas lautan, dipermudahkan segala urusan pekerjaan, dan sentiasa dalam keberkatan Ilahi." 
    },
    { 
      title: "Ketenangan & Kebahagiaan 🕊️", 
      text: "Semoga setiap hari dilalui dengan ketenangan jiwa, senyuman bahagia, dan dipenuhi kasih sayang bersama keluarga tercinta." 
    },
    { 
      title: "The Coolest Uncle Trophy 🏆", 
      text: "Uncle yang paling sempoi, ceria, dan sporting! Terima kasih kerana sentiasa menjadi inspirasi dan menceriakan suasana keluarga." 
    },
    { 
      title: "Rahmat & Perlindungan 🤲", 
      text: "Moga setiap langkah Uncle Makjon sentiasa dilindungi, dirahmati, dan diberkati Allah SWT di dunia dan akhirat. Amin!" 
    }
  ],

  // Grand Letter content revealed inside the Gift Box
  letter: {
    salutation: "Dearest Uncle Makjon,",
    paragraphs: [
      "Selamat Hari Lahir buat Uncle Makjon yang paling sempoi, berjiwa muda, dan kami sayangi! Hari ini adalah hari yang istimewa untuk meraikan seorang uncle yang hebat, penuh teladan, dan sentiasa menceriakan kami sekeluarga.",
      "Terima kasih atas segala kenangan indah, nasihat yang membina, gelak tawa santai, dan kasih sayang ikhlas yang Uncle kongsikan bersama kami selama ini. Kehadiran Uncle sentiasa menghidupkan suasana dan memberi aura positif kepada semua orang di sekeliling.",
      "Semoga dipanjangkan usia dalam keberkatan, dikurniakan kesihatan yang berpanjangan, dilapangkan pintu rezeki yang melimpah ruah, dan dipermudahkan segala urusan dunia serta akhirat. Saya sentiasa mendoakan agar Uncle sekeluarga sentiasa berada dalam lindungan dan rahmat Allah SWT.",
      "Semoga tahun ini membawa seribu satu kegembiraan baru, kejayaan yang membanggakan, serta kedamaian yang berpanjangan. Always remember how much you are loved and appreciated by our family!"
    ],
    closing: "With highest respect, love & warmest prayers,",
    author: "Izzat Nadzmi Bin Yahaya ❤️"
  },

  // Special Photo displayed inside the letter (name your file "photo.jpg" in the project folder)
  photoUrl: "photo.jpg",

  // Background Music Settings
  audio: {
    defaultVolume: 0.4,
    autoPlayMelody: true
  }
};

// Export to window object for browser access
if (typeof window !== "undefined") {
  window.BIRTHDAY_CONFIG = BIRTHDAY_CONFIG;
}
