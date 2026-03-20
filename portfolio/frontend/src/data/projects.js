export const projects = [
  {
    id: 1,
    title: "MahopFlex",
    subtitle: "Offline Food Recipe Finder",
    type: "Mobile App",
    role: "Mobile Developer",
    period: "Dec 2025 – Jan 2026",
    tags: ["Flutter", "SQLite", "Offline", "UI Design"],
    description:
      "An offline food recipe finder built with Flutter and SQLite. " +
      "Handled backend logic, database design, and data modeling — " +
      "plus contributed to UI and overall app structure. " +
      "Works without internet. No WiFi? No problem.",
    media: "/photos/mahopdemo.mov",
    mediaType: "video",
    screenshots: [
      "/photos/mahop1.png",
      "/photos/mahop2.png",
      "/photos/mahop3.png",
      "/photos/mahop4.png",
      "/photos/mahop5.png"
    ],
    github: "https://github.com/Tsn168/Flutter_FInal_Project",
    live: null,
  },
  {
    id: 2,
    title: "Dastern",
    subtitle: "AI-Powered Medication Reminder",
    type: "Mobile App — Capstone Project",
    role: "AI Integration & Bug Fix Lead",
    period: "Nov 2025 – Jan 2026",
    tags: ["Flutter", "OCR", "LLaMA 3B", "Ollama", "Khmer NLP", "Team of 6"],
    description:
      "A medication reminder app that scans prescriptions using KiriOCR " +
      "(Hugging Face) to extract text. A locally-run LLaMA 3B model via " +
      "Ollama then organizes and enhances the extracted text — handling " +
      "both Khmer and English — into a fully structured prescription. " +
      "I was the Bug Fix Lead for the team of 6, ensuring the Khmer OCR " +
      "output was correctly processed and formatted by the LLM.",
    media: "/photos/DasternDemo.mp4",
    mediaType: "video",
    screenshots: [
      "/photos/Dastern_20260320_134810_com.example.das_tern_mcp.jpg",
      "/photos/Dastern_20260320_134817_com.example.das_tern_mcp.jpg",
      "/photos/Dastern_20260320_134822_com.example.das_tern_mcp.jpg",
      "/photos/Dastern_20260320_134826_com.example.das_tern_mcp.jpg",
      "/photos/Dastern_20260320_134840_com.example.das_tern_mcp.jpg"
    ],
    github: null,
    live: null,
  },
  {
    id: 3,
    title: "Survivalist Sorcerer",
    subtitle: "The Mesh Escape",
    type: "Unity Game",
    role: "Game Developer",
    period: "Nov – Dec 2025",
    tags: ["Unity", "C#", "Wave System", "Game Design"],
    description:
      "A survival game where you fight off enemy waves as a sorcerer. " +
      "Built the enemy wave spawning system, wave management logic, " +
      "loading screen, and credit screen.",
    media: "/photos/SurvivalistDemo.mp4",
    mediaType: "video",
    screenshots: [
      "/photos/survivalist1.png",
      "/photos/survivalist2.png",
      "/photos/survivalist3.png",
      "/photos/unity.png"
    ],
    github: "https://github.com/PhaySometh/SurvivalistSorcerer-TheMeshEscape",
    live: null,
  },
  {
    id: 4,
    title: "This Portfolio",
    subtitle: "Frontend React Site",
    type: "Frontend Web App",
    role: "Frontend Developer",
    period: "2026 – Present",
    tags: ["React", "Vite", "Tailwind", "EmailJS", "Framer Motion"],
    description:
      "A pixel-themed dark portfolio built with React and Vite. " +
      "Smooth animations, a working contact form via EmailJS, " +
      "and zero backend needed. " +
      "Yes, it's showing you itself right now. Very meta.",
    media: "/photos/portfolio-demo.gif",
    mediaType: "gif",
    github: null,
    live: null,
  },
];
