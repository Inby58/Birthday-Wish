// ==========================================
// 🎂 BIRTHDAY CONFIGURATION
// Personalized for Makjon ✨
// ==========================================

const BIRTHDAY_CONFIG = {
  // Birthday Celebrant's Details
  name: "Makjon",                    // Main name displayed across all stages
  shortName: "Makjon",               // Shorter version for compact navigation
  nickname: "The Legend",            // Title or descriptor
  age: "",                           // Age (can be set or left empty)
  date: "Today",                     // Display date

  // Quick greetings displayed during stages
  invitationSubtitle: "Warkah undangan istimewa sempena sambutan hari lahir Makjon yang diraikan dengan penuh kasih & penghormatan! ✨",
  lightsBanner: "SELAMAT HARI LAHIR, MAKJON!",
  cakeTitle: "Niatkan hajat di hati dan tiup lilin hari lahir, Makjon! 🎂",

  // Pop-up wishes revealed when balloons are popped (5 balloons)
  balloonWishes: [
    { 
      title: "Kesihatan & Awet Muda 🌿", 
      text: "Semoga Makjon sentiasa dikurniakan tubuh badan yang sihat bertenaga, dipanjangkan usia, dan kekal segak bergaya selalu!" 
    },
    { 
      title: "Rezeki Melimpah Ruah 💰", 
      text: "Moga dilapangkan rezeki seluas lautan, diberkati setiap usaha, dan dipermudahkan segala urusan pekerjaan." 
    },
    { 
      title: "Ketenangan & Kebahagiaan 🕊️", 
      text: "Semoga setiap hari dilalui dengan ketenangan jiwa, senyuman manis, dan dipenuhi kasih sayang keluarga tersayang." 
    },
    { 
      title: "The Legend Trophy 🏆", 
      text: "Insan yang sentiasa tenang, sempoi, dan berjiwa murni! Terima kasih kerana sentiasa menjadi inspirasi keluarga kita." 
    },
    { 
      title: "Rahmat & Perlindungan 🤲", 
      text: "Moga setiap langkah Makjon sentiasa dalam naungan, lindungan, serta limpahan rahmat Allah SWT di dunia dan akhirat. Amin!" 
    }
  ],

  // Grand Letter content revealed inside the Gift Box
  letter: {
    salutation: "Dearest Makjon,",
    paragraphs: [
      "Selamat Hari Lahir buat Makjon yang paling kami hormati, sayangi, dan banggakan! Hari ini adalah hari yang amat istimewa untuk meraikan seorang insan yang hebat, berwibawa, dan sentiasa menceriakan kami sekeluarga.",
      "Terima kasih atas segala kenangan manis, bimbingan berharga, gelak tawa santai, dan kasih sayang ikhlas yang Makjon kongsikan bersama kami selama ini. Kehadiran Makjon sentiasa menghidupkan suasana dan membawa aura tenang serta positif kepada semua orang di sekeliling.",
      "Semoga dipanjangkan usia dalam keberkatan, dikurniakan kesihatan yang berpanjangan, dilapangkan pintu rezeki yang melimpah ruah, dan dipermudahkan segala urusan dunia serta akhirat. Saya sentiasa mendoakan agar Makjon sekeluarga sentiasa berada dalam perlindungan dan rahmat Allah SWT.",
      "Semoga tahun ini membawa seribu satu kegembiraan baru, kejayaan yang membanggakan, serta kedamaian yang berpanjangan. Always remember how deeply you are respected, cherished, and loved by our family!"
    ],
    closing: "With highest respect, love & warmest prayers,",
    author: "Izzat Nadzmi Bin Yahaya ❤️"
  },

  // Special Photo displayed inside the letter
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
