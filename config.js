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

  // 5 Pelita Doa Emas Diraja (diperbaharui khas buat Makjon)
  pelitaWishes: [
    { 
      title: "Kesihatan & Afiyat Berpanjangan 🌿", 
      tag: "Pelita 1",
      icon: "🌿",
      text: "Semoga Makjon sentiasa dikurniakan tubuh badan yang sihat bertenaga, dijauhkan daripada sebarang kemudaratan, dan kekal cergas serta segak bergaya selalu." 
    },
    { 
      title: "Keberkatan & Kelapangan Rezeki 💰", 
      tag: "Pelita 2",
      icon: "💰",
      text: "Moga dilapangkan pintu rezeki Makjon seluas lautan, diberkati dalam setiap usaha dan ikhtiar, serta dipermudahkan segala urusan pekerjaan." 
    },
    { 
      title: "Ketenangan Jiwa & Hati Damai 🕊️", 
      tag: "Pelita 3",
      icon: "🕊️",
      text: "Semoga setiap fasa kehidupan Makjon dilalui dengan ketenangan hati, senyuman bahagia, dan kemanisan bersama keluarga tersayang." 
    },
    { 
      title: "The Legend: Hormat & Kasih Sayang 👑", 
      tag: "Pelita 4",
      icon: "👑",
      text: "Insan yang berwibawa, sempoi, dan sentiasa menjadi inspirasi serta penyeri keluarga. Terima kasih Makjon atas bimbingan dan teladan yang tidak ternilai!" 
    },
    { 
      title: "Limpahan Rahmat & Lindungan Ilahi 🤲", 
      tag: "Pelita 5",
      icon: "🤲",
      text: "Moga setiap langkah dan hela nafas Makjon sentiasa dipayungi rahmat, kasih sayang, keampunan, serta lindungan Allah SWT di dunia dan akhirat. Amin!" 
    }
  ],
  // Backward compatibility alias
  get balloonWishes() { return this.pelitaWishes; },

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
