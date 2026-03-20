export const projects = [
  {
    id: 1,
    title: "CoffeeHybrid V2",
    subtitle: "Smart Coffee Ordering System",
    type: "Full-Stack E-Commerce",
    role: "Full-Stack Developer",
    period: "Feb – Mar 2026",
    tags: ["Next.js 15", "TypeScript", "Tailwind v4", "MongoDB", "NextAuth v5", "Zustand"],
    description:
      "A modern coffee ordering platform featuring a smart menu with real-time customization, Zustand-powered cart management, and QR code verification for orders. Includes a staff dashboard with live order tracking (Kanban board) and a QR scanner for instant pickup verification. Refactored for maximum performance and clean architecture.",
    media: "/photos/CoffeeHybridDemo.mp4",
    mediaType: "video",
    screenshots: [
      "/photos/CoffeeHybrid 2026-03-20 at 2.31.37 in the afternoon.png",
      "/photos/CoffeeHybrid 2026-03-20 at 2.31.48 in the afternoon.png",
      "/photos/CoffeeHybrid 2026-03-20 at 2.32.02 in the afternoon.png",
      "/photos/CoffeeHybrid 2026-03-20 at 2.32.23 in the afternoon.png",
      "/photos/CoffeeHybrid 2026-03-20 at 2.33.49 in the afternoon.png",
      "/photos/CoffeeHybrid 2026-03-20 at 2.34.07 in the afternoon.png"
    ],
    github: "https://github.com/TetElite/coffeehybrid",
    live: "https://coffeehybrid-zveg.vercel.app/",
  },
  {
    id: 2,
    title: "MahopFlex",
    subtitle: "Offline Food Recipe Finder",
    type: "Mobile App",
    role: "Mobile Developer",
    period: "Dec 2025 – Jan 2026",
    tags: ["Flutter", "SQLite", "Offline DB", "UI Design"],
    description:
      "A fully offline food recipe finder built with Flutter and SQLite. Handled backend logic, database design, and data modeling. Designed for areas with limited connectivity, ensuring users can access culinary inspiration anytime, anywhere.",
    media: "/photos/mahopdemo.mp4",
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
    media: "/photos/Portfolio.png",
    mediaType: "gif",
    github: null,
    live: null,
  },
];
