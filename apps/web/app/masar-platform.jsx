import { useState, useEffect, useRef } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CourseCard from "./components/cards/CourseCard";
import CenterCard from "./components/cards/CenterCard";
import HomePage from "./components/pages/HomePage";
import CoursesPage from "./components/pages/CoursesPage";
import InstructorsPage from "./components/pages/InstructorsPage";
import CentersPage from "./components/pages/CentersPage";
import CenterProfilePage from "./components/pages/CenterProfilePage";
import DashboardPage from "./components/pages/DashboardPage";
import AuthPage from "./components/pages/AuthPage";
import { translations } from "./i18n/translations";

// ============================================================
// MOCK DATA
// ============================================================
const COURSES = [
  { id: 1, title: "Python for Data Science", instructor: "Ahmed Hassan", center: "Code Academy Sudan", category: "Data Science", level: "Beginner", price: 150, rating: 4.8, students: 320, duration: "8 weeks", image: "🐍", tags: ["Python", "Pandas", "NumPy"], mode: "online", meetLink: "https://zoom.us/j/123456789", groupLink: "https://chat.whatsapp.com/masar-python-ds" },
  { id: 2, title: "Full Stack Web Development", instructor: "Sara Mohamed", center: "TechHub Khartoum", category: "Programming", level: "Intermediate", price: 250, rating: 4.9, students: 210, duration: "12 weeks", image: "🌐", tags: ["React", "Node.js", "MongoDB"], mode: "online", meetLink: "https://meet.google.com/techhub-fullstack", groupLink: "https://t.me/masar_fullstack" },
  { id: 3, title: "Machine Learning Fundamentals", instructor: "Khalid Ibrahim", center: "Code Academy Sudan", category: "Data Science", level: "Advanced", price: 300, rating: 4.7, students: 180, duration: "10 weeks", image: "🤖", tags: ["ML", "TensorFlow", "Scikit-learn"], mode: "online", meetLink: "https://zoom.us/j/987654321", groupLink: "https://chat.whatsapp.com/masar-ml-course" },
  { id: 4, title: "UI/UX Design Principles", instructor: "Amira Osman", center: null, category: "Design", level: "Beginner", price: 120, rating: 4.6, students: 290, duration: "6 weeks", image: "🎨", tags: ["Figma", "Prototyping", "Design"], mode: "online", meetLink: "https://zoom.us/j/uxdesign456", groupLink: "https://t.me/masar_uxdesign" },
  { id: 5, title: "Database Design & SQL", instructor: "Omar Salih", center: "DataMinds Institute", category: "Computer Science", level: "Beginner", price: 100, rating: 4.5, students: 410, duration: "5 weeks", image: "🗄️", tags: ["SQL", "PostgreSQL", "Database"], mode: "in-person", location: { address: "DataMinds Institute, Street 15, Khartoum North", lat: 15.6031, lng: 32.5265, mapUrl: "https://maps.google.com/?q=15.6031,32.5265" } },
  { id: 6, title: "Data Visualization with Power BI", instructor: "Fatima Al-Rashid", center: "DataMinds Institute", category: "Data Science", level: "Intermediate", price: 180, rating: 4.8, students: 155, duration: "7 weeks", image: "📊", tags: ["Power BI", "DAX", "Analytics"], mode: "hybrid", meetLink: "https://zoom.us/j/powerbi789", groupLink: "https://chat.whatsapp.com/masar-powerbi", location: { address: "DataMinds Institute, Street 15, Khartoum North", lat: 15.6031, lng: 32.5265, mapUrl: "https://maps.google.com/?q=15.6031,32.5265" } },
  { id: 7, title: "Algorithms & Data Structures", instructor: "Yousif Abdalla", center: null, category: "Computer Science", level: "Advanced", price: 200, rating: 4.9, students: 140, duration: "9 weeks", image: "⚡", tags: ["Algorithms", "C++", "Problem Solving"], mode: "online", meetLink: "https://zoom.us/j/algo2025", groupLink: "https://t.me/masar_algorithms" },
  { id: 8, title: "Mobile App Development", instructor: "Nada Gamar", center: "TechHub Khartoum", category: "Programming", level: "Intermediate", price: 220, rating: 4.7, students: 175, duration: "10 weeks", image: "📱", tags: ["Flutter", "Dart", "Mobile"], mode: "in-person", location: { address: "TechHub Khartoum, Omdurman, Al-Morada St.", lat: 15.6445, lng: 32.4777, mapUrl: "https://maps.google.com/?q=15.6445,32.4777" } },
];

const INSTRUCTORS = [
  { id: 1, name: "Ahmed Hassan", title: "Data Scientist", center: "Code Academy Sudan", courses: 4, students: 850, rating: 4.8, bio: "5+ years in data science, ex-Google", specialties: ["Python", "Machine Learning", "Statistics"], avatar: "AH" },
  { id: 2, name: "Sara Mohamed", title: "Full Stack Developer", center: "TechHub Khartoum", courses: 3, students: 620, rating: 4.9, bio: "Senior dev, built 30+ production apps", specialties: ["React", "Node.js", "Cloud"], avatar: "SM" },
  { id: 3, name: "Khalid Ibrahim", title: "ML Engineer", center: "Code Academy Sudan", courses: 2, students: 400, rating: 4.7, bio: "PhD candidate, AI research at U of K", specialties: ["TensorFlow", "Deep Learning", "NLP"], avatar: "KI" },
  { id: 4, name: "Amira Osman", title: "UX Designer", center: null, courses: 2, students: 510, rating: 4.6, bio: "Freelance designer with international clients", specialties: ["Figma", "UX Research", "Prototyping"], avatar: "AO" },
  { id: 5, name: "Omar Salih", title: "Database Architect", center: "DataMinds Institute", courses: 3, students: 780, rating: 4.5, bio: "10 years in enterprise database systems", specialties: ["SQL", "PostgreSQL", "Redis"], avatar: "OS" },
  { id: 6, name: "Fatima Al-Rashid", title: "Business Intelligence Analyst", center: "DataMinds Institute", courses: 2, students: 320, rating: 4.8, bio: "BI consultant for top Sudanese companies", specialties: ["Power BI", "Tableau", "DAX"], avatar: "FA" },
];

const CENTERS = [
  { id: 1, name: "Code Academy Sudan", slug: "code-academy", tagline: "Where Sudanese Developers Begin", courses: 12, instructors: 8, students: 2400, rating: 4.8, founded: 2018, location: "Khartoum", specialties: ["Data Science", "Programming", "AI"], logo: "CA", color: "#6366f1" },
  { id: 2, name: "TechHub Khartoum", slug: "techhub", tagline: "Building Tomorrow's Tech Leaders", courses: 9, instructors: 6, students: 1800, rating: 4.9, founded: 2019, location: "Omdurman", specialties: ["Web Dev", "Mobile", "Cloud"], logo: "TH", color: "#06b6d4" },
  { id: 3, name: "DataMinds Institute", slug: "dataminds", tagline: "Turning Data into Decisions", courses: 7, instructors: 5, students: 1200, rating: 4.7, founded: 2020, location: "Khartoum North", specialties: ["Data Analysis", "BI", "SQL"], logo: "DM", color: "#8b5cf6" },
];

const COURSE_DETAILS = {
  1: {
    startDate: "March 10, 2025", enrollDeadline: "March 7, 2025",
    schedule: [{ day: "Saturday", time: "10:00 AM – 12:00 PM", type: "Live Lecture" }, { day: "Tuesday", time: "06:00 PM – 07:30 PM", type: "Lab / Practice" }],
    videoId: "rfscVS0vtbw",
    about: "This course takes you from zero Python knowledge to building real data pipelines and analysis reports. Perfect for Sudanese students looking to enter the data industry, covering everything from syntax basics to advanced Pandas operations and data storytelling.",
    curriculum: [
      { week: 1, title: "Python Foundations", topics: ["Variables & types", "Control flow", "Functions"] },
      { week: 2, title: "Data Structures", topics: ["Lists, dicts, sets", "Comprehensions", "File I/O"] },
      { week: 3, title: "NumPy Essentials", topics: ["Arrays & math ops", "Broadcasting", "Random module"] },
      { week: 4, title: "Pandas Deep Dive", topics: ["DataFrames", "Groupby & pivot", "Merge & join"] },
      { week: 5, title: "Data Cleaning", topics: ["Missing values", "Outlier detection", "Type conversion"] },
      { week: 6, title: "Visualization", topics: ["Matplotlib", "Seaborn", "Plotly basics"] },
      { week: 7, title: "Exploratory Analysis", topics: ["EDA workflow", "Correlation", "Feature insights"] },
      { week: 8, title: "Capstone Project", topics: ["Real dataset", "Full report", "Presentation"] },
    ],
    reviews: [
      { name: "Reem Saad", avatar: "RS", rating: 5, date: "Jan 2025", text: "Best Python course I've ever taken. Ahmed explains everything clearly and the labs are super practical. Got a data analyst internship right after!" },
      { name: "Tariq Hassan", avatar: "TH", rating: 5, date: "Dec 2024", text: "The curriculum is very well structured. I had zero coding experience and now I can build full data reports. Highly recommended." },
      { name: "Lina Omar", avatar: "LO", rating: 4, date: "Dec 2024", text: "Great content and instructor. The only thing I'd improve is adding more real-world Sudanese datasets for practice." },
      { name: "Mustafa Ali", avatar: "MA", rating: 5, date: "Nov 2024", text: "Ahmed is incredibly patient and responsive. The WhatsApp group support was also a huge bonus." },
    ],
  },
  2: {
    startDate: "April 1, 2025", enrollDeadline: "March 28, 2025",
    schedule: [{ day: "Friday", time: "09:00 AM – 11:30 AM", type: "Live Lecture" }, { day: "Wednesday", time: "07:00 PM – 09:00 PM", type: "Project Review" }],
    videoId: "nu_pCVPKzTk",
    about: "A comprehensive full-stack bootcamp covering React on the frontend and Node.js/MongoDB on the backend. By the end you'll have deployed three production-grade applications and be ready for junior developer roles.",
    curriculum: [
      { week: 1, title: "HTML & CSS Mastery", topics: ["Semantic HTML", "Flexbox & Grid", "Responsive design"] },
      { week: 2, title: "JavaScript ES6+", topics: ["Arrow fns", "Promises", "Destructuring"] },
      { week: 3, title: "React Fundamentals", topics: ["Components", "State & props", "Hooks"] },
      { week: 4, title: "React Advanced", topics: ["Context API", "React Router", "Performance"] },
      { week: 5, title: "Node.js & Express", topics: ["REST APIs", "Middleware", "Auth with JWT"] },
      { week: 6, title: "MongoDB & Mongoose", topics: ["Schema design", "CRUD ops", "Aggregation"] },
      { week: 7, title: "Deployment", topics: ["Vercel/Railway", "CI/CD basics", "Docker intro"] },
      { week: 8, title: "Project 1: Blog Platform", topics: ["Full CRUD", "Auth flow", "Deployment"] },
      { week: 9, title: "Project 2: E-Commerce", topics: ["Cart system", "Payment mock", "Admin panel"] },
      { week: 10, title: "Project 3: Social App", topics: ["Real-time", "File uploads", "Final review"] },
      { week: 11, title: "Career Preparation", topics: ["Portfolio polish", "GitHub profile", "Interview prep"] },
      { week: 12, title: "Graduation & Demo Day", topics: ["Live presentations", "Feedback session", "Certificates"] },
    ],
    reviews: [
      { name: "Adam Khalil", avatar: "AK", rating: 5, date: "Feb 2025", text: "Sara is an exceptional teacher. The course structure is perfect — theory + immediate practice. I landed a job before the course even ended!" },
      { name: "Hiba Musa", avatar: "HM", rating: 5, date: "Jan 2025", text: "The projects are real and challenging. By week 6 I was already building things I'm proud to show employers." },
      { name: "Omar Fadl", avatar: "OF", rating: 4, date: "Dec 2024", text: "Very comprehensive. Some weeks are intense but that's what it takes. Sara and the TAs are always available to help." },
    ],
  },
  3: {
    startDate: "March 20, 2025", enrollDeadline: "March 17, 2025",
    schedule: [{ day: "Sunday", time: "05:00 PM – 07:30 PM", type: "Live Lecture" }, { day: "Thursday", time: "06:00 PM – 07:30 PM", type: "Lab / Coding" }],
    videoId: "GwIo3gDZCVQ",
    about: "A rigorous introduction to machine learning theory and practice. Covers supervised and unsupervised learning, model evaluation, and deployment basics using Python's top ML libraries.",
    curriculum: [
      { week: 1, title: "ML Foundations", topics: ["What is ML?", "Types of learning", "Math review"] },
      { week: 2, title: "Linear Models", topics: ["Linear regression", "Logistic regression", "Cost functions"] },
      { week: 3, title: "Decision Trees & Ensembles", topics: ["Decision trees", "Random Forest", "XGBoost"] },
      { week: 4, title: "Support Vector Machines", topics: ["SVM theory", "Kernels", "Hyperparameter tuning"] },
      { week: 5, title: "Unsupervised Learning", topics: ["K-Means", "DBSCAN", "PCA"] },
      { week: 6, title: "Neural Networks Intro", topics: ["Perceptrons", "Backprop", "Activation fns"] },
      { week: 7, title: "Deep Learning Basics", topics: ["CNN overview", "RNN overview", "Transfer learning"] },
      { week: 8, title: "Model Evaluation", topics: ["Cross-validation", "Metrics", "Bias-variance"] },
      { week: 9, title: "Feature Engineering", topics: ["Encoding", "Scaling", "Selection"] },
      { week: 10, title: "Capstone Project", topics: ["End-to-end pipeline", "Model deployment", "Presentation"] },
    ],
    reviews: [
      { name: "Salma Idris", avatar: "SI", rating: 5, date: "Feb 2025", text: "Khalid explains the math in a way that actually makes sense. I've tried other ML courses but this one clicked for me." },
      { name: "Yassir Nour", avatar: "YN", rating: 4, date: "Jan 2025", text: "Very thorough. The capstone project was a real confidence booster — I built a sentiment analysis model for Sudanese dialect!" },
    ],
  },
  4: { startDate: "March 15, 2025", enrollDeadline: "March 12, 2025", schedule: [{ day: "Saturday", time: "02:00 PM – 04:00 PM", type: "Live Lecture" }], videoId: "c9Wg6Cb_YlU", about: "Learn the full UX design process from research to high-fidelity prototypes. Hands-on with Figma throughout.", curriculum: [{ week: 1, title: "UX Fundamentals", topics: ["Design thinking", "User research", "Personas"] }, { week: 2, title: "Wireframing", topics: ["Sketching", "Lo-fi wireframes", "User flows"] }, { week: 3, title: "Figma Basics", topics: ["Components", "Auto-layout", "Styles"] }, { week: 4, title: "Hi-Fi Prototyping", topics: ["Visual design", "Interactions", "Animations"] }, { week: 5, title: "Usability Testing", topics: ["Test planning", "Conducting sessions", "Iteration"] }, { week: 6, title: "Portfolio Project", topics: ["Full case study", "Presentation", "Feedback"] }], reviews: [{ name: "Nour Babiker", avatar: "NB", rating: 5, date: "Jan 2025", text: "Amira's teaching style is incredible. My portfolio improved dramatically after this course." }, { name: "Ayman Osman", avatar: "AO2", rating: 4, date: "Dec 2024", text: "Great course for anyone wanting to break into tech without coding. Practical and industry-relevant." }] },
  5: { startDate: "April 5, 2025", enrollDeadline: "April 2, 2025", schedule: [{ day: "Monday", time: "07:00 PM – 09:00 PM", type: "Live Lecture" }, { day: "Thursday", time: "07:00 PM – 08:30 PM", type: "Lab" }], videoId: "HXV3zeQKqGY", about: "Master relational database design and SQL from ground up. Covers everything from basic queries to complex joins, stored procedures, and performance optimization.", curriculum: [{ week: 1, title: "Database Concepts", topics: ["Relational model", "ER diagrams", "Normalization"] }, { week: 2, title: "SQL Basics", topics: ["SELECT", "WHERE", "ORDER BY"] }, { week: 3, title: "Joins & Subqueries", topics: ["INNER/OUTER joins", "Subqueries", "CTEs"] }, { week: 4, title: "Data Manipulation", topics: ["INSERT/UPDATE/DELETE", "Transactions", "Constraints"] }, { week: 5, title: "Performance & Indexing", topics: ["Query optimization", "Indexes", "Execution plans"] }], reviews: [{ name: "Ibrahim Salih", avatar: "IS", rating: 5, date: "Feb 2025", text: "Omar knows databases deeply. The real-world examples made everything stick. Now I can write complex queries confidently." }, { name: "Duaa Mahdi", avatar: "DM2", rating: 4, date: "Jan 2025", text: "Very structured course. Perfect pacing for beginners. The lab exercises really reinforce the theory." }] },
  6: { startDate: "March 25, 2025", enrollDeadline: "March 22, 2025", schedule: [{ day: "Sunday", time: "10:00 AM – 12:00 PM", type: "Live Workshop" }], videoId: "yuwKcZ2jjhE", about: "Transform raw data into powerful dashboards and business insights using Power BI. Covers DAX, data modeling, and storytelling for business stakeholders.", curriculum: [{ week: 1, title: "Power BI Interface", topics: ["Data import", "Navigation", "Report canvas"] }, { week: 2, title: "Data Modeling", topics: ["Relationships", "Star schema", "Calculated columns"] }, { week: 3, title: "DAX Fundamentals", topics: ["Measures", "CALCULATE", "Time intelligence"] }, { week: 4, title: "Visualizations", topics: ["Chart types", "Slicers", "Drill-through"] }, { week: 5, title: "Advanced DAX", topics: ["RANKX", "TOPN", "Dynamic titles"] }, { week: 6, title: "Publishing & Sharing", topics: ["Power BI Service", "Row-level security", "Dashboards"] }, { week: 7, title: "Capstone Project", topics: ["Business dataset", "Full dashboard", "Presentation"] }], reviews: [{ name: "Widad Ahmad", avatar: "WA", rating: 5, date: "Jan 2025", text: "Fatima makes Power BI feel easy. I went from zero to building executive dashboards in 7 weeks!" }, { name: "Kareem Bakri", avatar: "KB", rating: 5, date: "Dec 2024", text: "The DAX sessions are gold. Fatima explains the logic behind every formula — not just how to write it." }] },
  7: { startDate: "April 10, 2025", enrollDeadline: "April 7, 2025", schedule: [{ day: "Friday", time: "04:00 PM – 06:30 PM", type: "Live Lecture" }, { day: "Tuesday", time: "05:00 PM – 06:30 PM", type: "Problem Solving" }], videoId: "8hly31xKli0", about: "A serious algorithms course for competitive programmers and software engineering interview prep. Covers all major data structures and algorithm design paradigms.", curriculum: [{ week: 1, title: "Complexity Analysis", topics: ["Big-O", "Space complexity", "Amortized"] }, { week: 2, title: "Arrays & Strings", topics: ["Two pointers", "Sliding window", "String manipulation"] }, { week: 3, title: "Linked Lists & Stacks", topics: ["Singly/doubly linked", "Stack applications", "Queue with stacks"] }, { week: 4, title: "Trees & Recursion", topics: ["Binary trees", "BST", "DFS/BFS"] }, { week: 5, title: "Heaps", topics: ["Min/max heap", "Heap sort", "k-th element"] }, { week: 6, title: "Graphs", topics: ["Representation", "Dijkstra", "Topological sort"] }, { week: 7, title: "Dynamic Programming", topics: ["Memoization", "Tabulation", "Classic DP"] }, { week: 8, title: "Greedy & Backtracking", topics: ["Greedy patterns", "Backtracking", "N-Queens"] }, { week: 9, title: "Mock Interviews", topics: ["Live sessions", "Code review", "Feedback"] }], reviews: [{ name: "Faris Elamin", avatar: "FE", rating: 5, date: "Feb 2025", text: "Yousif is brilliant. I passed my Amazon OA after this course." }, { name: "Sana Babiker", avatar: "SB", rating: 5, date: "Jan 2025", text: "Hardest but most rewarding course I've taken. The problem-solving sessions are where the real learning happens." }] },
  8: { startDate: "April 15, 2025", enrollDeadline: "April 12, 2025", schedule: [{ day: "Saturday", time: "11:00 AM – 01:00 PM", type: "Live Lecture" }, { day: "Wednesday", time: "06:00 PM – 07:30 PM", type: "Code Review" }], videoId: "VPvVD8t02U8", about: "Build beautiful cross-platform mobile apps for iOS and Android using Flutter and Dart. From widgets to state management to app store deployment.", curriculum: [{ week: 1, title: "Dart Language", topics: ["Syntax", "OOP in Dart", "Async/await"] }, { week: 2, title: "Flutter Basics", topics: ["Widgets", "Layout", "Hot reload"] }, { week: 3, title: "Navigation", topics: ["Push/pop", "Named routes", "Deep linking"] }, { week: 4, title: "State Management", topics: ["setState", "Provider", "Riverpod"] }, { week: 5, title: "Firebase", topics: ["Auth", "Firestore", "Storage"] }, { week: 6, title: "APIs & Networking", topics: ["HTTP package", "JSON parsing", "Error handling"] }, { week: 7, title: "Publishing", topics: ["Play Store", "App Store", "Signing"] }, { week: 8, title: "App 1: Task Manager", topics: ["CRUD", "Local storage", "Polish"] }, { week: 9, title: "App 2: Chat App", topics: ["Real-time", "Firebase", "Final demo"] }, { week: 10, title: "Demo Day", topics: ["Live presentation", "Peer review", "Certificates"] }], reviews: [{ name: "Zeinab Musa", avatar: "ZM", rating: 5, date: "Feb 2025", text: "Nada is a fantastic teacher. I published my first app to the Play Store during week 8!" }, { name: "Haitham Samir", avatar: "HS", rating: 4, date: "Jan 2025", text: "The Flutter content is excellent. Great course overall." }] },
};

const INSTRUCTOR_DETAILS = {
  1: { fullBio: "Ahmed Hassan is a data scientist with 5+ years of professional experience, previously at Google and currently leading the data team at a Khartoum-based fintech. He holds an MSc in Computer Science from University of Khartoum and has trained 850+ students.", linkedin: "linkedin.com/in/ahmed-hassan-ds", github: "github.com/ahmedhassan-ds", achievements: ["Ex-Google Data Scientist", "MSc CS — University of Khartoum", "850+ students trained", "4 courses on Masar"] },
  2: { fullBio: "Sara Mohamed is a senior full stack developer with 7 years of experience building production applications for clients in Sudan, UAE, and Germany. She runs Khartoum's largest developer meetup.", linkedin: "linkedin.com/in/sara-dev", github: "github.com/saramohamed-dev", achievements: ["7 years industry experience", "30+ production apps shipped", "Khartoum Dev Meetup founder", "3 courses on Masar"] },
  3: { fullBio: "Khalid Ibrahim is a PhD candidate in AI at the University of Khartoum, researching NLP for Arabic dialects. He has published 3 papers and collaborated with international research teams.", linkedin: "linkedin.com/in/khalid-ml", github: "github.com/khalid-ibrahim-ml", achievements: ["PhD candidate in AI — U of K", "3 published research papers", "NLP for Sudanese Arabic researcher", "2 courses on Masar"] },
  4: { fullBio: "Amira Osman is a freelance UX designer with 6 years of experience creating user-centered digital products for startups and NGOs across Sudan and East Africa.", linkedin: "linkedin.com/in/amira-ux", github: null, achievements: ["Google UX Design Certified", "6 years freelance experience", "Clients in Sudan & East Africa", "2 courses on Masar"] },
  5: { fullBio: "Omar Salih is a database architect with a decade of experience designing enterprise data systems for Sudanese banks, telecoms, and government institutions. Oracle and Microsoft certified.", linkedin: "linkedin.com/in/omar-db", github: "github.com/omar-salih", achievements: ["Oracle DB Certified", "Microsoft SQL Server Expert", "10 years enterprise experience", "3 courses on Masar"] },
  6: { fullBio: "Fatima Al-Rashid is a BI consultant who has delivered data transformation projects for Sudan's top corporations. She specializes in Power BI strategy and DAX.", linkedin: "linkedin.com/in/fatima-bi", github: null, achievements: ["BI Consultant — top Sudanese firms", "Microsoft Power BI Certified", "DAX expert & trainer", "2 courses on Masar"] },
};

const STATS = [
  { label: "Active Students", value: "12,000+", icon: "👨‍💻" },
  { label: "Courses Available", value: "150+", icon: "📚" },
  { label: "Training Centers", value: "25+", icon: "🏢" },
  { label: "Expert Instructors", value: "80+", icon: "🎓" },
];

const FEATURES = [
  { icon: "🎯", title: "Personalized Learning", desc: "Your dashboard adapts to your specialization and interests — get course recommendations tailored just for you." },
  { icon: "🏫", title: "Verified Training Centers", desc: "Every center on Masar is verified with full profiles, so you know exactly who you're learning from." },
  { icon: "🌍", title: "Your Own Space", desc: "Centers and instructors get a dedicated page with custom domain — build your brand, not just a listing." },
  { icon: "📈", title: "Career-Focused Tracks", desc: "Courses designed around real job market needs in Sudan: CS, Data Science, Programming, and more." },
  { icon: "🔍", title: "Total Transparency", desc: "Full course details, real student reviews, instructor credentials — no surprises." },
  { icon: "🤝", title: "Community & Network", desc: "Connect with peers, instructors, and industry professionals across Sudan's growing tech ecosystem." },
];

// ============================================================
// STYLES (injected)
// ============================================================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --indigo: #6366f1;
    --indigo-dark: #4f46e5;
    --indigo-light: #818cf8;
    --cyan: #06b6d4;
    --cyan-dark: #0891b2;
    --bg: #0a0a0f;
    --bg2: #111118;
    --bg3: #1a1a2e;
    --surface: #16161f;
    --surface2: #1e1e2e;
    --border: rgba(99,102,241,0.15);
    --border2: rgba(255,255,255,0.06);
    --text: #f0f0f8;
    --text2: #a0a0b8;
    --text3: #606078;
    --gradient: linear-gradient(135deg, var(--indigo) 0%, var(--cyan) 100%);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--indigo); border-radius: 3px; }

  /* NAVBAR */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%;
    height: 68px;
    background: rgba(10,10,15,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border2);
    transition: all 0.3s;
  }
  .nav.scrolled { background: rgba(10,10,15,0.97); border-bottom-color: var(--border); }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 1.5rem;
    background: var(--gradient);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    cursor: pointer;
  }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    color: var(--text2); text-decoration: none; font-size: 0.9rem;
    font-weight: 500; transition: color 0.2s; cursor: pointer;
  }
  .nav-links a:hover { color: var(--text); }
  .nav-links a.active { color: var(--indigo-light); }
  .nav-actions { display: flex; gap: 0.75rem; align-items: center; }
  .btn {
    padding: 0.5rem 1.25rem; border-radius: 8px; font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
    border: none; outline: none;
  }
  .btn-ghost {
    background: transparent; color: var(--text2);
    border: 1px solid var(--border2);
  }
  .btn-ghost:hover { border-color: var(--indigo); color: var(--text); }
  .btn-primary {
    background: var(--gradient); color: white;
  }
  .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.35); }
  .btn-lg { padding: 0.75rem 2rem; font-size: 1rem; border-radius: 10px; }
  .nav-user {
    display: flex; align-items: center; gap: 0.5rem;
    cursor: pointer; padding: 0.3rem 0.75rem 0.3rem 0.3rem;
    border-radius: 100px; border: 1px solid var(--border2);
    transition: border-color 0.2s;
  }
  .nav-user:hover { border-color: var(--indigo); }
  .nav-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: var(--gradient); display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.7rem; color: white;
  }
  .nav-username { font-size: 0.85rem; font-weight: 500; color: var(--text); }
  .btn-outline {
    background: transparent; color: var(--indigo-light);
    border: 1.5px solid var(--indigo);
  }
  .btn-outline:hover { background: rgba(99,102,241,0.1); }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden; padding: 100px 5% 60px;
    text-align: center;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%),
                radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.1) 0%, transparent 60%);
  }
  .hero-grid {
    position: absolute; inset: 0; z-index: 0;
    background-image: linear-gradient(var(--border2) 1px, transparent 1px),
                      linear-gradient(90deg, var(--border2) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
  }
  .hero-content { position: relative; z-index: 1; max-width: 800px; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.4rem 1rem; border-radius: 100px;
    background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.3);
    font-size: 0.8rem; color: var(--indigo-light); font-weight: 500;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.6s ease both;
  }
  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800; line-height: 1.1;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.6s ease 0.1s both;
  }
  .hero h1 span {
    background: var(--gradient);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero p {
    font-size: 1.15rem; color: var(--text2); max-width: 560px;
    margin: 0 auto 2.5rem; line-height: 1.7;
    animation: fadeUp 0.6s ease 0.2s both;
  }
  .hero-actions {
    display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
    animation: fadeUp 0.6s ease 0.3s both;
  }
  .hero-stats {
    display: flex; gap: 3rem; justify-content: center; flex-wrap: wrap;
    margin-top: 5rem; padding-top: 3rem; border-top: 1px solid var(--border2);
    animation: fadeUp 0.6s ease 0.4s both;
  }
  .hero-stat { text-align: center; }
  .hero-stat-value {
    font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800;
    background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero-stat-label { font-size: 0.85rem; color: var(--text3); margin-top: 0.25rem; }

  /* SECTION */
  .section { padding: 80px 5%; }
  .section-header { text-align: center; margin-bottom: 3rem; }
  .section-tag {
    display: inline-block; font-size: 0.75rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--cyan); margin-bottom: 0.75rem;
  }
  .section-title {
    font-family: 'Syne', sans-serif; font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 700; margin-bottom: 1rem;
  }
  .section-sub { color: var(--text2); font-size: 1rem; max-width: 500px; margin: 0 auto; line-height: 1.7; }

  /* FEATURES */
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5px; background: var(--border2); border-radius: 16px; overflow: hidden;
  }
  .feature-card {
    background: var(--surface); padding: 2rem;
    transition: background 0.2s;
  }
  .feature-card:hover { background: var(--surface2); }
  .feature-icon { font-size: 2rem; margin-bottom: 1rem; }
  .feature-title { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; }
  .feature-desc { color: var(--text2); font-size: 0.875rem; line-height: 1.7; }

  /* COURSES */
  .filters {
    display: flex; gap: 0.5rem; flex-wrap: wrap;
    justify-content: center; margin-bottom: 2.5rem;
  }
  .filter-btn {
    padding: 0.4rem 1rem; border-radius: 100px;
    border: 1px solid var(--border2); background: transparent;
    color: var(--text2); font-size: 0.8rem; cursor: pointer;
    transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .filter-btn:hover { border-color: var(--indigo); color: var(--text); }
  .filter-btn.active { background: var(--indigo); border-color: var(--indigo); color: white; }
  .courses-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 1.25rem;
  }
  .course-card {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 14px; overflow: hidden;
    transition: all 0.25s; cursor: pointer;
  }
  .course-card:hover { transform: translateY(-4px); border-color: var(--border); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
  .course-cover {
    height: 120px; display: flex; align-items: center; justify-content: center;
    font-size: 3.5rem;
    background: linear-gradient(135deg, var(--bg3) 0%, var(--surface2) 100%);
    position: relative;
  }
  .course-level {
    position: absolute; top: 0.75rem; right: 0.75rem;
    padding: 0.2rem 0.6rem; border-radius: 100px;
    font-size: 0.7rem; font-weight: 600;
    background: rgba(0,0,0,0.5); color: var(--cyan);
    border: 1px solid rgba(6,182,212,0.3);
  }
  .course-body { padding: 1.25rem; }
  .course-meta { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
  .course-center { font-size: 0.75rem; color: var(--indigo-light); font-weight: 500; }
  .course-title { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.4; }
  .course-instructor { font-size: 0.8rem; color: var(--text3); margin-bottom: 1rem; }
  .course-tags { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .tag {
    padding: 0.2rem 0.6rem; border-radius: 100px;
    background: rgba(99,102,241,0.1); color: var(--indigo-light);
    font-size: 0.7rem; font-weight: 500;
  }
  .course-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 1rem; border-top: 1px solid var(--border2);
  }
  .course-price {
    font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700;
    color: var(--cyan);
  }
  .course-rating { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; }
  .stars { color: #fbbf24; }
  .course-students { font-size: 0.75rem; color: var(--text3); }

  /* INSTRUCTORS */
  .instructors-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.25rem;
  }
  .instructor-card {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 14px; padding: 1.5rem;
    transition: all 0.25s; cursor: pointer;
  }
  .instructor-card:hover { transform: translateY(-4px); border-color: var(--border); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
  .instructor-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  .avatar {
    width: 52px; height: 52px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 0.95rem;
    background: var(--gradient); color: white; flex-shrink: 0;
  }
  .instructor-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; }
  .instructor-title { font-size: 0.8rem; color: var(--indigo-light); }
  .instructor-center { font-size: 0.75rem; color: var(--text3); }
  .instructor-bio { font-size: 0.85rem; color: var(--text2); line-height: 1.6; margin-bottom: 1rem; }
  .instructor-stats { display: flex; gap: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border2); }
  .i-stat { text-align: center; }
  .i-stat-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; color: var(--text); }
  .i-stat-lbl { font-size: 0.7rem; color: var(--text3); }
  .specialties { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1rem; }

  /* CENTERS */
  .centers-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }
  .center-card {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 16px; overflow: hidden;
    transition: all 0.25s; cursor: pointer;
  }
  .center-card:hover { transform: translateY(-4px); border-color: var(--border); box-shadow: 0 24px 48px rgba(0,0,0,0.5); }
  .center-header { padding: 1.75rem; position: relative; overflow: hidden; }
  .center-logo {
    width: 56px; height: 56px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1rem;
    color: white; margin-bottom: 1rem;
  }
  .center-name { font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 800; margin-bottom: 0.25rem; }
  .center-tagline { font-size: 0.85rem; color: var(--text2); }
  .center-glow {
    position: absolute; top: -40px; right: -40px;
    width: 120px; height: 120px; border-radius: 50%; opacity: 0.12;
    filter: blur(30px);
  }
  .center-body { padding: 1.25rem 1.75rem; border-top: 1px solid var(--border2); }
  .center-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.25rem; }
  .c-stat { text-align: center; }
  .c-stat-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.1rem; }
  .c-stat-lbl { font-size: 0.7rem; color: var(--text3); }
  .center-specs { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
  .spec-tag {
    padding: 0.2rem 0.6rem; border-radius: 100px;
    background: rgba(6,182,212,0.1); color: var(--cyan);
    font-size: 0.7rem; font-weight: 500;
  }
  .center-meta { display: flex; justify-content: space-between; align-items: center; }
  .center-location { font-size: 0.8rem; color: var(--text3); }
  .center-rating { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; }

  /* DASHBOARD */
  .dashboard { padding: 100px 5% 60px; min-height: 100vh; }
  .dash-header { margin-bottom: 2rem; }
  .dash-welcome { font-family: 'Syne', sans-serif; font-size: 1.75rem; font-weight: 800; margin-bottom: 0.25rem; }
  .dash-sub { color: var(--text2); font-size: 0.9rem; }
  .dash-grid { display: grid; grid-template-columns: 300px 1fr; gap: 1.5rem; }
  .dash-sidebar { display: flex; flex-direction: column; gap: 1.25rem; }
  .profile-card {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 14px; padding: 1.5rem; text-align: center;
  }
  .profile-avatar {
    width: 72px; height: 72px; border-radius: 50%;
    background: var(--gradient); display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem;
    color: white; margin: 0 auto 1rem;
  }
  .profile-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.1rem; margin-bottom: 0.25rem; }
  .profile-role { font-size: 0.8rem; color: var(--indigo-light); }
  .profile-spec { font-size: 0.85rem; color: var(--text2); margin-top: 0.5rem; }
  .profile-progress { margin-top: 1rem; }
  .progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.4rem; }
  .progress-bar { height: 6px; background: var(--bg3); border-radius: 100px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--gradient); border-radius: 100px; }
  .sidebar-card {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 14px; padding: 1.25rem;
  }
  .sidebar-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.95rem; margin-bottom: 1rem; }
  .interest-tag {
    display: inline-block; margin: 0.2rem;
    padding: 0.3rem 0.7rem; border-radius: 100px;
    background: rgba(99,102,241,0.12); color: var(--indigo-light);
    font-size: 0.75rem; font-weight: 500;
    border: 1px solid rgba(99,102,241,0.2);
  }
  .dash-main { display: flex; flex-direction: column; gap: 1.5rem; }
  .dash-section-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.05rem; margin-bottom: 1rem; }
  .enrolled-card {
    display: flex; gap: 1rem; align-items: center;
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 12px; padding: 1rem;
    transition: border-color 0.2s;
  }
  .enrolled-card:hover { border-color: var(--border); }
  .enrolled-icon { font-size: 2rem; flex-shrink: 0; }
  .enrolled-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem; }
  .enrolled-instructor { font-size: 0.8rem; color: var(--text3); margin-bottom: 0.75rem; }
  .enrolled-footer { display: flex; align-items: center; gap: 1rem; }
  .enrolled-progress-text { font-size: 0.75rem; color: var(--cyan); font-weight: 600; }
  .rec-card {
    display: flex; justify-content: space-between; align-items: center;
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 12px; padding: 1rem;
    transition: border-color 0.2s; gap: 1rem;
  }
  .rec-card:hover { border-color: var(--border); }
  .rec-left { display: flex; gap: 0.75rem; align-items: center; }
  .rec-icon { font-size: 1.75rem; }
  .rec-title { font-weight: 600; font-size: 0.9rem; }
  .rec-meta { font-size: 0.75rem; color: var(--text3); }
  .rec-price { font-family: 'Syne', sans-serif; font-weight: 700; color: var(--cyan); font-size: 1rem; flex-shrink: 0; }

  /* CENTER PAGE */
  .center-page { padding: 100px 5% 60px; min-height: 100vh; }
  .center-hero {
    border-radius: 20px; padding: 3rem;
    background: var(--surface); border: 1px solid var(--border2);
    position: relative; overflow: hidden; margin-bottom: 2rem;
  }
  .center-hero-content { position: relative; z-index: 1; }
  .center-hero-glow {
    position: absolute; top: -60px; right: -60px;
    width: 250px; height: 250px; border-radius: 50%;
    opacity: 0.1; filter: blur(60px);
  }
  .big-logo {
    width: 72px; height: 72px; border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem;
    color: white; margin-bottom: 1.25rem;
  }
  .center-hero-name { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; margin-bottom: 0.4rem; }
  .center-hero-tag { font-size: 1rem; color: var(--text2); margin-bottom: 2rem; }
  .center-hero-stats { display: flex; gap: 3rem; flex-wrap: wrap; }
  .ch-stat-val { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; }
  .ch-stat-lbl { font-size: 0.8rem; color: var(--text3); }

  /* AUTH */
  .auth-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 100px 5% 60px;
  }
  .auth-card {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 20px; padding: 2.5rem;
    width: 100%; max-width: 420px;
  }
  .auth-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.5rem; background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
  .auth-title { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; }
  .auth-sub { color: var(--text2); font-size: 0.875rem; margin-bottom: 2rem; }
  .role-selector { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; margin-bottom: 1.5rem; }
  .role-btn {
    padding: 0.75rem; border-radius: 10px; border: 1.5px solid var(--border2);
    background: transparent; color: var(--text2); cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.8rem; transition: all 0.2s;
    text-align: center;
  }
  .role-btn:hover { border-color: var(--indigo); color: var(--text); }
  .role-btn.selected { background: rgba(99,102,241,0.12); border-color: var(--indigo); color: var(--indigo-light); }
  .role-icon { font-size: 1.25rem; display: block; margin-bottom: 0.25rem; }
  .form-group { margin-bottom: 1rem; }
  .form-label { display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--text2); }
  .form-input {
    width: 100%; padding: 0.7rem 1rem; border-radius: 8px;
    background: var(--bg); border: 1.5px solid var(--border2);
    color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
    outline: none; transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--indigo); }
  .form-input::placeholder { color: var(--text3); }
  .input-error { border-color: #f87171 !important; }
  .auth-footer { text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: var(--text2); }
  .auth-link { color: var(--indigo-light); cursor: pointer; font-weight: 500; }

  /* FOOTER */
  .footer {
    background: var(--surface); border-top: 1px solid var(--border2);
    padding: 3rem 5% 2rem;
  }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 2rem; }
  .footer-brand-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.4rem; background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.75rem; }
  .footer-desc { color: var(--text2); font-size: 0.85rem; line-height: 1.7; max-width: 260px; }
  .footer-heading { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.9rem; margin-bottom: 1rem; }
  .footer-links { list-style: none; }
  .footer-links li { margin-bottom: 0.6rem; }
  .footer-links a { color: var(--text2); text-decoration: none; font-size: 0.85rem; cursor: pointer; transition: color 0.2s; }
  .footer-links a:hover { color: var(--indigo-light); }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid var(--border2); }
  .footer-copy { font-size: 0.8rem; color: var(--text3); }
  .footer-made { font-size: 0.8rem; color: var(--text3); }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  .float { animation: float 4s ease-in-out infinite; }

  /* DIVIDER */
  .divider { height: 1px; background: var(--border2); margin: 0; }

  /* CARD ROW */
  .enrolled-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .rec-list { display: flex; flex-direction: column; gap: 0.75rem; }

  /* GLOW ORBS */
  .orb {
    position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; opacity: 0.08;
  }



  /* ===== INSTRUCTOR DASHBOARD ===== */
  .inst-dash { padding: 88px 0 0; min-height: 100vh; display: flex; flex-direction: column; background: var(--bg); }

  /* Top bar */
  .inst-topbar { background: var(--surface); border-bottom: 1px solid var(--border2); padding: 0 5%; display: flex; align-items: center; gap: 0; }
  .inst-tab { padding: 1rem 1.25rem; font-size: 0.85rem; font-weight: 500; color: var(--text3); cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap; display: flex; align-items: center; gap: 0.4rem; }
  .inst-tab:hover { color: var(--text2); }
  .inst-tab.active { color: var(--indigo-light); border-bottom-color: var(--indigo); font-weight: 600; }
  .inst-tab .tab-badge { background: var(--indigo); color: white; font-size: 0.65rem; font-weight: 700; padding: 0.1rem 0.45rem; border-radius: 100px; min-width: 16px; text-align: center; }

  /* Content wrapper */
  .inst-content { padding: 2rem 5%; flex: 1; }

  /* Page title row */
  .inst-page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.75rem; flex-wrap: wrap; gap: 1rem; }
  .inst-page-title { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; }
  .inst-page-sub { font-size: 0.85rem; color: var(--text2); margin-top: 0.2rem; }

  /* ── OVERVIEW ── */
  .ov-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
  .ov-stat-card { background: var(--surface); border: 1px solid var(--border2); border-radius: 14px; padding: 1.25rem; position: relative; overflow: hidden; transition: border-color 0.2s; }
  .ov-stat-card:hover { border-color: var(--border); }
  .ov-stat-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
  .ov-stat-val { font-family: 'Syne', sans-serif; font-size: 1.75rem; font-weight: 800; margin-bottom: 0.15rem; }
  .ov-stat-lbl { font-size: 0.78rem; color: var(--text3); }
  .ov-stat-trend { font-size: 0.72rem; color: #22c55e; margin-top: 0.25rem; }
  .ov-stat-glow { position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; border-radius: 50%; opacity: 0.07; filter: blur(20px); }

  .ov-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  .ov-card { background: var(--surface); border: 1px solid var(--border2); border-radius: 14px; overflow: hidden; }
  .ov-card-hd { padding: 1rem 1.25rem; border-bottom: 1px solid var(--border2); font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; justify-content: space-between; }
  .ov-card-bd { padding: 0.75rem 1.25rem; }
  .ov-see-all { font-size: 0.75rem; color: var(--indigo-light); cursor: pointer; font-weight: 500; }
  .ov-course-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0; border-bottom: 1px solid var(--border2); }
  .ov-course-row:last-child { border-bottom: none; }
  .ov-course-icon { font-size: 1.4rem; }
  .ov-course-name { font-size: 0.85rem; font-weight: 600; flex: 1; }
  .ov-course-students { font-size: 0.75rem; color: var(--text3); }
  .ov-course-status { font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.55rem; border-radius: 100px; }
  .status-active { background: rgba(34,197,94,0.1); color: #22c55e; }
  .status-draft { background: rgba(251,191,36,0.1); color: #fbbf24; }
  .ov-req-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0; border-bottom: 1px solid var(--border2); }
  .ov-req-row:last-child { border-bottom: none; }
  .ov-req-avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--gradient); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.65rem; color: white; flex-shrink: 0; }
  .ov-req-name { font-size: 0.82rem; font-weight: 600; }
  .ov-req-course { font-size: 0.72rem; color: var(--text3); }
  .ov-req-time { font-size: 0.72rem; color: var(--text3); margin-left: auto; white-space: nowrap; }
  .ov-req-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--cyan); flex-shrink: 0; }

  /* ── COURSES MANAGEMENT ── */
  .courses-mgmt { display: flex; flex-direction: column; gap: 1rem; }
  .mgmt-course-card { background: var(--surface); border: 1px solid var(--border2); border-radius: 14px; padding: 1.25rem; display: flex; align-items: center; gap: 1.25rem; transition: border-color 0.2s; }
  .mgmt-course-card:hover { border-color: var(--border); }
  .mgmt-course-emoji { font-size: 2.25rem; flex-shrink: 0; }
  .mgmt-course-info { flex: 1; }
  .mgmt-course-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.95rem; margin-bottom: 0.3rem; }
  .mgmt-course-meta { font-size: 0.78rem; color: var(--text3); margin-bottom: 0.6rem; display: flex; gap: 1rem; flex-wrap: wrap; }
  .mgmt-course-stats { display: flex; gap: 1.5rem; }
  .mgmt-stat { text-align: center; }
  .mgmt-stat-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; }
  .mgmt-stat-lbl { font-size: 0.68rem; color: var(--text3); }
  .mgmt-actions { display: flex; gap: 0.5rem; align-items: center; }
  .mgmt-btn { padding: 0.4rem 0.875rem; border-radius: 7px; font-size: 0.78rem; font-weight: 600; cursor: pointer; border: 1px solid; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
  .mgmt-btn-edit { background: rgba(99,102,241,0.1); border-color: rgba(99,102,241,0.3); color: var(--indigo-light); }
  .mgmt-btn-edit:hover { background: rgba(99,102,241,0.2); }
  .mgmt-btn-view { background: transparent; border-color: var(--border2); color: var(--text2); }
  .mgmt-btn-view:hover { border-color: var(--text2); }

  /* ── ADD COURSE MODAL ── */
  .add-course-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 1rem; animation: fadeIn 0.2s ease; }
  .add-course-modal { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; width: 100%; max-width: 580px; max-height: 92vh; overflow-y: auto; animation: slideUp 0.3s ease; }
  .acm-header { padding: 1.5rem; border-bottom: 1px solid var(--border2); display: flex; justify-content: space-between; align-items: flex-start; }
  .acm-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.15rem; }
  .acm-sub { font-size: 0.8rem; color: var(--text2); margin-top: 0.2rem; }
  .acm-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
  .acm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem; }
  .acm-section-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.85rem; color: var(--indigo-light); margin: 0.5rem 0 0; padding-top: 0.75rem; border-top: 1px solid var(--border2); }
  .acm-select { width: 100%; padding: 0.7rem 1rem; border-radius: 8px; background: var(--bg); border: 1.5px solid var(--border2); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.875rem; outline: none; transition: border-color 0.2s; appearance: none; cursor: pointer; }
  .acm-select:focus { border-color: var(--indigo); }
  .acm-textarea { width: 100%; padding: 0.7rem 1rem; border-radius: 8px; background: var(--bg); border: 1.5px solid var(--border2); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.875rem; outline: none; transition: border-color 0.2s; resize: none; line-height: 1.6; }
  .acm-textarea:focus { border-color: var(--indigo); }
  .acm-footer { padding: 1.25rem 1.5rem; border-top: 1px solid var(--border2); display: flex; gap: 0.75rem; justify-content: flex-end; }

  /* ── REQUESTS ── */
  .requests-list { display: flex; flex-direction: column; gap: 0.875rem; }
  .req-card { background: var(--surface); border: 1px solid var(--border2); border-radius: 14px; padding: 1.25rem; display: flex; align-items: center; gap: 1.25rem; transition: border-color 0.2s; }
  .req-card:hover { border-color: var(--border); }
  .req-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--gradient); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 0.9rem; color: white; flex-shrink: 0; }
  .req-info { flex: 1; }
  .req-name { font-weight: 700; font-size: 0.92rem; margin-bottom: 0.2rem; }
  .req-course-name { font-size: 0.8rem; color: var(--indigo-light); margin-bottom: 0.2rem; }
  .req-details { font-size: 0.75rem; color: var(--text3); }
  .req-time { font-size: 0.75rem; color: var(--text3); white-space: nowrap; }
  .req-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
  .req-btn-accept { padding: 0.45rem 1rem; border-radius: 8px; background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.3); color: #22c55e; font-size: 0.8rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .req-btn-accept:hover { background: rgba(34,197,94,0.22); }
  .req-btn-reject { padding: 0.45rem 1rem; border-radius: 8px; background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.25); color: #f87171; font-size: 0.8rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .req-btn-reject:hover { background: rgba(248,113,113,0.18); }
  .req-status { font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.7rem; border-radius: 100px; }
  .req-status.accepted { background: rgba(34,197,94,0.1); color: #22c55e; }
  .req-status.rejected { background: rgba(248,113,113,0.1); color: #f87171; }
  .req-status.pending { background: rgba(251,191,36,0.1); color: #fbbf24; }
  .req-payment-badge { font-size: 0.7rem; padding: 0.15rem 0.5rem; border-radius: 4px; background: rgba(6,182,212,0.1); color: var(--cyan); font-weight: 500; }

  /* ── INSTRUCTOR Q&A ── */
  .iqa-list { display: flex; flex-direction: column; gap: 0.875rem; }
  .iqa-card { background: var(--surface); border: 1px solid var(--border2); border-radius: 14px; padding: 1.25rem; transition: border-color 0.2s; }
  .iqa-card:hover { border-color: var(--border); }
  .iqa-card.answered { border-left: 3px solid var(--indigo); }
  .iqa-header { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.875rem; }
  .iqa-from { font-size: 0.78rem; color: var(--text3); }
  .iqa-course-tag { font-size: 0.72rem; background: rgba(99,102,241,0.1); color: var(--indigo-light); padding: 0.15rem 0.5rem; border-radius: 4px; margin-left: 0.4rem; }
  .iqa-time { font-size: 0.72rem; color: var(--text3); margin-left: auto; white-space: nowrap; }
  .iqa-question { font-size: 0.9rem; font-weight: 500; color: var(--text); line-height: 1.6; margin-bottom: 0.875rem; }
  .iqa-reply-area { background: var(--bg3); border-radius: 10px; padding: 0.875rem; }
  .iqa-reply-label { font-size: 0.75rem; font-weight: 600; color: var(--indigo-light); margin-bottom: 0.5rem; }
  .iqa-answer-text { font-size: 0.85rem; color: var(--text2); line-height: 1.6; }
  .iqa-reply-input { width: 100%; padding: 0.7rem 0.875rem; border-radius: 8px; background: var(--bg); border: 1.5px solid var(--border2); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.85rem; outline: none; resize: none; transition: border-color 0.2s; line-height: 1.6; }
  .iqa-reply-input:focus { border-color: var(--indigo); }
  .iqa-reply-footer { display: flex; justify-content: flex-end; margin-top: 0.6rem; }

  /* ── PROFILE EDIT ── */
  .inst-profile-grid { display: grid; grid-template-columns: 240px 1fr; gap: 1.5rem; align-items: start; }
  .inst-profile-card { background: var(--surface); border: 1px solid var(--border2); border-radius: 14px; padding: 1.5rem; text-align: center; }
  .inst-profile-avatar-wrap { position: relative; display: inline-block; margin-bottom: 1rem; }
  .inst-profile-avatar-large { width: 88px; height: 88px; border-radius: 50%; background: var(--gradient); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.5rem; color: white; }
  .inst-profile-form { background: var(--surface); border: 1px solid var(--border2); border-radius: 14px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
  .form-section-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.85rem; color: var(--indigo-light); padding-bottom: 0.5rem; border-bottom: 1px solid var(--border2); margin-bottom: 0.25rem; }

  @media (max-width: 900px) {
    .ov-stats { grid-template-columns: repeat(2, 1fr); }
    .ov-grid { grid-template-columns: 1fr; }
    .inst-profile-grid { grid-template-columns: 1fr; }
  }

  /* COURSE DETAIL */
  .course-detail { padding: 90px 5% 60px; min-height: 100vh; }
  .cd-layout { display: grid; grid-template-columns: 1fr 340px; gap: 2rem; align-items: start; }
  .cd-main { display: flex; flex-direction: column; gap: 1.5rem; }
  .cd-hero { background: var(--surface); border: 1px solid var(--border2); border-radius: 16px; overflow: hidden; }
  .cd-video-wrap { width: 100%; aspect-ratio: 16/9; background: #000; position: relative; }
  .cd-video-wrap iframe { width: 100%; height: 100%; border: none; }
  .cd-video-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; background: linear-gradient(135deg, var(--bg3) 0%, var(--surface2) 100%); cursor: pointer; }
  .cd-video-placeholder:hover .play-btn { transform: scale(1.1); }
  .play-btn { width: 72px; height: 72px; border-radius: 50%; background: var(--gradient); display: flex; align-items: center; justify-content: center; font-size: 1.75rem; transition: transform 0.2s; box-shadow: 0 8px 32px rgba(99,102,241,0.4); }
  .cd-video-label { font-size: 0.9rem; color: var(--text2); }
  .cd-info { padding: 1.5rem; }
  .cd-badge-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
  .cd-cat { font-size: 0.75rem; color: var(--cyan); font-weight: 600; }
  .cd-title { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; margin-bottom: 0.75rem; line-height: 1.3; }
  .cd-meta-row { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
  .cd-meta-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: var(--text2); }
  .cd-about { font-size: 0.9rem; color: var(--text2); line-height: 1.75; }
  .cd-card { background: var(--surface); border: 1px solid var(--border2); border-radius: 14px; overflow: hidden; }
  .cd-card-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border2); font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem; }
  .cd-card-body { padding: 1.25rem 1.5rem; }
  .week-item { display: flex; gap: 1rem; padding: 0.9rem 0; border-bottom: 1px solid var(--border2); }
  .week-item:last-child { border-bottom: none; }
  .week-num { width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0; background: rgba(99,102,241,0.12); color: var(--indigo-light); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.8rem; }
  .week-content { flex: 1; }
  .week-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 0.3rem; }
  .week-topics { display: flex; gap: 0.4rem; flex-wrap: wrap; }
  .week-topic { font-size: 0.72rem; color: var(--text3); padding: 0.15rem 0.5rem; background: var(--bg3); border-radius: 4px; }
  .schedule-item { display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 0; border-bottom: 1px solid var(--border2); }
  .schedule-item:last-child { border-bottom: none; }
  .sched-day { font-weight: 600; font-size: 0.9rem; }
  .sched-time { font-size: 0.85rem; color: var(--text2); }
  .sched-type { font-size: 0.75rem; color: var(--cyan); background: rgba(6,182,212,0.1); padding: 0.2rem 0.6rem; border-radius: 100px; }
  .review-summary { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border2); }
  .review-big-rating { font-family: 'Syne', sans-serif; font-size: 3.5rem; font-weight: 800; color: var(--text); line-height: 1; }
  .review-stars-row { display: flex; flex-direction: column; gap: 0.25rem; }
  .review-stars-big { font-size: 1.3rem; color: #fbbf24; }
  .review-count { font-size: 0.8rem; color: var(--text3); }
  .review-item { padding: 1rem 0; border-bottom: 1px solid var(--border2); }
  .review-item:last-child { border-bottom: none; }
  .review-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.6rem; }
  .review-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--gradient); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.7rem; color: white; flex-shrink: 0; }
  .review-name { font-weight: 600; font-size: 0.9rem; }
  .review-date { font-size: 0.75rem; color: var(--text3); }
  .review-text { font-size: 0.85rem; color: var(--text2); line-height: 1.65; }
  .enroll-card { background: var(--surface); border: 1px solid var(--border2); border-radius: 16px; padding: 1.5rem; position: sticky; top: 88px; }
  .enroll-price { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; color: var(--cyan); margin-bottom: 0.25rem; }
  .enroll-deadline { font-size: 0.8rem; color: #f87171; margin-bottom: 1.25rem; }
  .enroll-btn { width: 100%; padding: 0.9rem; font-size: 1rem; border-radius: 10px; margin-bottom: 1rem; }
  .enroll-details { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.25rem; }
  .enroll-detail-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.85rem; color: var(--text2); }
  .enroll-detail-icon { font-size: 1.1rem; flex-shrink: 0; }
  .enroll-divider { height: 1px; background: var(--border2); margin: 1rem 0; }
  .mini-instructor { background: var(--surface); border: 1px solid var(--border2); border-radius: 14px; padding: 1.25rem; cursor: pointer; transition: border-color 0.2s, transform 0.2s; }
  .mini-instructor:hover { border-color: var(--indigo); transform: translateY(-2px); }
  .mini-inst-header { display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.75rem; }
  .mini-inst-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.95rem; }
  .mini-inst-title { font-size: 0.8rem; color: var(--indigo-light); }
  .mini-inst-bio { font-size: 0.82rem; color: var(--text2); line-height: 1.6; margin-bottom: 0.75rem; }
  .mini-inst-link { font-size: 0.8rem; color: var(--cyan); font-weight: 500; }
  .mini-center { display: flex; align-items: center; gap: 0.75rem; background: var(--surface); border: 1px solid var(--border2); border-radius: 12px; padding: 1rem; cursor: pointer; transition: border-color 0.2s, transform 0.2s; margin-top: 0.75rem; }
  .mini-center:hover { border-color: var(--cyan); transform: translateY(-2px); }
  .mini-center-logo { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 0.85rem; color: white; flex-shrink: 0; }
  .mini-center-name { font-weight: 600; font-size: 0.9rem; }
  .mini-center-meta { font-size: 0.75rem; color: var(--text3); }
  .mini-center-arrow { margin-left: auto; color: var(--text3); }
  /* INSTRUCTOR PROFILE */
  .instructor-page { padding: 90px 5% 60px; min-height: 100vh; }
  .ip-layout { display: grid; grid-template-columns: 300px 1fr; gap: 2rem; align-items: start; }
  .ip-sidebar { display: flex; flex-direction: column; gap: 1.25rem; position: sticky; top: 88px; }
  .ip-profile-card { background: var(--surface); border: 1px solid var(--border2); border-radius: 16px; padding: 2rem; text-align: center; }
  .ip-avatar { width: 88px; height: 88px; border-radius: 50%; background: var(--gradient); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.5rem; color: white; margin: 0 auto 1rem; }
  .ip-name { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; margin-bottom: 0.25rem; }
  .ip-title { font-size: 0.9rem; color: var(--indigo-light); margin-bottom: 0.5rem; }
  .ip-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid var(--border2); }
  .ip-stat-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.1rem; }
  .ip-stat-lbl { font-size: 0.7rem; color: var(--text3); }
  .ip-links { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid var(--border2); }
  .ip-link { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: var(--text2); padding: 0.5rem 0.75rem; border-radius: 8px; background: var(--bg); }
  .ip-main { display: flex; flex-direction: column; gap: 1.5rem; }
  .ip-section { background: var(--surface); border: 1px solid var(--border2); border-radius: 14px; padding: 1.5rem; }
  .ip-section-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 1rem; }
  .ip-bio { font-size: 0.9rem; color: var(--text2); line-height: 1.8; }
  .achievement-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0; border-bottom: 1px solid var(--border2); font-size: 0.875rem; }
  .achievement-item:last-child { border-bottom: none; }
  .achievement-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gradient); flex-shrink: 0; }
  .back-btn { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text2); font-size: 0.85rem; cursor: pointer; margin-bottom: 1.5rem; transition: color 0.2s; }
  .back-btn:hover { color: var(--indigo-light); }
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .dash-grid { grid-template-columns: 1fr; }
    .hero-stats { gap: 1.5rem; }
  }
`;

// ============================================================
// COMPONENTS
// ============================================================

// Extracted components/pages live under app/components

// Extracted components/pages live under app/components

// Extracted Dashboard/Auth pages live under app/components/pages

// ---- Q&A SECTION ----
const SAMPLE_QA = [
  { id:1, sender:"Rania Hassan", anon:false, to:"instructor", question:"Is prior programming knowledge required before joining?", answer:"No prior experience needed at all — we start from absolute zero. Just bring your laptop and curiosity!", answeredBy:"Ahmed Hassan", time:"2 days ago" },
  { id:2, sender:"Anonymous", anon:true, to:"instructor", question:"Will sessions be recorded in case I miss one?", answer:"Yes, all sessions are recorded and uploaded within 24 hours to the course group.", answeredBy:"Ahmed Hassan", time:"1 week ago" },
  { id:3, sender:"Kamal Ibrahim", anon:false, to:"center", question:"Do you offer any discounts for university students?", answer:"Yes! Students get 15% off — just send your university ID to our WhatsApp.", answeredBy:"Code Academy Sudan", time:"3 days ago" },
];

function QASection({ course, instructor, center }) {
  const [recipient, setRecipient] = useState("instructor");
  const [question, setQuestion] = useState("");
  const [anon, setAnon] = useState(false);
  const [sent, setSent] = useState(false);
  const maxLen = 500;

  const recipientName = recipient === "instructor"
    ? (instructor?.name || "the instructor")
    : (center?.name || "the center");

  const placeholders = {
    instructor: `Ask ${instructor?.name || "the instructor"} anything about the course content, pace, or requirements...`,
    center: `Ask ${center?.name || "the center"} about payment, schedules, facilities, or policies...`,
  };

  const handleSend = () => {
    if (!question.trim()) return;
    setSent(true);
  };

  return (
    <div className="qa-card">
      <div className="qa-header">
        <div className="qa-header-left">
          💬 Ask a Question
          <span className="qa-header-sub">· Typically answered within 24h</span>
        </div>
      </div>
      <div className="qa-body">
        {!sent ? (
          <>
            {/* Who to ask */}
            <div style={{fontSize:"0.78rem",color:"var(--text2)",marginBottom:"0.5rem"}}>Send your question to:</div>
            <div className="qa-recipient-tabs">
              <button className={`qa-tab ${recipient==="instructor"?"active":""}`} onClick={() => setRecipient("instructor")}>
                👨‍🏫 {instructor?.name || "Instructor"}
              </button>
              {center && (
                <button className={`qa-tab ${recipient==="center"?"active":""}`} onClick={() => setRecipient("center")}>
                  🏢 {center.name}
                </button>
              )}
            </div>

            {/* Textarea */}
            <textarea
              className="qa-textarea"
              rows={3}
              placeholder={placeholders[recipient]}
              value={question}
              maxLength={maxLen}
              onChange={e => setQuestion(e.target.value)}
            />
            <div className="qa-char-count">{question.length}/{maxLen}</div>

            {/* Footer row */}
            <div className="qa-submit-row">
              <div className="qa-anon-toggle" onClick={() => setAnon(!anon)}>
                <div className={`qa-toggle-box ${anon?"checked":""}`}>{anon && <span style={{color:"white",fontSize:"0.6rem",fontWeight:700}}>✓</span>}</div>
                Ask anonymously
              </div>
              <button className="btn btn-primary"
                style={{padding:"0.6rem 1.25rem",borderRadius:8,fontSize:"0.875rem"}}
                disabled={!question.trim()}
                onClick={handleSend}>
                Send Question →
              </button>
            </div>
          </>
        ) : (
          <div className="qa-sent">
            <div className="qa-sent-icon">✉️</div>
            <div className="qa-sent-title">Question Sent!</div>
            <div className="qa-sent-sub">
              Your question was sent to <strong>{recipientName}</strong>.<br/>
              {anon ? "It will appear as Anonymous." : ""} Expect a reply within 24 hours.
            </div>
            <button className="btn btn-ghost" style={{marginTop:"1rem",padding:"0.5rem 1.25rem",borderRadius:8,fontSize:"0.85rem"}} onClick={() => { setSent(false); setQuestion(""); }}>
              Ask Another Question
            </button>
          </div>
        )}

        {/* Existing Q&A */}
        <div className="qa-existing">
          <div className="qa-existing-title">Previous Questions ({SAMPLE_QA.length})</div>
          {SAMPLE_QA.map(q => (
            <div key={q.id} className="qa-item">
              <div className="qa-item-header">
                <div style={{width:22,height:22,borderRadius:"50%",background:"var(--gradient)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.6rem",fontWeight:700,color:"white",flexShrink:0}}>
                  {q.anon ? "?" : q.sender[0]}
                </div>
                <span className="qa-item-sender">{q.anon ? "Anonymous" : q.sender}</span>
                <span className="qa-item-to">→ {q.to === "instructor" ? instructor?.name : center?.name}</span>
                <span className="qa-item-time">{q.time}</span>
              </div>
              <div className="qa-item-q">{q.question}</div>
              {q.answer && (
                <div className="qa-item-answer">
                  <div className="qa-item-answer-by">💬 {q.answeredBy} replied:</div>
                  <div className="qa-item-answer-text">{q.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- ENROLLMENT MODAL ----
const PAYMENT_METHODS = [
  { id: "bank", icon: "🏦", name: "Bank Transfer", desc: "Manual transfer to our bank account" },
  { id: "momo", icon: "📱", name: "Mobile Money", desc: "MTN, Zain, or Sudani mobile wallet" },
];
const MOMO_PROVIDERS = [
  { id: "mtn", icon: "🟡", name: "MTN", num: "0910-123-456" },
  { id: "zain", icon: "🔴", name: "Zain", num: "0912-987-654" },
  { id: "sudani", icon: "🟢", name: "Sudani", num: "0911-555-777" },
];
const BANK_DETAILS = [
  { label: "Bank Name", value: "Bank of Khartoum" },
  { label: "Account Name", value: "Masar Training Platform" },
  { label: "Account Number", value: "1234-5678-9012-3456" },
  { label: "IBAN", value: "SD12 BOKH 0000 1234 5678 9012" },
];

function EnrollmentModal({ course, onClose }) {
  // step: "reserve" | "payment-choice" | "bank" | "momo" | "upload" | "done"
  const [step, setStep] = useState("reserve");
  const [payLater, setPayLater] = useState(false);
  const [payMethod, setPayMethod] = useState(null);
  const [momoProvider, setMomoProvider] = useState("mtn");
  const [file, setFile] = useState(null);
  const [copied, setCopied] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [errors, setErrors] = useState({});
  const refNum = useState("MSR-" + course.id + "-" + Math.floor(10000 + Math.random() * 90000))[0];

  const isOnline = course.mode === "online" || course.mode === "hybrid";
  const isInPerson = course.mode === "in-person" || course.mode === "hybrid";

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^09\d{8}$/.test(form.phone.replace(/-/g, ""))) e.phone = "Enter a valid Sudanese number (09xxxxxxxx)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(""), 1800);
  };

  const getLinkType = url => {
    if (!url) return "zoom";
    if (url.includes("whatsapp")) return "whatsapp";
    if (url.includes("t.me") || url.includes("telegram")) return "telegram";
    return "zoom";
  };

  // Step progress map
  const STEPS = payLater
    ? ["reserve", "done"]
    : ["reserve", "payment-choice", payMethod === "bank" ? "bank" : "momo", "upload", "done"];
  const stepIdx = STEPS.indexOf(step);
  const totalSteps = STEPS.length;

  const ProgressBar = () => (
    <div style={{marginBottom:"1.5rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"var(--text3)",marginBottom:"0.4rem"}}>
        <span>Step {Math.max(stepIdx+1,1)} of {totalSteps}</span>
        <span style={{color:"var(--indigo-light)",fontWeight:600}}>
          {step==="reserve" && "Your Details"}
          {step==="payment-choice" && "Payment Method"}
          {step==="bank" && "Bank Transfer"}
          {step==="momo" && "Mobile Money"}
          {step==="upload" && "Upload Receipt"}
          {step==="done" && (payLater ? "Reservation Confirmed" : "Enrollment Confirmed")}
        </span>
      </div>
      <div style={{height:4,background:"var(--border2)",borderRadius:100,overflow:"hidden"}}>
        <div style={{height:"100%",background:"var(--gradient)",borderRadius:100,width:`${((stepIdx+1)/totalSteps)*100}%`,transition:"width 0.4s ease"}} />
      </div>
    </div>
  );

  return (
    <div className="enroll-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="enroll-modal">
        {/* Header */}
        <div className="em-header">
          <div>
            <div className="em-title" style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
              <span>{course.image}</span> {course.title}
            </div>
            <div className="em-subtitle">
              {course.instructor} · <span style={{color:"var(--cyan)",fontWeight:700}}>${course.price}</span>
              {" · "}<span style={{textTransform:"capitalize",color:"var(--indigo-light)"}}>{course.mode}</span>
            </div>
          </div>
          <button className="em-close" onClick={onClose}>✕</button>
        </div>

        <div className="em-body">
          <ProgressBar />

          {/* ── STEP: RESERVE ── */}
          {step === "reserve" && (
            <div>
              <div style={{fontSize:"0.85rem",color:"var(--text2)",marginBottom:"1.25rem",lineHeight:1.6}}>
                Fill in your details to <strong style={{color:"var(--text)"}}>reserve your seat</strong>. You can pay now or later — your spot is held for <strong style={{color:"var(--cyan)"}}>48 hours</strong>.
              </div>

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className={`form-input ${errors.name ? "input-error" : ""}`} placeholder="Mohammed Abdallah" value={form.name} onChange={e => { setForm({...form, name:e.target.value}); setErrors({...errors,name:""}) }} />
                {errors.name && <div style={{fontSize:"0.75rem",color:"#f87171",marginTop:"0.3rem"}}>⚠ {errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input className={`form-input ${errors.phone ? "input-error" : ""}`} placeholder="09xxxxxxxxx" value={form.phone} onChange={e => { setForm({...form, phone:e.target.value}); setErrors({...errors,phone:""}) }} />
                {errors.phone && <div style={{fontSize:"0.75rem",color:"#f87171",marginTop:"0.3rem"}}>⚠ {errors.phone}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Email <span style={{color:"var(--text3)",fontWeight:400}}>(optional)</span></label>
                <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
              </div>

              {/* Course summary card */}
              <div style={{background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:10,padding:"0.875rem",marginBottom:"1.25rem",display:"flex",gap:"0.75rem",alignItems:"center"}}>
                <span style={{fontSize:"1.75rem"}}>{course.image}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:"0.82rem",fontWeight:600,marginBottom:"0.15rem"}}>{course.title}</div>
                  <div style={{fontSize:"0.75rem",color:"var(--text3)"}}>
                    📅 Starts {course.details?.startDate || "Soon"} &nbsp;·&nbsp; ⏱ {course.duration} &nbsp;·&nbsp; 📶 {course.level}
                  </div>
                </div>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"var(--cyan)",fontSize:"1rem",flexShrink:0}}>${course.price}</div>
              </div>

              {/* Pay now vs pay later toggle */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.6rem",marginBottom:"1.25rem"}}>
                <div onClick={() => setPayLater(false)} style={{padding:"0.875rem",borderRadius:10,border:`1.5px solid ${!payLater?"var(--indigo)":"var(--border2)"}`,background:!payLater?"rgba(99,102,241,0.08)":"var(--bg)",cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}>
                  <div style={{fontSize:"1.25rem",marginBottom:"0.25rem"}}>💳</div>
                  <div style={{fontWeight:600,fontSize:"0.85rem"}}>Pay Now</div>
                  <div style={{fontSize:"0.72rem",color:"var(--text3)"}}>Confirm instantly</div>
                </div>
                <div onClick={() => setPayLater(true)} style={{padding:"0.875rem",borderRadius:10,border:`1.5px solid ${payLater?"var(--cyan)":"var(--border2)"}`,background:payLater?"rgba(6,182,212,0.08)":"var(--bg)",cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}>
                  <div style={{fontSize:"1.25rem",marginBottom:"0.25rem"}}>🔖</div>
                  <div style={{fontWeight:600,fontSize:"0.85rem"}}>Reserve Now</div>
                  <div style={{fontSize:"0.72rem",color:"var(--text3)"}}>Pay within 48h</div>
                </div>
              </div>

              <button className="btn btn-primary" style={{width:"100%",padding:"0.9rem",borderRadius:10,fontSize:"0.95rem",marginBottom:"0.5rem"}}
                onClick={() => { if (validate()) setStep(payLater ? "done" : "payment-choice"); }}>
                {payLater ? "Reserve My Seat →" : "Continue to Payment →"}
              </button>
              <div style={{textAlign:"center",fontSize:"0.75rem",color:"var(--text3)"}}>🔒 Your info is safe and never shared</div>
            </div>
          )}

          {/* ── STEP: PAYMENT CHOICE ── */}
          {step === "payment-choice" && (
            <div>
              <div style={{fontSize:"0.85rem",color:"var(--text2)",marginBottom:"1rem"}}>
                Choose your payment method for <strong style={{color:"var(--cyan)"}}>SDG {(course.price * 350).toLocaleString()}</strong> <span style={{color:"var(--text3)"}}>(≈ ${course.price})</span>
              </div>

              <div className="payment-methods">
                {[
                  { id:"bank", icon:"🏦", name:"Bank Transfer", desc:"Direct bank transfer — most common" },
                  { id:"momo", icon:"📱", name:"Mobile Money", desc:"MTN, Zain, or Sudani wallet" },
                ].map(m => (
                  <div key={m.id} className={`payment-method ${payMethod===m.id?"selected":""}`} onClick={() => setPayMethod(m.id)}>
                    <span className="pm-icon">{m.icon}</span>
                    <div><div className="pm-name">{m.name}</div><div className="pm-desc">{m.desc}</div></div>
                    <div className={`pm-radio ${payMethod===m.id?"selected":""}`} />
                  </div>
                ))}
              </div>

              <div style={{display:"flex",gap:"0.75rem",marginTop:"1.25rem"}}>
                <button className="btn btn-ghost" style={{flex:1,padding:"0.875rem",borderRadius:10}} onClick={() => setStep("reserve")}>← Back</button>
                <button className="btn btn-primary" style={{flex:2,padding:"0.875rem",borderRadius:10}} disabled={!payMethod}
                  onClick={() => setStep(payMethod)}>
                  View Payment Details →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP: BANK ── */}
          {step === "bank" && (
            <div>
              <div style={{fontSize:"0.85rem",color:"var(--text2)",marginBottom:"0.75rem"}}>Transfer the exact amount below, then upload your receipt.</div>
              <div className="bank-box">
                <div className="bank-box-title">🏦 Transfer to:</div>
                {[
                  {label:"Bank", value:"Bank of Khartoum"},
                  {label:"Account Name", value:"Masar Training Platform"},
                  {label:"Account No.", value:"1234-5678-9012-3456"},
                  {label:"Amount (SDG)", value:`SDG ${(course.price*350).toLocaleString()}`},
                  {label:"Reference", value:form.phone || refNum},
                ].map(b => (
                  <div key={b.label} className="bank-row">
                    <span className="bank-label">{b.label}</span>
                    <div style={{display:"flex",gap:"0.5rem",alignItems:"center"}}>
                      <span className="bank-value" style={b.label==="Amount (SDG)"?{color:"var(--cyan)"}:{}}>{b.value}</span>
                      <button className="copy-btn" onClick={() => copyText(b.value, b.label)}>
                        {copied===b.label ? "✓" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{background:"rgba(251,191,36,0.07)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:10,padding:"0.75rem",fontSize:"0.78rem",color:"var(--text2)",marginBottom:"1rem"}}>
                💡 Use your phone number <strong>({form.phone || "09xxxxxxxx"})</strong> as the transfer reference so we can match your payment quickly.
              </div>
              <div style={{display:"flex",gap:"0.75rem"}}>
                <button className="btn btn-ghost" style={{flex:1,padding:"0.875rem",borderRadius:10}} onClick={() => setStep("payment-choice")}>← Back</button>
                <button className="btn btn-primary" style={{flex:2,padding:"0.875rem",borderRadius:10}} onClick={() => setStep("upload")}>I've Transferred →</button>
              </div>
            </div>
          )}

          {/* ── STEP: MOMO ── */}
          {step === "momo" && (
            <div>
              <div style={{fontSize:"0.85rem",color:"var(--text2)",marginBottom:"0.75rem"}}>Select your operator and send the amount:</div>
              <div className="momo-grid">
                {MOMO_PROVIDERS.map(p => (
                  <div key={p.id} className={`momo-btn ${momoProvider===p.id?"selected":""}`} onClick={() => setMomoProvider(p.id)}>
                    <span className="momo-icon">{p.icon}</span>
                    <div className="momo-name">{p.name}</div>
                    <div className="momo-num">{p.num}</div>
                  </div>
                ))}
              </div>
              <div className="bank-box" style={{marginTop:"0.75rem"}}>
                <div className="bank-box-title">📱 Send to:</div>
                {[
                  {label:"Number", value: MOMO_PROVIDERS.find(p=>p.id===momoProvider)?.num},
                  {label:"Amount", value:`SDG ${(course.price*350).toLocaleString()}`},
                  {label:"Note/Message", value:`${form.name || "Your name"} – ${course.title}`},
                ].map(b => (
                  <div key={b.label} className="bank-row">
                    <span className="bank-label">{b.label}</span>
                    <div style={{display:"flex",gap:"0.5rem",alignItems:"center"}}>
                      <span className="bank-value" style={b.label==="Amount"?{color:"var(--cyan)"}:{}}>{b.value}</span>
                      <button className="copy-btn" onClick={() => copyText(b.value, b.label)}>
                        {copied===b.label ? "✓" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:"0.75rem",marginTop:"1rem"}}>
                <button className="btn btn-ghost" style={{flex:1,padding:"0.875rem",borderRadius:10}} onClick={() => setStep("payment-choice")}>← Back</button>
                <button className="btn btn-primary" style={{flex:2,padding:"0.875rem",borderRadius:10}} onClick={() => setStep("upload")}>I've Sent It →</button>
              </div>
            </div>
          )}

          {/* ── STEP: UPLOAD ── */}
          {step === "upload" && (
            <div>
              <div style={{fontSize:"0.85rem",color:"var(--text2)",marginBottom:"0.75rem",lineHeight:1.6}}>
                Upload a <strong>screenshot or photo</strong> of your payment confirmation. Our team reviews receipts within <strong style={{color:"var(--cyan)"}}>2–4 hours</strong>.
              </div>
              <label className={`file-upload-area ${file?"has-file":""}`}>
                <input type="file" accept="image/*,application/pdf" onChange={e => setFile(e.target.files[0])} />
                <div className="upload-icon">{file ? "✅" : "📎"}</div>
                <div className="upload-text">{file ? "Receipt ready!" : "Tap to upload receipt"}</div>
                {!file && <div className="upload-hint">PNG, JPG, PDF · Max 5MB</div>}
                {file && <div className="file-chosen">📄 {file.name}</div>}
              </label>

              <div style={{marginBottom:"1rem"}}>
                <label className="form-label">Note to instructor <span style={{color:"var(--text3)",fontWeight:400}}>(optional)</span></label>
                <textarea className="form-input" rows={2} placeholder="Any questions or special requests before you start..." style={{resize:"none",lineHeight:1.6}} value={form.note} onChange={e => setForm({...form, note:e.target.value})} />
              </div>

              <div style={{display:"flex",gap:"0.75rem"}}>
                <button className="btn btn-ghost" style={{flex:1,padding:"0.875rem",borderRadius:10}} onClick={() => setStep(payMethod)}>← Back</button>
                <button className="btn btn-primary" style={{flex:2,padding:"0.875rem",borderRadius:10}} disabled={!file}
                  onClick={() => setStep("done")}>
                  Submit & Confirm →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP: DONE ── */}
          {step === "done" && (
            <div className="status-card">
              <div className="status-icon">{payLater ? "🔖" : "🎉"}</div>
              <div className="status-title">{payLater ? "Seat Reserved!" : "You're In!"}</div>
              <div className={`status-badge ${payLater ? "pending" : "approved"}`}>
                {payLater ? "⏳ Payment Pending" : "✓ Enrollment Submitted"}
              </div>
              <div className="status-desc">
                {payLater
                  ? `Your seat in "${course.title}" is reserved for 48 hours. Complete your payment and upload the receipt to confirm your enrollment.`
                  : `We received your payment receipt. You'll get a WhatsApp/email confirmation within 2–4 hours. Welcome aboard!`
                }
              </div>
              <div className="status-ref">Reference No: <span>{refNum}</span></div>

              {/* Pay Later → show payment reminder */}
              {payLater && (
                <div style={{background:"rgba(251,191,36,0.07)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:12,padding:"1rem",marginBottom:"1rem",textAlign:"left"}}>
                  <div style={{fontWeight:600,fontSize:"0.85rem",marginBottom:"0.5rem"}}>⏰ Your 48-hour payment window:</div>
                  <div style={{fontSize:"0.82rem",color:"var(--text2)",lineHeight:1.7}}>
                    1. Transfer <strong style={{color:"var(--cyan)"}}>SDG {(course.price*350).toLocaleString()}</strong> to Masar (Bank of Khartoum or Mobile Money)<br/>
                    2. Come back to this page and tap <strong>"Complete Payment"</strong><br/>
                    3. Upload your receipt to confirm your spot
                  </div>
                  <button className="btn btn-primary" style={{width:"100%",padding:"0.75rem",borderRadius:10,marginTop:"0.875rem",fontSize:"0.875rem"}}
                    onClick={() => { setPayLater(false); setStep("payment-choice"); }}>
                    Complete Payment Now →
                  </button>
                </div>
              )}

              {/* Approved: online links */}
              {!payLater && isOnline && (
                <div className="course-links-section">
                  <div style={{fontSize:"0.75rem",fontWeight:600,color:"var(--text3)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.5rem",textAlign:"left"}}>
                    Links sent after confirmation:
                  </div>
                  {course.meetLink && (
                    <div className={`course-link-btn ${getLinkType(course.meetLink)}`} style={{opacity:0.6,cursor:"default"}}>
                      <span className="cl-icon">{course.meetLink.includes("zoom")?"💻":"📹"}</span>
                      <div className="cl-text">
                        <div className="cl-title">{course.meetLink.includes("zoom")?"Zoom Meeting Link":"Google Meet Link"}</div>
                        <div className="cl-sub">Will be sent after payment is verified</div>
                      </div>
                      <span style={{fontSize:"0.72rem",color:"var(--text3)"}}>Pending</span>
                    </div>
                  )}
                  {course.groupLink && (
                    <div className={`course-link-btn ${getLinkType(course.groupLink)}`} style={{opacity:0.6,cursor:"default"}}>
                      <span className="cl-icon">{course.groupLink.includes("whatsapp")?"💬":"✈️"}</span>
                      <div className="cl-text">
                        <div className="cl-title">{course.groupLink.includes("whatsapp")?"WhatsApp Group":"Telegram Group"}</div>
                        <div className="cl-sub">Will be sent after payment is verified</div>
                      </div>
                      <span style={{fontSize:"0.72rem",color:"var(--text3)"}}>Pending</span>
                    </div>
                  )}
                </div>
              )}

              {/* In-person location always visible */}
              {isInPerson && course.location && (
                <div className="location-section">
                  <div style={{fontSize:"0.75rem",fontWeight:600,color:"var(--text3)",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"0.75rem",textAlign:"left"}}>Course Location</div>
                  <div className="map-container">
                    <div className="map-placeholder">
                      <span className="map-pin">📍</span>
                      <div style={{fontSize:"0.8rem",color:"var(--text2)",padding:"0 1rem"}}>{course.location.address}</div>
                    </div>
                  </div>
                  <a href={course.location?.mapUrl||"https://maps.google.com"} target="_blank" rel="noreferrer" className="map-open-btn" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:"0.75rem"}}><span>🗺️</span> Open in Google Maps</a>
                </div>
              )}

              <button className="btn btn-ghost" style={{width:"100%",padding:"0.875rem",borderRadius:10,marginTop:"1rem"}} onClick={onClose}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- COURSE DETAIL PAGE ----
function CourseDetailPage({ courseId, setPage }) {
  const course = COURSES.find(c => c.id === courseId);
  const details = COURSE_DETAILS[courseId];
  const instructor = INSTRUCTORS.find(i => i.name === course?.instructor);
  const center = course?.center ? CENTERS.find(c => c.name === course.center) : null;
  const [playing, setPlaying] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  if (!course || !details) return null;

  const avgRating = (details.reviews.reduce((s, r) => s + r.rating, 0) / details.reviews.length).toFixed(1);

  const modeBadge = { online: { label: "🟢 Online", cls: "online" }, "in-person": { label: "🟡 In-Person", cls: "in-person" }, hybrid: { label: "🔵 Hybrid", cls: "hybrid" } };
  const mb = modeBadge[course.mode] || modeBadge.online;

  return (
    <div className="course-detail">
      {showEnroll && <EnrollmentModal course={{...course, details}} onClose={() => setShowEnroll(false)} />}
      <div className="back-btn" onClick={() => setPage("courses")}>← Back to Courses</div>
      <div className="cd-layout">
        {/* LEFT / MAIN */}
        <div className="cd-main">
          {/* Hero with video */}
          <div className="cd-hero">
            <div className="cd-video-wrap">
              {playing ? (
                <iframe src={`https://www.youtube.com/embed/${details.videoId}?autoplay=1`} title="Course intro" allowFullScreen allow="autoplay" />
              ) : (
                <div className="cd-video-placeholder" onClick={() => setPlaying(true)}>
                  <div style={{ fontSize: "5rem", marginBottom: "0.5rem" }}>{course.image}</div>
                  <div className="play-btn">▶</div>
                  <div className="cd-video-label">Watch Course Introduction</div>
                </div>
              )}
            </div>
            <div className="cd-info">
              <div className="cd-badge-row">
                <span className="cd-cat">{course.category}</span>
                <span className="tag">{course.level}</span>
                <span className={`mode-badge ${mb.cls}`}>{mb.label}</span>
                {course.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="cd-title">{course.title}</div>
              <div className="cd-meta-row">
                <span className="cd-meta-item">⏱ {course.duration}</span>
                <span className="cd-meta-item">👥 {course.students} students</span>
                <span className="cd-meta-item">⭐ {course.rating} ({details.reviews.length} reviews)</span>
                <span className="cd-meta-item">📅 Starts {details.startDate}</span>
              </div>
              <div className="cd-about">{details.about}</div>
            </div>
          </div>

          {/* Curriculum */}
          <div className="cd-card">
            <div className="cd-card-header">📚 Course Curriculum — {details.curriculum.length} Weeks</div>
            <div className="cd-card-body">
              {details.curriculum.map(w => (
                <div key={w.week} className="week-item">
                  <div className="week-num">W{w.week}</div>
                  <div className="week-content">
                    <div className="week-title">{w.title}</div>
                    <div className="week-topics">{w.topics.map(t => <span key={t} className="week-topic">{t}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="cd-card">
            <div className="cd-card-header">🗓 Lecture Schedule</div>
            <div className="cd-card-body">
              {details.schedule.map((s, i) => (
                <div key={i} className="schedule-item">
                  <div>
                    <div className="sched-day">{s.day}</div>
                    <div className="sched-time">{s.time}</div>
                  </div>
                  <span className="sched-type">{s.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="cd-card">
            <div className="cd-card-header">⭐ Student Reviews</div>
            <div className="cd-card-body">
              <div className="review-summary">
                <div className="review-big-rating">{avgRating}</div>
                <div className="review-stars-row">
                  <div className="review-stars-big">{"★".repeat(Math.round(parseFloat(avgRating)))}</div>
                  <div className="review-count">{details.reviews.length} reviews</div>
                </div>
              </div>
              {details.reviews.map((r, i) => (
                <div key={i} className="review-item">
                  <div className="review-header">
                    <div className="review-avatar">{r.avatar}</div>
                    <div>
                      <div className="review-name">{r.name}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ color: "#fbbf24", fontSize: "0.75rem" }}>{"★".repeat(r.rating)}</span>
                        <span className="review-date">{r.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="review-text">{r.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Q&A */}
          <QASection course={course} instructor={instructor} center={center} />
        </div>

        {/* RIGHT SIDEBAR */}
        <div>
          {/* Enroll Card */}
          <div className="enroll-card">
            <div className="enroll-price">${course.price}</div>
            <div className="enroll-deadline">⏰ Enrollment closes: {details.enrollDeadline}</div>
            <button className="btn btn-primary enroll-btn" onClick={() => setShowEnroll(true)}>Enroll Now</button>
            <button className={`btn enroll-btn ${wishlisted?"btn-primary":"btn-outline"}`} style={{ marginTop: "0.5rem", background: wishlisted?"rgba(251,191,36,0.15)":undefined, borderColor: wishlisted?"#fbbf24":undefined, color: wishlisted?"#fbbf24":undefined }} onClick={() => setWishlisted(w=>!w)}>{wishlisted ? "★ Wishlisted" : "☆ Add to Wishlist"}</button>
            <div className="enroll-divider" />
            <div className="enroll-details">
              <div className="enroll-detail-item"><span className="enroll-detail-icon">📅</span> Starts {details.startDate}</div>
              <div className="enroll-detail-item"><span className="enroll-detail-icon">⏱</span> {course.duration}</div>
              <div className="enroll-detail-item"><span className="enroll-detail-icon">📶</span> {course.level}</div>
              <div className="enroll-detail-item"><span className="enroll-detail-icon">🌐</span> <span style={{textTransform:"capitalize"}}>{course.mode} course</span></div>
              {(course.mode === "online" || course.mode === "hybrid") && <div className="enroll-detail-item"><span className="enroll-detail-icon">💻</span> Zoom / Google Meet link provided</div>}
              {(course.mode === "in-person" || course.mode === "hybrid") && course.location && <div className="enroll-detail-item"><span className="enroll-detail-icon">📍</span> {course.location.address}</div>}
              <div className="enroll-detail-item"><span className="enroll-detail-icon">🎓</span> Certificate on completion</div>
              <div className="enroll-detail-item"><span className="enroll-detail-icon">💬</span> Arabic & English support</div>
              <div className="enroll-detail-item"><span className="enroll-detail-icon">♾</span> Lifetime access to recordings</div>
            </div>
          </div>

          {/* Instructor mini card */}
          {instructor && (
            <div style={{ marginTop: "1rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Your Instructor</div>
              <div className="mini-instructor" onClick={() => setPage("instructor-" + instructor.id)}>
                <div className="mini-inst-header">
                  <div className="avatar" style={{ width: 44, height: 44, fontSize: "0.85rem" }}>{instructor.avatar}</div>
                  <div>
                    <div className="mini-inst-name">{instructor.name}</div>
                    <div className="mini-inst-title">{instructor.title}</div>
                  </div>
                </div>
                <div className="mini-inst-bio">{INSTRUCTOR_DETAILS[instructor.id]?.fullBio?.substring(0, 120)}...</div>
                <div className="mini-inst-link">View full profile →</div>

                {/* Center link */}
                {center && (
                  <div className="mini-center" onClick={e => { e.stopPropagation(); setPage("center-" + center.slug); }}>
                    <div className="mini-center-logo" style={{ background: center.color }}>{center.logo}</div>
                    <div>
                      <div className="mini-center-name">{center.name}</div>
                      <div className="mini-center-meta">📍 {center.location} · {center.rating} ★</div>
                    </div>
                    <div className="mini-center-arrow">→</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- INSTRUCTOR PROFILE PAGE ----
function InstructorProfilePage({ instructorId, setPage }) {
  const instructor = INSTRUCTORS.find(i => i.id === instructorId);
  const details = INSTRUCTOR_DETAILS[instructorId];
  const center = instructor?.center ? CENTERS.find(c => c.name === instructor.center) : null;
  const instructorCourses = COURSES.filter(c => c.instructor === instructor?.name);

  if (!instructor || !details) return null;

  return (
    <div className="instructor-page">
      <div className="back-btn" onClick={() => setPage("instructors")}>← Back to Instructors</div>
      <div className="ip-layout">
        {/* Sidebar */}
        <div className="ip-sidebar">
          <div className="ip-profile-card">
            <div className="ip-avatar">{instructor.avatar}</div>
            <div className="ip-name">{instructor.name}</div>
            <div className="ip-title">{instructor.title}</div>
            <div className="specialties" style={{ justifyContent: "center" }}>
              {instructor.specialties.map(s => <span key={s} className="tag">{s}</span>)}
            </div>
            <div className="ip-stats">
              <div><div className="ip-stat-val">{instructor.courses}</div><div className="ip-stat-lbl">Courses</div></div>
              <div><div className="ip-stat-val">{instructor.students}</div><div className="ip-stat-lbl">Students</div></div>
              <div><div className="ip-stat-val">{instructor.rating}</div><div className="ip-stat-lbl">Rating</div></div>
            </div>
            {(details.linkedin || details.github) && (
              <div className="ip-links">
                {details.linkedin && <div className="ip-link">🔗 {details.linkedin}</div>}
                {details.github && <div className="ip-link">💻 {details.github}</div>}
              </div>
            )}
          </div>

          {/* Center card */}
          {center && (
            <div className="mini-center" onClick={() => setPage("center-" + center.slug)}>
              <div className="mini-center-logo" style={{ background: center.color }}>{center.logo}</div>
              <div>
                <div className="mini-center-name">{center.name}</div>
                <div className="mini-center-meta">📍 {center.location} · {center.courses} courses</div>
              </div>
              <div className="mini-center-arrow">→</div>
            </div>
          )}
          {!center && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 12, padding: "1rem", fontSize: "0.85rem", color: "var(--text2)", textAlign: "center" }}>
              🎓 Independent Instructor
            </div>
          )}
        </div>

        {/* Main */}
        <div className="ip-main">
          <div className="ip-section">
            <div className="ip-section-title">👤 About {instructor.name}</div>
            <div className="ip-bio">{details.fullBio}</div>
          </div>

          <div className="ip-section">
            <div className="ip-section-title">🏆 Achievements & Credentials</div>
            {details.achievements.map((a, i) => (
              <div key={i} className="achievement-item">
                <div className="achievement-dot" />
                {a}
              </div>
            ))}
          </div>

          <div className="ip-section">
            <div className="ip-section-title">📚 Courses by {instructor.name}</div>
            <div className="courses-grid">
              {instructorCourses.map(c => <CourseCard key={c.id} course={c} setPage={setPage} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// INSTRUCTOR DASHBOARD
// ============================================================

const MOCK_REQUESTS = [
  { id:1, name:"Rania Hassan",    avatar:"RH", course:"Python for Data Science",       phone:"0912-345-678", email:"rania@example.com", payment:"bank",  amount:150, time:"2 hours ago",  status:"pending" },
  { id:2, name:"Kamal Ibrahim",   avatar:"KI", course:"Python for Data Science",       phone:"0911-222-333", email:"kamal@example.com", payment:"momo",  amount:150, time:"5 hours ago",  status:"pending" },
  { id:3, name:"Nour Abdallah",   avatar:"NA", course:"Machine Learning Fundamentals", phone:"0910-777-888", email:"nour@example.com",  payment:"bank",  amount:300, time:"1 day ago",    status:"accepted" },
  { id:4, name:"Yassir Musa",     avatar:"YM", course:"Python for Data Science",       phone:"0912-999-000", email:"yassir@example.com",payment:"momo",  amount:150, time:"2 days ago",   status:"rejected" },
  { id:5, name:"Salma Elzain",    avatar:"SE", course:"Machine Learning Fundamentals", phone:"0911-444-555", email:"salma@example.com", payment:"bank",  amount:300, time:"3 days ago",   status:"accepted" },
];

const MOCK_QA = [
  { id:1, sender:"Rania Hassan",  anon:false, course:"Python for Data Science",       question:"Do I need a powerful laptop for the labs?",                              time:"1 hour ago",  answer:null },
  { id:2, sender:"Anonymous",     anon:true,  course:"Machine Learning Fundamentals", question:"Is linear algebra required before joining?",                              time:"3 hours ago", answer:null },
  { id:3, sender:"Kamal Ibrahim", anon:false, course:"Python for Data Science",       question:"Will there be recorded sessions if I miss a class?",                      time:"1 day ago",   answer:"Yes, all sessions are recorded and uploaded within 24 hours to the course WhatsApp group." },
  { id:4, sender:"Nour Abdallah", anon:false, course:"Machine Learning Fundamentals", question:"What's the best way to prepare before the course starts?",              time:"2 days ago",   answer:"Review basic Python and linear algebra fundamentals. I'll share a prep guide a week before we start." },
];

const MOCK_INSTRUCTOR_COURSES = [
  { id:1, title:"Python for Data Science",       image:"🐍", status:"active", students:320, rating:4.8, revenue:48000, price:150, startDate:"March 10, 2025" },
  { id:3, title:"Machine Learning Fundamentals", image:"🤖", status:"active", students:180, rating:4.7, revenue:54000, price:300, startDate:"March 20, 2025" },
  { id:9, title:"Data Engineering Bootcamp",     image:"🔧", status:"draft",  students:0,   rating:0,   revenue:0,     price:280, startDate:"TBD" },
];

function InstructorDashboard({ user, setPage }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [requests, setRequests]   = useState(MOCK_REQUESTS);
  const [qaItems, setQaItems]     = useState(MOCK_QA);
  const [replyInputs, setReplyInputs] = useState({});
  const [reqFilter, setReqFilter] = useState("all");
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [courses, setCourses]     = useState(MOCK_INSTRUCTOR_COURSES);

  const name     = user?.name || "Ahmed Hassan";
  const initials = name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();
  const pendingCount  = requests.filter(r=>r.status==="pending").length;
  const unansweredCount = qaItems.filter(q=>!q.answer).length;

  const totalStudents = courses.filter(c=>c.status==="active").reduce((s,c)=>s+c.students,0);
  const totalRevenue  = courses.reduce((s,c)=>s+c.revenue,0);

  const handleRequestAction = (id, action) => {
    setRequests(prev => prev.map(r => r.id===id ? {...r, status: action} : r));
  };

  const handleReply = (id) => {
    const text = replyInputs[id];
    if (!text?.trim()) return;
    setQaItems(prev => prev.map(q => q.id===id ? {...q, answer:text} : q));
    setReplyInputs(prev => ({...prev, [id]:""}));
  };

  const tabs = [
    { key:"overview",  label:"Overview",   icon:"📊" },
    { key:"courses",   label:"My Courses", icon:"📚", badge: null },
    { key:"requests",  label:"Requests",   icon:"📥", badge: pendingCount || null },
    { key:"qa",        label:"Q&A Inbox",  icon:"💬", badge: unansweredCount || null },
    { key:"profile",   label:"My Profile", icon:"👤" },
  ];

  return (
    <div className="inst-dash">
      {showAddCourse && <AddCourseModal onClose={()=>setShowAddCourse(false)} onSave={(c)=>{ setCourses(prev=>[...prev,{...c,id:Date.now(),status:"draft",students:0,rating:0,revenue:0}]); setShowAddCourse(false); setActiveTab("courses"); }} />}
      {editCourse && <EditCourseModal course={editCourse} onClose={()=>setEditCourse(null)} onSave={(updated)=>{ setCourses(prev=>prev.map(c=>c.id===updated.id?{...c,...updated}:c)); setEditCourse(null); }} />}

      {/* Tab bar */}
      <div className="inst-topbar">
        {tabs.map(t => (
          <div key={t.key} className={`inst-tab ${activeTab===t.key?"active":""}`} onClick={()=>setActiveTab(t.key)}>
            <span>{t.icon}</span> {t.label}
            {t.badge && <span className="tab-badge">{t.badge}</span>}
          </div>
        ))}
      </div>

      <div className="inst-content">

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div>
            <div className="inst-page-header">
              <div>
                <div className="inst-page-title">Welcome back, {name.split(" ")[0]} 👋</div>
                <div className="inst-page-sub">Here's what's happening with your courses today</div>
              </div>
              <button className="btn btn-primary" style={{padding:"0.6rem 1.25rem",fontSize:"0.875rem",borderRadius:9}} onClick={()=>setShowAddCourse(true)}>
                + Add New Course
              </button>
            </div>

            {/* Stat cards */}
            <div className="ov-stats">
              {[
                { icon:"👥", val:totalStudents.toLocaleString(), lbl:"Total Students",  trend:"↑ 12 this week",   color:"#6366f1" },
                { icon:"📚", val:courses.length,                 lbl:"Courses",         trend:`${courses.filter(c=>c.status==="active").length} active · ${courses.filter(c=>c.status==="draft").length} draft`, color:"#06b6d4" },
                { icon:"⭐", val:"4.75",                         lbl:"Avg Rating",       trend:"Based on 42 reviews", color:"#fbbf24" },
                { icon:"💰", val:`SDG ${totalRevenue.toLocaleString()}`, lbl:"Total Revenue", trend:"↑ 8% this month", color:"#22c55e" },
              ].map(s => (
                <div key={s.lbl} className="ov-stat-card">
                  <div className="ov-stat-glow" style={{background:s.color}} />
                  <div className="ov-stat-icon">{s.icon}</div>
                  <div className="ov-stat-val" style={{background:`linear-gradient(135deg,${s.color},white)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{s.val}</div>
                  <div className="ov-stat-lbl">{s.lbl}</div>
                  <div className="ov-stat-trend">{s.trend}</div>
                </div>
              ))}
            </div>

            <div className="ov-grid">
              {/* Recent courses */}
              <div className="ov-card">
                <div className="ov-card-hd">
                  📚 Your Courses
                  <span className="ov-see-all" onClick={()=>setActiveTab("courses")}>Manage all →</span>
                </div>
                <div className="ov-card-bd">
                  {courses.map(c => (
                    <div key={c.id} className="ov-course-row">
                      <span className="ov-course-icon">{c.image}</span>
                      <div style={{flex:1}}>
                        <div className="ov-course-name">{c.title}</div>
                        <div className="ov-course-students">{c.students} students · {c.rating>0?`⭐ ${c.rating}`:"No ratings yet"}</div>
                      </div>
                      <span className={`ov-course-status status-${c.status}`}>{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent requests */}
              <div className="ov-card">
                <div className="ov-card-hd">
                  📥 Recent Requests
                  {pendingCount > 0 && <span className="ov-see-all" onClick={()=>setActiveTab("requests")}>{pendingCount} pending →</span>}
                </div>
                <div className="ov-card-bd">
                  {requests.slice(0,4).map(r => (
                    <div key={r.id} className="ov-req-row">
                      {r.status==="pending" && <div className="ov-req-dot" />}
                      <div className="ov-req-avatar">{r.avatar}</div>
                      <div style={{flex:1}}>
                        <div className="ov-req-name">{r.name}</div>
                        <div className="ov-req-course">{r.course}</div>
                      </div>
                      <div>
                        <div className="ov-req-time">{r.time}</div>
                        <div style={{textAlign:"right",marginTop:"0.2rem"}}>
                          <span className={`req-status ${r.status}`}>{r.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MY COURSES ── */}
        {activeTab === "courses" && (
          <div>
            <div className="inst-page-header">
              <div>
                <div className="inst-page-title">My Courses</div>
                <div className="inst-page-sub">{courses.length} courses · {courses.filter(c=>c.status==="active").length} active</div>
              </div>
              <button className="btn btn-primary" style={{padding:"0.6rem 1.25rem",fontSize:"0.875rem",borderRadius:9}} onClick={()=>setShowAddCourse(true)}>
                + Add New Course
              </button>
            </div>
            <div className="courses-mgmt">
              {courses.map(c => (
                <div key={c.id} className="mgmt-course-card">
                  <span className="mgmt-course-emoji">{c.image}</span>
                  <div className="mgmt-course-info">
                    <div className="mgmt-course-name">{c.title}</div>
                    <div className="mgmt-course-meta">
                      <span>📅 {c.startDate}</span>
                      <span>💰 SDG {(c.price*350).toLocaleString()} / student</span>
                      <span className={`ov-course-status status-${c.status}`}>{c.status}</span>
                    </div>
                    <div className="mgmt-course-stats">
                      <div className="mgmt-stat"><div className="mgmt-stat-val">{c.students}</div><div className="mgmt-stat-lbl">Students</div></div>
                      <div className="mgmt-stat"><div className="mgmt-stat-val">{c.rating>0?c.rating:"—"}</div><div className="mgmt-stat-lbl">Rating</div></div>
                      <div className="mgmt-stat"><div className="mgmt-stat-val" style={{color:"var(--cyan)"}}>{c.revenue>0?`SDG ${c.revenue.toLocaleString()}`:"—"}</div><div className="mgmt-stat-lbl">Revenue</div></div>
                    </div>
                  </div>
                  <div className="mgmt-actions">
                    <button className="mgmt-btn mgmt-btn-edit" onClick={()=>setEditCourse(c)}>✏ Edit</button>
                    {c.id <= 8 && <button className="mgmt-btn mgmt-btn-view" onClick={()=>setPage("course-"+c.id)}>👁 View</button>}
                    {c.status==="draft" && <button className="mgmt-btn" style={{background:"rgba(34,197,94,0.1)",borderColor:"rgba(34,197,94,0.3)",color:"#22c55e"}} onClick={()=>setCourses(prev=>prev.map(x=>x.id===c.id?{...x,status:"active"}:x))}>🚀 Publish</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REQUESTS ── */}
        {activeTab === "requests" && (
          <div>
            <div className="inst-page-header">
              <div>
                <div className="inst-page-title">Enrollment Requests</div>
                <div className="inst-page-sub">{pendingCount} pending · {requests.filter(r=>r.status==="accepted").length} accepted · {requests.filter(r=>r.status==="rejected").length} rejected</div>
              </div>
              <div style={{display:"flex",gap:"0.5rem"}}>
                {["all","pending","accepted","rejected"].map(f => (
                  <button key={f} className={`filter-btn ${reqFilter===f?"active":""}`} style={{fontSize:"0.78rem",padding:"0.35rem 0.875rem"}} onClick={()=>setReqFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>
                ))}
              </div>
            </div>
            <div className="requests-list">
              {requests.filter(r=>reqFilter==="all"||r.status===reqFilter).map(r => (
                <div key={r.id} className="req-card">
                  <div className="req-avatar">{r.avatar}</div>
                  <div className="req-info">
                    <div className="req-name">{r.name}</div>
                    <div className="req-course-name">{r.course}</div>
                    <div className="req-details">
                      📞 {r.phone} &nbsp;·&nbsp; 📧 {r.email} &nbsp;·&nbsp;
                      <span className="req-payment-badge">{r.payment === "bank" ? "🏦 Bank Transfer" : "📱 Mobile Money"} · SDG {(r.amount*350).toLocaleString()}</span>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div className="req-time">{r.time}</div>
                    {r.status === "pending"
                      ? <div className="req-actions" style={{marginTop:"0.5rem"}}>
                          <button className="req-btn-accept" onClick={()=>handleRequestAction(r.id,"accepted")}>✓ Accept</button>
                          <button className="req-btn-reject" onClick={()=>handleRequestAction(r.id,"rejected")}>✕ Reject</button>
                        </div>
                      : <span className={`req-status ${r.status}`} style={{display:"inline-block",marginTop:"0.5rem"}}>
                          {r.status === "accepted" ? "✓ Accepted" : "✕ Rejected"}
                        </span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Q&A INBOX ── */}
        {activeTab === "qa" && (
          <div>
            <div className="inst-page-header">
              <div>
                <div className="inst-page-title">Q&A Inbox</div>
                <div className="inst-page-sub">{unansweredCount} unanswered · {qaItems.filter(q=>q.answer).length} answered</div>
              </div>
            </div>
            <div className="iqa-list">
              {qaItems.map(q => (
                <div key={q.id} className={`iqa-card ${q.answer?"answered":""}`}>
                  <div className="iqa-header">
                    <div style={{width:32,height:32,borderRadius:"50%",background:"var(--gradient)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:"0.7rem",color:"white",flexShrink:0}}>
                      {q.anon ? "?" : q.sender[0]+q.sender.split(" ")[1]?.[0]}
                    </div>
                    <div>
                      <div style={{fontWeight:600,fontSize:"0.85rem"}}>{q.anon?"Anonymous":q.sender}</div>
                      <div className="iqa-from">
                        re: <span className="iqa-course-tag">{q.course}</span>
                      </div>
                    </div>
                    <div className="iqa-time">{q.time}</div>
                  </div>
                  <div className="iqa-question">"{q.question}"</div>

                  {q.answer ? (
                    <div className="iqa-reply-area">
                      <div className="iqa-reply-label">✓ Your reply:</div>
                      <div className="iqa-answer-text">{q.answer}</div>
                    </div>
                  ) : (
                    <div className="iqa-reply-area">
                      <div className="iqa-reply-label">Reply to this question:</div>
                      <textarea
                        className="iqa-reply-input"
                        rows={2}
                        placeholder="Write your answer here..."
                        value={replyInputs[q.id] || ""}
                        onChange={e=>setReplyInputs(prev=>({...prev,[q.id]:e.target.value}))}
                      />
                      <div className="iqa-reply-footer">
                        <button className="btn btn-primary" style={{padding:"0.45rem 1.1rem",borderRadius:8,fontSize:"0.82rem"}}
                          disabled={!replyInputs[q.id]?.trim()}
                          onClick={()=>handleReply(q.id)}>
                          Send Reply →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PROFILE ── */}
        {activeTab === "profile" && (
          <div>
            <div className="inst-page-header">
              <div>
                <div className="inst-page-title">My Profile</div>
                <div className="inst-page-sub">This is how students see you on Masar</div>
              </div>
              <button className="btn btn-ghost" style={{padding:"0.6rem 1.25rem",fontSize:"0.875rem",borderRadius:9}} onClick={()=>setPage("instructor-1")}>
                👁 View Public Profile
              </button>
            </div>
            <div className="inst-profile-grid">
              {/* Avatar card */}
              <div className="inst-profile-card">
                <div className="inst-profile-avatar-wrap">
                  <div className="inst-profile-avatar-large">{initials}</div>
                </div>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:"1rem",margin:"0.5rem 0 0.2rem"}}>{name}</div>
                <div style={{fontSize:"0.82rem",color:"var(--indigo-light)"}}>Instructor</div>
                <div style={{fontSize:"0.78rem",color:"var(--text3)",marginTop:"0.5rem"}}>{user?.email}</div>
                <div style={{marginTop:"1rem",paddingTop:"1rem",borderTop:"1px solid var(--border2)",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
                  <div><div style={{fontFamily:"Syne,sans-serif",fontWeight:700}}>{totalStudents}</div><div style={{fontSize:"0.7rem",color:"var(--text3)"}}>Students</div></div>
                  <div><div style={{fontFamily:"Syne,sans-serif",fontWeight:700}}>{courses.length}</div><div style={{fontSize:"0.7rem",color:"var(--text3)"}}>Courses</div></div>
                </div>
              </div>

              {/* Edit form */}
              <div className="inst-profile-form">
                <div className="form-section-title">Basic Information</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.875rem"}}>
                  <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" defaultValue={name} /></div>
                  <div className="form-group"><label className="form-label">Title / Role</label><input className="form-input" defaultValue="Data Scientist" /></div>
                </div>
                <div className="form-group"><label className="form-label">Email</label><input className="form-input" defaultValue={user?.email} /></div>
                <div className="form-group"><label className="form-label">Phone</label><input className="form-input" placeholder="09xxxxxxxxx" /></div>

                <div className="form-section-title">About You</div>
                <div className="form-group"><label className="form-label">Bio <span style={{color:"var(--text3)",fontWeight:400}}>(shown on your profile)</span></label>
                  <textarea className="form-input" rows={3} style={{resize:"none",lineHeight:1.6}} defaultValue="5+ years in data science, ex-Google and currently leading the data team at a Khartoum-based fintech." />
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.875rem"}}>
                  <div className="form-group"><label className="form-label">LinkedIn</label><input className="form-input" placeholder="linkedin.com/in/..." /></div>
                  <div className="form-group"><label className="form-label">GitHub</label><input className="form-input" placeholder="github.com/..." /></div>
                </div>

                <div className="form-section-title">Specializations</div>
                <div className="form-group"><label className="form-label">Skills & Topics <span style={{color:"var(--text3)",fontWeight:400}}>(comma-separated)</span></label>
                  <input className="form-input" defaultValue="Python, Machine Learning, Data Science, Statistics" />
                </div>

                <div style={{display:"flex",justifyContent:"flex-end",gap:"0.75rem",marginTop:"0.5rem"}}>
                  <button className="btn btn-ghost" style={{padding:"0.6rem 1.25rem",borderRadius:9,fontSize:"0.875rem"}} onClick={()=>setProfileSaved(false)}>Discard</button>
                  <button className="btn btn-primary" style={{padding:"0.6rem 1.25rem",borderRadius:9,fontSize:"0.875rem"}} onClick={()=>setProfileSaved(true)}>
                    {profileSaved ? "✓ Saved!" : "Save Changes"}
                  </button>
                </div>
                {profileSaved && <div style={{textAlign:"right",fontSize:"0.78rem",color:"#22c55e",marginTop:"0.4rem"}}>✓ Profile updated successfully</div>}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ---- ADD COURSE MODAL (4-step wizard) ----
function AddCourseModal({ onClose, onSave }) {
  const STEPS = [
    { key:1, label:"Basics",   icon:"📋" },
    { key:2, label:"Schedule", icon:"🗓" },
    { key:3, label:"Content",  icon:"📚" },
    { key:4, label:"Review",   icon:"🚀" },
  ];

  const emojis = ["📚","🐍","🌐","🤖","🎨","🗄️","📊","⚡","📱","☁️","🔧","🧠"];
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    // Step 1 — Basics
    image:"📚", title:"", category:"Data Science", level:"Beginner",
    price:"", mode:"online", description:"",
    // Step 2 — Schedule
    startDate:"", enrollDeadline:"", duration:"",
    scheduleDays:[{ day:"Saturday", time:"10:00", endTime:"12:00", type:"Live Lecture" }],
    meetLink:"", groupLink:"", location:"",
    // Step 3 — Content (weeks)
    weeks:[
      { title:"Introduction", topics:"" },
      { title:"", topics:"" },
    ],
    // Step 4 tags
    tags:"",
  });

  const set = (field, val) => { setForm(f=>({...f,[field]:val})); setErrors(e=>({...e,[field]:""})); };

  const validate = () => {
    const e = {};
    if (step===1) {
      if (!form.title.trim()) e.title = "Required";
      if (!form.price || isNaN(form.price) || +form.price<=0) e.price = "Enter a valid price";
      if (!form.description.trim()) e.description = "Required";
    }
    if (step===2) {
      if (!form.startDate) e.startDate = "Required";
      if (!form.duration.trim()) e.duration = "Required";
    }
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const next = () => { if(validate()) setStep(s=>Math.min(s+1,4)); };
  const back = () => setStep(s=>Math.max(s-1,1));

  const addWeek  = () => setForm(f=>({...f, weeks:[...f.weeks,{title:"",topics:""}]}));
  const setWeek  = (i,field,val) => setForm(f=>{ const w=[...f.weeks]; w[i]={...w[i],[field]:val}; return {...f,weeks:w}; });
  const removeWeek = (i) => setForm(f=>({...f,weeks:f.weeks.filter((_,idx)=>idx!==i)}));

  const addDay   = () => setForm(f=>({...f,scheduleDays:[...f.scheduleDays,{day:"Saturday",time:"10:00",endTime:"12:00",type:"Live Lecture"}]}));
  const setDay   = (i,field,val) => setForm(f=>{ const d=[...f.scheduleDays]; d[i]={...d[i],[field]:val}; return {...f,scheduleDays:d}; });
  const removeDay = (i) => setForm(f=>({...f,scheduleDays:f.scheduleDays.filter((_,idx)=>idx!==i)}));

  const BtnStyle = {padding:"0.65rem 1.35rem",borderRadius:9,fontSize:"0.875rem"};

  const WizardBar = () => (
    <div style={{marginBottom:"1.5rem"}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"var(--text3)",marginBottom:"0.4rem"}}>
        <span>Step {step} of 4</span>
        <span style={{color:"var(--indigo-light)",fontWeight:600}}>{STEPS[step-1].label}</span>
      </div>
      <div style={{height:4,background:"var(--border2)",borderRadius:100,overflow:"hidden"}}>
        <div style={{height:"100%",background:"var(--gradient)",borderRadius:100,width:`${(step/4)*100}%`,transition:"width 0.4s ease"}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:"0.75rem"}}>
        {STEPS.map(s=>(
          <div key={s.key} style={{display:"flex",alignItems:"center",gap:"0.35rem",opacity:step>=s.key?1:0.4,transition:"opacity 0.3s"}}>
            <div style={{width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.7rem",background:step>s.key?"var(--cyan)":step===s.key?"var(--indigo)":"var(--bg3)",color:"white",fontWeight:700,transition:"background 0.3s",flexShrink:0}}>
              {step>s.key?"✓":s.icon}
            </div>
            <span style={{fontSize:"0.75rem",fontWeight:step===s.key?600:400,color:step===s.key?"var(--text)":"var(--text3)"}}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (done) return (
    <div className="add-course-overlay">
      <div className="add-course-modal">
        <div className="acm-body" style={{textAlign:"center",padding:"2.5rem 1.5rem"}}>
          <div style={{fontSize:"3.5rem",marginBottom:"1rem",animation:"bounceIn 0.5s ease"}}>🎉</div>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1.25rem",marginBottom:"0.5rem"}}>Course Created!</div>
          <div style={{fontSize:"0.875rem",color:"var(--text2)",lineHeight:1.7,marginBottom:"1.5rem"}}>
            <strong style={{color:"var(--text)"}}>{form.title}</strong> has been saved as a{" "}
            <span style={{color:"#fbbf24",fontWeight:600}}>Draft</span>.<br/>
            Review it in <strong>My Courses</strong> and publish when ready.
          </div>
          <div style={{background:"var(--bg3)",borderRadius:12,padding:"1rem",marginBottom:"1.5rem",textAlign:"left"}}>
            <div style={{display:"flex",gap:"0.75rem",alignItems:"center",marginBottom:"0.75rem"}}>
              <span style={{fontSize:"2rem"}}>{form.image}</span>
              <div>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:700}}>{form.title}</div>
                <div style={{fontSize:"0.78rem",color:"var(--text3)"}}>{form.category} · {form.level} · {form.mode}</div>
              </div>
              <div style={{marginLeft:"auto",fontFamily:"Syne,sans-serif",fontWeight:800,color:"var(--cyan)",fontSize:"1.1rem"}}>${form.price}</div>
            </div>
            {form.weeks.filter(w=>w.title).length>0 && (
              <div style={{fontSize:"0.78rem",color:"var(--text3)"}}>
                📚 {form.weeks.filter(w=>w.title).length} weeks · 📅 Starts {form.startDate||"TBD"}
              </div>
            )}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
            <button className="btn btn-ghost" style={BtnStyle} onClick={onClose}>Done</button>
            <button className="btn btn-primary" style={BtnStyle} onClick={onClose}>Go to My Courses →</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="add-course-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="add-course-modal">

        {/* Header */}
        <div className="acm-header">
          <div>
            <div className="acm-title">{["","Course Basics","Schedule & Delivery","Course Content","Review & Publish"][step]}</div>
            <div className="acm-sub">{["","Icon, title, price, and description","Dates, timing, and access links","Weekly curriculum","Final check before saving"][step]}</div>
          </div>
          <button className="em-close" onClick={onClose}>✕</button>
        </div>

        <div className="acm-body">
          <WizardBar />

          {/* ── STEP 1: BASICS ── */}
          {step===1 && (
            <>
              <div className="form-group">
                <label className="form-label">Course Icon</label>
                <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
                  {emojis.map(e=>(
                    <div key={e} onClick={()=>set("image",e)}
                      style={{width:36,height:36,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.25rem",cursor:"pointer",border:`1.5px solid ${form.image===e?"var(--indigo)":"var(--border2)"}`,background:form.image===e?"rgba(99,102,241,0.1)":"var(--bg)",transition:"all 0.15s"}}>
                      {e}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Course Title *</label>
                <input className={`form-input ${errors.title?"input-error":""}`} placeholder="e.g. Python for Data Science" value={form.title} onChange={e=>set("title",e.target.value)} />
                {errors.title && <div style={{fontSize:"0.72rem",color:"#f87171",marginTop:"0.25rem"}}>⚠ {errors.title}</div>}
              </div>

              <div className="acm-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="acm-select" value={form.category} onChange={e=>set("category",e.target.value)}>
                    {["Data Science","Programming","Computer Science","Design","Other"].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Level</label>
                  <select className="acm-select" value={form.level} onChange={e=>set("level",e.target.value)}>
                    {["Beginner","Intermediate","Advanced"].map(l=><option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="acm-row">
                <div className="form-group">
                  <label className="form-label">Price (USD) *</label>
                  <input className={`form-input ${errors.price?"input-error":""}`} type="number" min="1" placeholder="150" value={form.price} onChange={e=>set("price",e.target.value)} />
                  {errors.price && <div style={{fontSize:"0.72rem",color:"#f87171",marginTop:"0.25rem"}}>⚠ {errors.price}</div>}
                  {form.price>0 && <div style={{fontSize:"0.72rem",color:"var(--text3)",marginTop:"0.25rem"}}>≈ SDG {(form.price*350).toLocaleString()}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Delivery Mode</label>
                  <select className="acm-select" value={form.mode} onChange={e=>set("mode",e.target.value)}>
                    {[["online","🟢 Online"],["in-person","🟡 In-Person"],["hybrid","🔵 Hybrid"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">About this Course *</label>
                <textarea className={`acm-textarea ${errors.description?"input-error":""}`} rows={3} placeholder="What will students learn? Who is it for? What makes it unique?" value={form.description} onChange={e=>set("description",e.target.value)} />
                {errors.description && <div style={{fontSize:"0.72rem",color:"#f87171",marginTop:"0.25rem"}}>⚠ {errors.description}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Tags <span style={{fontWeight:400,color:"var(--text3)"}}>(comma-separated)</span></label>
                <input className="form-input" placeholder="Python, Pandas, NumPy, Data Analysis" value={form.tags} onChange={e=>set("tags",e.target.value)} />
              </div>
            </>
          )}

          {/* ── STEP 2: SCHEDULE ── */}
          {step===2 && (
            <>
              <div className="acm-row">
                <div className="form-group">
                  <label className="form-label">Start Date *</label>
                  <input className={`form-input ${errors.startDate?"input-error":""}`} type="date" value={form.startDate} onChange={e=>set("startDate",e.target.value)} />
                  {errors.startDate && <div style={{fontSize:"0.72rem",color:"#f87171",marginTop:"0.25rem"}}>⚠ {errors.startDate}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Enrollment Deadline</label>
                  <input className="form-input" type="date" value={form.enrollDeadline} onChange={e=>set("enrollDeadline",e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Duration *</label>
                <input className={`form-input ${errors.duration?"input-error":""}`} placeholder="e.g. 8 weeks" value={form.duration} onChange={e=>set("duration",e.target.value)} />
                {errors.duration && <div style={{fontSize:"0.72rem",color:"#f87171",marginTop:"0.25rem"}}>⚠ {errors.duration}</div>}
              </div>

              <div style={{marginBottom:"0.75rem"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.5rem"}}>
                  <label className="form-label" style={{margin:0}}>Lecture Days & Times</label>
                  <button onClick={addDay} style={{fontSize:"0.75rem",color:"var(--indigo-light)",background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:6,padding:"0.2rem 0.6rem",cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}>+ Add Day</button>
                </div>
                {form.scheduleDays.map((d,i)=>(
                  <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:"0.5rem",marginBottom:"0.5rem",alignItems:"center"}}>
                    <select className="acm-select" style={{fontSize:"0.8rem",padding:"0.55rem 0.7rem"}} value={d.day} onChange={e=>setDay(i,"day",e.target.value)}>
                      {["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"].map(dy=><option key={dy}>{dy}</option>)}
                    </select>
                    <input className="form-input" style={{fontSize:"0.8rem",padding:"0.55rem 0.7rem"}} type="time" value={d.time} onChange={e=>setDay(i,"time",e.target.value)} />
                    <select className="acm-select" style={{fontSize:"0.78rem",padding:"0.55rem 0.7rem"}} value={d.type} onChange={e=>setDay(i,"type",e.target.value)}>
                      {["Live Lecture","Lab / Practice","Project Review","Q&A Session"].map(t=><option key={t}>{t}</option>)}
                    </select>
                    {form.scheduleDays.length>1 && (
                      <button onClick={()=>removeDay(i)} style={{color:"#f87171",background:"none",border:"none",cursor:"pointer",fontSize:"1rem",padding:"0.2rem",lineHeight:1}}>✕</button>
                    )}
                  </div>
                ))}
              </div>

              {(form.mode==="online"||form.mode==="hybrid") && (
                <>
                  <div className="acm-section-title">🔗 Online Access Links</div>
                  <div className="form-group">
                    <label className="form-label">Zoom / Google Meet Link</label>
                    <input className="form-input" placeholder="https://zoom.us/j/..." value={form.meetLink} onChange={e=>set("meetLink",e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">WhatsApp / Telegram Group Link</label>
                    <input className="form-input" placeholder="https://chat.whatsapp.com/..." value={form.groupLink} onChange={e=>set("groupLink",e.target.value)} />
                  </div>
                </>
              )}

              {(form.mode==="in-person"||form.mode==="hybrid") && (
                <>
                  <div className="acm-section-title">📍 Venue</div>
                  <div className="form-group">
                    <label className="form-label">Location / Address</label>
                    <input className="form-input" placeholder="Street, area, city" value={form.location} onChange={e=>set("location",e.target.value)} />
                  </div>
                </>
              )}
            </>
          )}

          {/* ── STEP 3: CONTENT ── */}
          {step===3 && (
            <>
              <div style={{fontSize:"0.82rem",color:"var(--text2)",lineHeight:1.6,marginBottom:"1rem"}}>
                Add your weekly curriculum. Students see this on the course page.
              </div>
              {form.weeks.map((w,i)=>(
                <div key={i} style={{display:"flex",gap:"0.6rem",marginBottom:"0.6rem",alignItems:"flex-start"}}>
                  <div style={{width:30,height:30,borderRadius:7,background:"rgba(99,102,241,0.12)",color:"var(--indigo-light)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:"0.75rem",flexShrink:0,marginTop:2}}>W{i+1}</div>
                  <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:"0.5rem"}}>
                    <input className="form-input" style={{fontSize:"0.82rem",padding:"0.55rem 0.7rem"}} placeholder={`Week ${i+1} title`} value={w.title} onChange={e=>setWeek(i,"title",e.target.value)} />
                    <input className="form-input" style={{fontSize:"0.82rem",padding:"0.55rem 0.7rem"}} placeholder="Topics (comma-separated)" value={w.topics} onChange={e=>setWeek(i,"topics",e.target.value)} />
                  </div>
                  {form.weeks.length>1 && (
                    <button onClick={()=>removeWeek(i)} style={{color:"#f87171",background:"none",border:"none",cursor:"pointer",fontSize:"1rem",lineHeight:1,padding:"0.4rem",marginTop:2}}>✕</button>
                  )}
                </div>
              ))}
              <button onClick={addWeek} style={{width:"100%",padding:"0.6rem",borderRadius:8,border:"1.5px dashed var(--border2)",background:"transparent",color:"var(--text2)",cursor:"pointer",fontSize:"0.82rem",fontFamily:"DM Sans,sans-serif",marginTop:"0.25rem",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.target.style.borderColor="var(--indigo)";e.target.style.color="var(--indigo-light)"}}
                onMouseLeave={e=>{e.target.style.borderColor="var(--border2)";e.target.style.color="var(--text2)"}}>
                + Add Week
              </button>
            </>
          )}

          {/* ── STEP 4: REVIEW ── */}
          {step===4 && (
            <>
              <div style={{fontSize:"0.85rem",color:"var(--text2)",marginBottom:"1rem"}}>Review everything before saving. You can still edit after publishing.</div>

              {/* Summary card */}
              <div style={{background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:12,padding:"1.25rem",marginBottom:"1rem"}}>
                <div style={{display:"flex",gap:"0.875rem",alignItems:"center",marginBottom:"1rem"}}>
                  <span style={{fontSize:"2.25rem"}}>{form.image}</span>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1rem",marginBottom:"0.15rem"}}>{form.title||<em style={{color:"var(--text3)"}}>No title</em>}</div>
                    <div style={{fontSize:"0.78rem",color:"var(--text3)",display:"flex",gap:"0.6rem",flexWrap:"wrap"}}>
                      <span>{form.category}</span><span>·</span><span>{form.level}</span>
                      <span>·</span><span style={{textTransform:"capitalize"}}>{form.mode}</span>
                    </div>
                  </div>
                  <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"var(--cyan)",fontSize:"1.15rem"}}>${form.price}</div>
                </div>

                {[
                  ["📅 Start Date", form.startDate||"—"],
                  ["⏱ Duration",   form.duration||"—"],
                  ["📚 Weeks",     form.weeks.filter(w=>w.title).length + " defined"],
                  ["🗓 Sessions",  form.scheduleDays.length + " session type(s)"],
                  ...(form.meetLink ? [["💻 Meet Link","✓ Added"]] : []),
                  ...(form.groupLink ? [["💬 Group Link","✓ Added"]] : []),
                ].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"0.4rem 0",borderBottom:"1px solid var(--border2)",fontSize:"0.82rem"}}>
                    <span style={{color:"var(--text3)"}}>{k}</span>
                    <span style={{fontWeight:600}}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{background:"rgba(34,197,94,0.06)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:10,padding:"0.875rem",fontSize:"0.82rem",color:"var(--text2)"}}>
                💡 The course will be saved as a <strong style={{color:"#fbbf24"}}>Draft</strong> — visible only to you until you choose to publish it.
              </div>
            </>
          )}
        </div>

        <div className="acm-footer">
          <button className="btn btn-ghost" style={BtnStyle} onClick={step===1?onClose:back}>
            {step===1?"Cancel":"← Back"}
          </button>
          <div style={{display:"flex",gap:"0.5rem",marginLeft:"auto"}}>
            {step<4
              ? <button className="btn btn-primary" style={BtnStyle} onClick={next}>Continue →</button>
              : <>
                  <button className="btn btn-outline" style={BtnStyle} onClick={()=>{onSave(form);setDone(true);}}>Save as Draft</button>
                  <button className="btn btn-primary" style={{...BtnStyle,display:"flex",alignItems:"center",gap:"0.4rem"}} onClick={()=>{onSave(form);setDone(true);}}>
                    🚀 Create Course
                  </button>
                </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// CENTER OWNER DASHBOARD
// ============================================================

const CENTER_MOCK_INSTRUCTORS = [
  { id:1, name:"Ahmed Hassan",    avatar:"AH", title:"Data Scientist",      courses:2, students:320, rating:4.8, revenue:168000, feePerStudent:50, status:"active",  joinDate:"Jan 2024" },
  { id:2, name:"Sara Mohamed",    avatar:"SM", title:"Full Stack Dev",       courses:1, students:210, rating:4.9, revenue:87500,  feePerStudent:50, status:"active",  joinDate:"Mar 2024" },
  { id:3, name:"Khalid Ibrahim",  avatar:"KI", title:"ML Engineer",          courses:1, students:180, rating:4.7, revenue:94500,  feePerStudent:50, status:"active",  joinDate:"Feb 2024" },
  { id:4, name:"Amira Osman",     avatar:"AO", title:"UI/UX Designer",       courses:1, students:0,   rating:0,   revenue:0,      feePerStudent:50, status:"pending", joinDate:"This week" },
];

const CENTER_MOCK_COURSES = [
  { id:1, image:"🐍", title:"Python for Data Science",       instructor:"Ahmed Hassan",  students:320, price:150, centerFee:50, status:"published", rating:4.8, publishDate:"Jan 10, 2024" },
  { id:3, image:"🤖", title:"Machine Learning Fundamentals", instructor:"Khalid Ibrahim",students:180, price:300, centerFee:50, status:"published", rating:4.7, publishDate:"Feb 5, 2024"  },
  { id:2, image:"🌐", title:"Full Stack Web Development",    instructor:"Sara Mohamed",  students:210, price:250, centerFee:50, status:"published", rating:4.9, publishDate:"Mar 1, 2024"  },
  { id:9, image:"🔧", title:"Data Engineering Bootcamp",     instructor:"Ahmed Hassan",  students:0,   price:280, centerFee:50, status:"active",    rating:0,   publishDate:"This week"     },
  { id:10,image:"🎨", title:"UI/UX Fundamentals",            instructor:"Amira Osman",   students:0,   price:120, centerFee:50, status:"draft",     rating:0,   publishDate:"—"             },
];

const CENTER_MOCK_REQUESTS = [
  { id:1, name:"Rania Hassan",  avatar:"RH", course:"Python for Data Science",       instructor:"Ahmed Hassan",  payment:"bank", amount:150, time:"2h ago",  status:"pending"  },
  { id:2, name:"Kamal Ibrahim", avatar:"KI", course:"Machine Learning Fundamentals", instructor:"Khalid Ibrahim",payment:"momo", amount:300, time:"4h ago",  status:"pending"  },
  { id:3, name:"Nour Abdallah", avatar:"NA", course:"Full Stack Web Development",    instructor:"Sara Mohamed",  payment:"bank", amount:250, time:"1d ago",  status:"accepted" },
  { id:4, name:"Yassir Musa",   avatar:"YM", course:"Python for Data Science",       instructor:"Ahmed Hassan",  payment:"momo", amount:150, time:"2d ago",  status:"rejected" },
  { id:5, name:"Salma Elzain",  avatar:"SE", course:"Machine Learning Fundamentals", instructor:"Khalid Ibrahim",payment:"bank", amount:300, time:"3d ago",  status:"accepted" },
];

const CENTER_FINANCES = {
  // Flat fee model: center earns SDG 50 per enrolled student (instructors keep the rest)
  feePerStudent: 50,
  totalStudents: 710,
  totalFeeRevenue: 35500,   // 710 students × SDG 50
  thisMonth: 6000,          // ~120 new students × SDG 50
  pending: 2500,            // fees not yet collected
  instructorEarnings: [
    { name:"Ahmed Hassan",   avatar:"AH", students:320, price:150, grossSDG:168000, centerFee:16000, netSDG:152000, paid:140000, due:12000 },
    { name:"Sara Mohamed",   avatar:"SM", students:210, price:250, grossSDG:87500,  centerFee:10500, netSDG:77000,  paid:77000,  due:0     },
    { name:"Khalid Ibrahim", avatar:"KI", students:180, price:300, grossSDG:94500,  centerFee:9000,  netSDG:85500,  paid:75000,  due:10500 },
  ],
};

function CenterOwnerDashboard({ user, setPage }) {
  const [activeTab, setActiveTab]   = useState("overview");
  const [instructors, setInstructors] = useState(CENTER_MOCK_INSTRUCTORS);
  const [courses, setCourses]       = useState(CENTER_MOCK_COURSES);
  const [requests, setRequests]     = useState(CENTER_MOCK_REQUESTS);
  const [showAddInstructor, setShowAddInstructor] = useState(false);
  const [editSplitInstructor, setEditSplitInstructor] = useState(null);
  const [reviewCourse, setReviewCourse] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [paidInstructors, setPaidInstructors] = useState([]);
  const [centerProfileSaved, setCenterProfileSaved] = useState(false);

  const center = CENTERS[0]; // Code Academy Sudan as default
  const name   = user?.name || "Omar Salih";
  const initials = name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase();

  const pendingRequests  = requests.filter(r=>r.status==="pending").length;
  const pendingCourses   = 0; // Center views only — instructors publish freely
  const totalBadge       = pendingRequests + pendingCourses;
  const activeInstructors = instructors.filter(i=>i.status==="active").length;
  const totalStudents    = instructors.filter(i=>i.status==="active").reduce((s,i)=>s+i.students,0);

  const handleRequestAction = (id, action) =>
    setRequests(prev=>prev.map(r=>r.id===id?{...r,status:action}:r));

  const handleCourseAction = (id, action) =>
    setCourses(prev=>prev.map(c=>c.id===id?{...c,status:action==="approve"?"published":action==="reject"?"rejected":"draft"}:c));

  const handleInstructorAction = (id, action) =>
    setInstructors(prev=>prev.map(i=>i.id===id?{...i,status:action}:i));

  const tabs = [
    { key:"overview",     label:"Overview",     icon:"📊" },
    { key:"instructors",  label:"Instructors",  icon:"👨‍🏫", badge: instructors.filter(i=>i.status==="pending").length || null },
    { key:"courses",      label:"Courses",      icon:"📚",  badge: pendingCourses || null },
    { key:"requests",     label:"Requests",     icon:"📥",  badge: pendingRequests || null },
    { key:"finances",     label:"Finances",     icon:"💰" },
    { key:"profile",      label:"Center Profile",icon:"🏢" },
  ];

  const StatCard = ({icon,val,lbl,trend,color,onClick}) => (
    <div className="ov-stat-card" style={onClick?{cursor:"pointer"}:{}} onClick={onClick}>
      <div className="ov-stat-glow" style={{background:color}}/>
      <div className="ov-stat-icon">{icon}</div>
      <div className="ov-stat-val" style={{background:`linear-gradient(135deg,${color},white)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{val}</div>
      <div className="ov-stat-lbl">{lbl}</div>
      <div className="ov-stat-trend">{trend}</div>
    </div>
  );

  return (
    <div className="inst-dash">
      {/* Course review modal */}
      {reviewCourse && (
        <CourseReviewModal
          course={reviewCourse}
          onClose={()=>setReviewCourse(null)}
          onApprove={()=>{handleCourseAction(reviewCourse.id,"approve");setReviewCourse(null);}}
          onReject={()=>{handleCourseAction(reviewCourse.id,"reject");setReviewCourse(null);}}
        />
      )}
      {/* Edit fee modal */}
      {editSplitInstructor && (
        <div className="add-course-overlay" onClick={e=>e.target===e.currentTarget&&setEditSplitInstructor(null)}>
          <div className="add-course-modal" style={{maxWidth:400}}>
            <div className="acm-header">
              <div><div className="acm-title">Edit Center Fee</div><div className="acm-sub">{editSplitInstructor.name}</div></div>
              <button className="em-close" onClick={()=>setEditSplitInstructor(null)}>✕</button>
            </div>
            <div className="acm-body">
              <div className="form-group">
                <label className="form-label">Center fee per student (SDG)</label>
                <input className="form-input" type="number" min="0"
                  defaultValue={editSplitInstructor.feePerStudent}
                  id="feeInput"
                  onChange={e=>setEditSplitInstructor(prev=>({...prev,feePerStudent:+e.target.value}))}
                />
                <div style={{fontSize:"0.75rem",color:"var(--text3)",marginTop:"0.35rem"}}>
                  Current: SDG {editSplitInstructor.feePerStudent} × {editSplitInstructor.students} students = SDG {editSplitInstructor.feePerStudent*editSplitInstructor.students}
                </div>
              </div>
            </div>
            <div className="acm-footer">
              <button className="btn btn-ghost" style={{padding:"0.6rem 1.1rem",borderRadius:9,fontSize:"0.875rem"}} onClick={()=>setEditSplitInstructor(null)}>Cancel</button>
              <button className="btn btn-primary" style={{padding:"0.6rem 1.25rem",borderRadius:9,fontSize:"0.875rem"}} onClick={()=>{
                setInstructors(prev=>prev.map(i=>i.id===editSplitInstructor.id?{...i,feePerStudent:editSplitInstructor.feePerStudent}:i));
                setEditSplitInstructor(null);
              }}>Save →</button>
            </div>
          </div>
        </div>
      )}
      {/* Add instructor modal */}
      {showAddInstructor && (
        <AddInstructorModal
          onClose={()=>setShowAddInstructor(false)}
          onAdd={(inst)=>setInstructors(prev=>[...prev,{...inst,id:Date.now(),courses:0,students:0,rating:0,revenue:0,status:"pending",joinDate:"Just now"}])}
        />
      )}

      {/* Tab bar */}
      <div className="inst-topbar">
        {tabs.map(t=>(
          <div key={t.key} className={`inst-tab ${activeTab===t.key?"active":""}`} onClick={()=>setActiveTab(t.key)}>
            <span>{t.icon}</span> {t.label}
            {t.badge>0 && <span className="tab-badge">{t.badge}</span>}
          </div>
        ))}
      </div>

      <div className="inst-content">

        {/* ── OVERVIEW ── */}
        {activeTab==="overview" && (
          <div>
            <div className="inst-page-header">
              <div>
                <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"0.25rem"}}>
                  <div style={{width:42,height:42,borderRadius:10,background:center.color,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Syne,sans-serif",fontWeight:800,color:"white",fontSize:"1rem"}}>{center.logo}</div>
                  <div>
                    <div className="inst-page-title" style={{marginBottom:0}}>{center.name}</div>
                    <div className="inst-page-sub">{center.tagline}</div>
                  </div>
                </div>
              </div>
              <div style={{display:"flex",gap:"0.5rem"}}>
                {totalBadge>0 && (
                  <div style={{background:"rgba(251,191,36,0.12)",border:"1px solid rgba(251,191,36,0.3)",borderRadius:9,padding:"0.5rem 1rem",fontSize:"0.82rem",color:"#fbbf24",fontWeight:600,cursor:"pointer"}}
                    onClick={()=>setActiveTab(pendingCourses>0?"courses":"requests")}>
                    ⚠ {totalBadge} items need attention
                  </div>
                )}
                <button className="btn btn-primary" style={{padding:"0.6rem 1.25rem",fontSize:"0.875rem",borderRadius:9}} onClick={()=>setShowAddInstructor(true)}>
                  + Add Instructor
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="ov-stats">
              <StatCard icon="👥" val={totalStudents.toLocaleString()} lbl="Total Students" trend={`across ${activeInstructors} instructors`} color="#6366f1" />
              <StatCard icon="📚" val={courses.filter(c=>c.status==="published").length} lbl="Active Courses" trend={"Instructors publish freely"} color="#06b6d4" onClick={pendingCourses?()=>setActiveTab("courses"):null} />
              <StatCard icon="⭐" val="4.8" lbl="Center Rating" trend="Top 5% on Masar" color="#fbbf24" />
              <StatCard icon="💰" val={`SDG ${(CENTER_FINANCES.totalFeeRevenue/1000).toFixed(1)}K`} lbl="Fee Revenue" trend={`SDG ${CENTER_FINANCES.feePerStudent}/student · ${CENTER_FINANCES.totalStudents} enrolled`} color="#22c55e" onClick={()=>setActiveTab("finances")} />
            </div>

            <div className="ov-grid">
              {/* Instructors snapshot */}
              <div className="ov-card">
                <div className="ov-card-hd">
                  👨‍🏫 Instructors
                  <span className="ov-see-all" onClick={()=>setActiveTab("instructors")}>Manage →</span>
                </div>
                <div className="ov-card-bd">
                  {instructors.map(i=>(
                    <div key={i.id} className="ov-course-row">
                      <div style={{width:32,height:32,borderRadius:"50%",background:"var(--gradient)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.68rem",fontWeight:700,color:"white",fontFamily:"Syne,sans-serif",flexShrink:0}}>{i.avatar}</div>
                      <div style={{flex:1}}>
                        <div className="ov-course-name">{i.name}</div>
                        <div className="ov-course-students">{i.students} students · {i.courses} course(s)</div>
                      </div>
                      <span className={`ov-course-status status-${i.status==="active"?"active":"draft"}`}>{i.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent requests */}
              <div className="ov-card">
                <div className="ov-card-hd">
                  📥 Recent Requests
                  {pendingRequests>0 && <span className="ov-see-all" onClick={()=>setActiveTab("requests")}>{pendingRequests} pending →</span>}
                </div>
                <div className="ov-card-bd">
                  {requests.slice(0,4).map(r=>(
                    <div key={r.id} className="ov-req-row">
                      {r.status==="pending" && <div className="ov-req-dot"/>}
                      <div className="ov-req-avatar">{r.avatar}</div>
                      <div style={{flex:1}}>
                        <div className="ov-req-name">{r.name}</div>
                        <div className="ov-req-course">{r.course} · {r.instructor}</div>
                      </div>
                      <div>
                        <div className="ov-req-time">{r.time}</div>
                        <div style={{textAlign:"right",marginTop:"0.2rem"}}>
                          <span className={`req-status ${r.status}`}>{r.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── INSTRUCTORS ── */}
        {activeTab==="instructors" && (
          <div>
            <div className="inst-page-header">
              <div>
                <div className="inst-page-title">Instructors</div>
                <div className="inst-page-sub">{activeInstructors} active · {instructors.filter(i=>i.status==="pending").length} pending approval</div>
              </div>
              <button className="btn btn-primary" style={{padding:"0.6rem 1.25rem",fontSize:"0.875rem",borderRadius:9}} onClick={()=>setShowAddInstructor(true)}>
                + Add Instructor
              </button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"0.875rem"}}>
              {instructors.map(i=>(
                <div key={i.id} className="mgmt-course-card" style={{alignItems:"flex-start"}}>
                  <div style={{width:50,height:50,borderRadius:"50%",background:"var(--gradient)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.95rem",fontWeight:800,color:"white",fontFamily:"Syne,sans-serif",flexShrink:0}}>{i.avatar}</div>
                  <div className="mgmt-course-info">
                    <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.25rem"}}>
                      <div className="mgmt-course-name" style={{marginBottom:0}}>{i.name}</div>
                      <span className={`ov-course-status status-${i.status==="active"?"active":"draft"}`}>{i.status}</span>
                    </div>
                    <div className="mgmt-course-meta">
                      <span>🎓 {i.title}</span>
                      <span>📅 Joined {i.joinDate}</span>
                      <span>💸 SDG {i.feePerStudent} flat fee / student</span>
                    </div>
                    <div className="mgmt-course-stats">
                      <div className="mgmt-stat"><div className="mgmt-stat-val">{i.courses}</div><div className="mgmt-stat-lbl">Courses</div></div>
                      <div className="mgmt-stat"><div className="mgmt-stat-val">{i.students}</div><div className="mgmt-stat-lbl">Students</div></div>
                      <div className="mgmt-stat"><div className="mgmt-stat-val">{i.rating>0?i.rating:"—"}</div><div className="mgmt-stat-lbl">Rating</div></div>
                      <div className="mgmt-stat"><div className="mgmt-stat-val" style={{color:"var(--cyan)"}}>{i.revenue>0?`SDG ${(i.revenue/1000).toFixed(0)}K`:"—"}</div><div className="mgmt-stat-lbl">Revenue</div></div>
                    </div>
                  </div>
                  <div className="mgmt-actions" style={{flexDirection:"column",alignItems:"flex-end",gap:"0.4rem"}}>
                    {i.status==="pending"
                      ? <><button className="req-btn-accept" onClick={()=>handleInstructorAction(i.id,"active")}>✓ Approve</button>
                           <button className="req-btn-reject" onClick={()=>handleInstructorAction(i.id,"rejected")}>✕ Reject</button></>
                      : <><button className="mgmt-btn mgmt-btn-edit" onClick={()=>setEditSplitInstructor(i)}>✏ Edit Fee</button>
                           <button className="mgmt-btn" style={i.status==="active"?{background:"rgba(248,113,113,0.1)",borderColor:"rgba(248,113,113,0.25)",color:"#f87171"}:{background:"rgba(34,197,94,0.1)",borderColor:"rgba(34,197,94,0.3)",color:"#22c55e"}}
                             onClick={()=>handleInstructorAction(i.id,i.status==="active"?"suspended":"active")}>
                             {i.status==="active"?"⏸ Suspend":"▶ Reactivate"}
                           </button></>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── COURSES ── */}
        {activeTab==="courses" && (
          <div>
            <div className="inst-page-header">
              <div>
                <div className="inst-page-title">All Courses</div>
                <div className="inst-page-sub">{courses.filter(c=>c.status==="published").length} published · {pendingCourses} pending review · {courses.filter(c=>c.status==="draft").length} drafts</div>
              </div>
            </div>
            <div style={{background:"rgba(6,182,212,0.06)",border:"1px solid rgba(6,182,212,0.15)",borderRadius:10,padding:"0.75rem 1.1rem",marginBottom:"1.25rem",fontSize:"0.82rem",color:"var(--text2)",display:"flex",alignItems:"center",gap:"0.75rem"}}>
              <span>ℹ️</span>
              <span>Instructors publish courses freely. Each enrollment generates a <strong style={{color:"var(--cyan)"}}>SDG {CENTER_FINANCES.feePerStudent} flat fee</strong> for the center.</span>
            </div>
            <div className="courses-mgmt">
              {courses.map(c=>(
                <div key={c.id} className="mgmt-course-card" style={c.status==="pending"?{borderColor:"rgba(251,191,36,0.4)",background:"rgba(251,191,36,0.03)"}:{}}>
                  <span className="mgmt-course-emoji">{c.image}</span>
                  <div className="mgmt-course-info">
                    <div style={{display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.3rem"}}>
                      <div className="mgmt-course-name" style={{marginBottom:0}}>{c.title}</div>
                      <span className={`ov-course-status`} style={
                        c.status==="published"?{background:"rgba(34,197,94,0.1)",color:"#22c55e"}:
                        c.status==="pending"?{background:"rgba(251,191,36,0.1)",color:"#fbbf24"}:
                        {background:"rgba(148,163,184,0.1)",color:"var(--text3)"}
                      }>{c.status}</span>
                    </div>
                    <div className="mgmt-course-meta">
                      <span>👨‍🏫 {c.instructor}</span>
                      <span>💰 ${c.price} / student</span>
                      <span>🏢 SDG {c.centerFee} center fee</span>
                      <span>📅 Published {c.publishDate}</span>
                    </div>
                    <div className="mgmt-course-stats">
                      <div className="mgmt-stat"><div className="mgmt-stat-val">{c.students}</div><div className="mgmt-stat-lbl">Students</div></div>
                      <div className="mgmt-stat"><div className="mgmt-stat-val">{c.rating>0?c.rating:"—"}</div><div className="mgmt-stat-lbl">Rating</div></div>
                      <div className="mgmt-stat"><div className="mgmt-stat-val" style={{color:"var(--cyan)"}}>{c.revenue>0?`SDG ${c.revenue.toLocaleString()}`:"—"}</div><div className="mgmt-stat-lbl">Revenue</div></div>
                    </div>
                  </div>
                  <div className="mgmt-actions" style={{flexDirection:"column",alignItems:"flex-end",gap:"0.4rem"}}>
                    <>
                      {c.id<=8 && <button className="mgmt-btn mgmt-btn-view" onClick={()=>setPage("course-"+c.id)}>👁 View</button>}
                    </>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REQUESTS ── */}
        {activeTab==="requests" && (
          <div>
            <div className="inst-page-header">
              <div>
                <div className="inst-page-title">Enrollment Requests</div>
                <div className="inst-page-sub">{pendingRequests} pending · {requests.filter(r=>r.status==="accepted").length} accepted · {requests.filter(r=>r.status==="rejected").length} rejected</div>
              </div>
            </div>
            <div className="requests-list">
              {requests.map(r=>(
                <div key={r.id} className="req-card">
                  <div className="req-avatar">{r.avatar}</div>
                  <div className="req-info">
                    <div className="req-name">{r.name}</div>
                    <div className="req-course-name">{r.course}</div>
                    <div className="req-details">
                      👨‍🏫 {r.instructor} &nbsp;·&nbsp;
                      <span className="req-payment-badge">{r.payment==="bank"?"🏦 Bank":"📱 Mobile Money"} · SDG {(r.amount*350).toLocaleString()}</span>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div className="req-time">{r.time}</div>
                    {r.status==="pending"
                      ? <div className="req-actions" style={{marginTop:"0.5rem"}}>
                          <button className="req-btn-accept" onClick={()=>handleRequestAction(r.id,"accepted")}>✓ Accept</button>
                          <button className="req-btn-reject" onClick={()=>handleRequestAction(r.id,"rejected")}>✕ Reject</button>
                        </div>
                      : <span className={`req-status ${r.status}`} style={{display:"inline-block",marginTop:"0.5rem"}}>
                          {r.status==="accepted"?"✓ Accepted":"✕ Rejected"}
                        </span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FINANCES ── */}
        {activeTab==="finances" && (
          <div>
            <div className="inst-page-header">
              <div>
                <div className="inst-page-title">Finances</div>
                <div className="inst-page-sub">Revenue overview & instructor payouts</div>
              </div>
            </div>

            {/* Summary cards */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"1.5rem"}}>
              {[
                { icon:"💰", label:"Fee Revenue",      val:`SDG ${CENTER_FINANCES.totalFeeRevenue.toLocaleString()}`, sub:`SDG ${CENTER_FINANCES.feePerStudent} × ${CENTER_FINANCES.totalStudents} students`, color:"#06b6d4" },
                { icon:"📅", label:"This Month",       val:`SDG ${CENTER_FINANCES.thisMonth.toLocaleString()}`,   sub:"March 2025",       color:"#22c55e" },
                { icon:"⏳", label:"Pending Payments", val:`SDG ${CENTER_FINANCES.pending.toLocaleString()}`,     sub:"Awaiting receipts", color:"#fbbf24" },
              ].map(s=>(
                <div key={s.label} className="ov-stat-card">
                  <div className="ov-stat-glow" style={{background:s.color}}/>
                  <div className="ov-stat-icon">{s.icon}</div>
                  <div className="ov-stat-val" style={{background:`linear-gradient(135deg,${s.color},white)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontSize:"1.4rem"}}>{s.val}</div>
                  <div className="ov-stat-lbl">{s.label}</div>
                  <div className="ov-stat-trend">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Instructor payouts table */}
  <div style={{marginBottom:"0.75rem",background:"rgba(99,102,241,0.06)",border:"1px solid rgba(99,102,241,0.15)",borderRadius:10,padding:"0.875rem 1rem",fontSize:"0.82rem",color:"var(--text2)"}}>
              💡 Revenue model: Instructors set their own prices. The center earns a flat <strong style={{color:"var(--cyan)"}}>SDG {CENTER_FINANCES.feePerStudent}</strong> per enrolled student — regardless of course price.
            </div>
            <div className="ov-card">
              <div className="ov-card-hd">Instructor Earnings & Center Fees</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.85rem"}}>
                  <thead>
                    <tr style={{borderBottom:"1px solid var(--border2)"}}>
                      {["Instructor","Students","Price/Student","Gross Revenue","Center Fee (SDG 50×n)","Net to Instructor","Due"].map(h=>(
                        <th key={h} style={{padding:"0.65rem 1rem",textAlign:"left",fontSize:"0.72rem",color:"var(--text3)",fontWeight:600,fontFamily:"DM Sans,sans-serif",whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CENTER_FINANCES.instructorEarnings.map(p=>(
                      <tr key={p.name} style={{borderBottom:"1px solid var(--border2)"}}>
                        <td style={{padding:"0.75rem 1rem"}}>
                          <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                            <div style={{width:28,height:28,borderRadius:"50%",background:"var(--gradient)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.62rem",fontWeight:700,color:"white",fontFamily:"Syne,sans-serif",flexShrink:0}}>{p.avatar}</div>
                            <span style={{fontWeight:600,fontSize:"0.82rem"}}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{padding:"0.75rem 1rem",color:"var(--text2)",fontSize:"0.82rem"}}>{p.students}</td>
                        <td style={{padding:"0.75rem 1rem",fontSize:"0.82rem"}}>${p.price}</td>
                        <td style={{padding:"0.75rem 1rem",fontSize:"0.82rem"}}>SDG {p.grossSDG.toLocaleString()}</td>
                        <td style={{padding:"0.75rem 1rem"}}>
                          <span style={{background:"rgba(99,102,241,0.1)",color:"var(--indigo-light)",padding:"0.2rem 0.6rem",borderRadius:100,fontSize:"0.75rem",fontWeight:600}}>SDG {p.centerFee.toLocaleString()}</span>
                        </td>
                        <td style={{padding:"0.75rem 1rem",fontWeight:600,color:"#22c55e",fontSize:"0.82rem"}}>SDG {p.netSDG.toLocaleString()}</td>
                        <td style={{padding:"0.75rem 1rem"}}>
                          {p.due>0 && !paidInstructors.includes(p.name)
                            ? <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                                <span style={{color:"#fbbf24",fontWeight:600,fontSize:"0.82rem"}}>SDG {p.due.toLocaleString()}</span>
                                <button className="copy-btn" style={{background:"rgba(34,197,94,0.1)",color:"#22c55e",borderRadius:6}} onClick={()=>setPaidInstructors(prev=>[...prev,p.name])}>Mark Paid</button>
                              </div>
                            : <span style={{color:"#22c55e",fontSize:"0.78rem"}}>✓ Settled</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{background:"var(--bg3)"}}>
                      <td colSpan={4} style={{padding:"0.875rem 1rem",fontWeight:700,fontSize:"0.82rem"}}>Total Center Revenue (flat fees)</td>
                      <td colSpan={3} style={{padding:"0.875rem 1rem",fontFamily:"Syne,sans-serif",fontWeight:800,color:"var(--cyan)",fontSize:"1rem"}}>
                        SDG {CENTER_FINANCES.totalFeeRevenue.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── CENTER PROFILE ── */}
        {activeTab==="profile" && (
          <div>
            <div className="inst-page-header">
              <div>
                <div className="inst-page-title">Center Profile</div>
                <div className="inst-page-sub">This is how students and instructors see your center on Masar</div>
              </div>
              <button className="btn btn-ghost" style={{padding:"0.6rem 1.25rem",fontSize:"0.875rem",borderRadius:9}} onClick={()=>setPage("center-"+center.slug)}>
                👁 View Public Page
              </button>
            </div>

            <div className="inst-profile-grid">
              {/* Preview card */}
              <div className="inst-profile-card">
                <div style={{width:64,height:64,borderRadius:14,background:center.color,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Syne,sans-serif",fontWeight:800,color:"white",fontSize:"1.4rem",margin:"0 auto 1rem"}}>
                  {center.logo}
                </div>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1rem",marginBottom:"0.2rem"}}>{center.name}</div>
                <div style={{fontSize:"0.8rem",color:"var(--text3)",marginBottom:"1rem"}}>{center.tagline}</div>
                <div style={{display:"flex",justifyContent:"space-around",paddingTop:"0.875rem",borderTop:"1px solid var(--border2)"}}>
                  <div style={{textAlign:"center"}}><div style={{fontFamily:"Syne,sans-serif",fontWeight:700}}>{center.courses}</div><div style={{fontSize:"0.68rem",color:"var(--text3)"}}>Courses</div></div>
                  <div style={{textAlign:"center"}}><div style={{fontFamily:"Syne,sans-serif",fontWeight:700}}>{center.instructors}</div><div style={{fontSize:"0.68rem",color:"var(--text3)"}}>Instructors</div></div>
                  <div style={{textAlign:"center"}}><div style={{fontFamily:"Syne,sans-serif",fontWeight:700}}>{center.rating}★</div><div style={{fontSize:"0.68rem",color:"var(--text3)"}}>Rating</div></div>
                </div>
                <div style={{marginTop:"1rem",fontSize:"0.78rem",color:"var(--text3)"}}>
                  📍 {center.location} · Est. {center.founded}
                </div>
              </div>

              {/* Edit form */}
              <div className="inst-profile-form">
                <div className="form-section-title">Center Identity</div>
                <div className="form-group"><label className="form-label">Center Name</label><input className="form-input" defaultValue={center.name}/></div>
                <div className="form-group"><label className="form-label">Tagline</label><input className="form-input" defaultValue={center.tagline}/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.875rem"}}>
                  <div className="form-group"><label className="form-label">Location / City</label><input className="form-input" defaultValue={center.location}/></div>
                  <div className="form-group"><label className="form-label">Founded Year</label><input className="form-input" type="number" defaultValue={center.founded}/></div>
                </div>

                <div className="form-section-title">About & Specialties</div>
                <div className="form-group">
                  <label className="form-label">About the Center</label>
                  <textarea className="form-input" rows={3} style={{resize:"none",lineHeight:1.6}} defaultValue="Sudan's first data science and programming academy, training 2,400+ students since 2018. We focus on practical, job-ready skills for Sudan's growing tech industry."/>
                </div>
                <div className="form-group">
                  <label className="form-label">Specialties <span style={{fontWeight:400,color:"var(--text3)"}}>(comma-separated)</span></label>
                  <input className="form-input" defaultValue={center.specialties.join(", ")}/>
                </div>

                <div className="form-section-title">Contact & Location</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.875rem"}}>
                  <div className="form-group"><label className="form-label">Phone</label><input className="form-input" placeholder="09xxxxxxxxx"/></div>
                  <div className="form-group"><label className="form-label">Email</label><input className="form-input" placeholder="info@center.sd"/></div>
                </div>
                <div className="form-group"><label className="form-label">Full Address</label><input className="form-input" placeholder="Street, area, city"/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.875rem"}}>
                  <div className="form-group"><label className="form-label">WhatsApp / Phone</label><input className="form-input" placeholder="0900-000-000"/></div>
                  <div className="form-group"><label className="form-label">Website</label><input className="form-input" placeholder="https://..."/></div>
                </div>

                <div style={{display:"flex",justifyContent:"flex-end",gap:"0.75rem",marginTop:"0.5rem"}}>
                  <button className="btn btn-ghost" style={{padding:"0.6rem 1.25rem",borderRadius:9,fontSize:"0.875rem"}} onClick={()=>setCenterProfileSaved(false)}>Discard</button>
                  <button className="btn btn-primary" style={{padding:"0.6rem 1.25rem",borderRadius:9,fontSize:"0.875rem"}} onClick={()=>setCenterProfileSaved(true)}>
                    {centerProfileSaved?"✓ Saved!":"Save Changes"}
                  </button>
                </div>
                {centerProfileSaved && <div style={{textAlign:"right",fontSize:"0.78rem",color:"#22c55e",marginTop:"0.4rem"}}>✓ Center profile updated successfully</div>}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ---- COURSE REVIEW MODAL ----
function CourseReviewModal({ course, onClose, onApprove, onReject }) {
  const [feedback, setFeedback] = useState("");
  return (
    <div className="add-course-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="add-course-modal">
        <div className="acm-header">
          <div>
            <div className="acm-title">🔍 Review Course</div>
            <div className="acm-sub">Submitted by {course.instructor} · {course.submitDate}</div>
          </div>
          <button className="em-close" onClick={onClose}>✕</button>
        </div>
        <div className="acm-body">
          <div style={{background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:12,padding:"1.25rem",marginBottom:"1rem"}}>
            <div style={{display:"flex",gap:"0.875rem",alignItems:"center",marginBottom:"0.875rem"}}>
              <span style={{fontSize:"2.25rem"}}>{course.image}</span>
              <div>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1rem"}}>{course.title}</div>
                <div style={{fontSize:"0.78rem",color:"var(--text3)"}}>by {course.instructor}</div>
              </div>
            </div>
            <div style={{fontSize:"0.82rem",color:"var(--text2)",lineHeight:1.7}}>
              This is a preview of the course details submitted by the instructor. In production, the full curriculum, schedule, pricing, and description would appear here for your review.
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Feedback to instructor <span style={{fontWeight:400,color:"var(--text3)"}}>(optional — sent if rejected or edited)</span></label>
            <textarea className="acm-textarea" rows={3} placeholder="e.g. Please add more details to week 3 curriculum..." value={feedback} onChange={e=>setFeedback(e.target.value)}/>
          </div>
        </div>
        <div className="acm-footer">
          <button className="btn btn-ghost" style={{padding:"0.6rem 1.1rem",borderRadius:9,fontSize:"0.875rem"}} onClick={onClose}>Cancel</button>
          <button className="req-btn-reject" style={{padding:"0.6rem 1.1rem",borderRadius:9,fontSize:"0.875rem"}} onClick={onReject}>✕ Reject</button>
          <button className="req-btn-accept" style={{padding:"0.6rem 1.25rem",borderRadius:9,fontSize:"0.875rem"}} onClick={onApprove}>✓ Approve & Publish</button>
        </div>
      </div>
    </div>
  );
}

// ---- ADD INSTRUCTOR MODAL ----
function AddInstructorModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name:"", title:"", email:"", phone:"", split:70 });
  const [sent, setSent] = useState(false);
  const isValid = form.name.trim() && form.email.trim();
  return (
    <div className="add-course-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="add-course-modal" style={{maxWidth:460}}>
        <div className="acm-header">
          <div><div className="acm-title">+ Add Instructor</div><div className="acm-sub">Invite an instructor to join your center</div></div>
          <button className="em-close" onClick={onClose}>✕</button>
        </div>
        {!sent ? (
          <>
            <div className="acm-body">
              <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" placeholder="Ahmed Hassan" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div className="form-group"><label className="form-label">Title / Specialization</label><input className="form-input" placeholder="Data Scientist" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
              <div className="acm-row">
                <div className="form-group"><label className="form-label">Email *</label><input className="form-input" type="email" placeholder="instructor@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
                <div className="form-group"><label className="form-label">Phone</label><input className="form-input" placeholder="09xxxxxxxxx" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
              </div>
              <div className="form-group">
                <label className="form-label">Center Fee per Student (SDG)</label>
                <input className="form-input" type="number" min="0" placeholder="50" defaultValue="50"
                  style={{}} onChange={e=>setForm({...form,feePerStudent:+e.target.value})}/>
                <div style={{fontSize:"0.75rem",color:"var(--text3)",marginTop:"0.35rem"}}>
                  💡 The instructor sets their own course price. The center earns this flat fee per enrollment.
                </div>
              </div>
              <div style={{background:"rgba(99,102,241,0.06)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:10,padding:"0.875rem",fontSize:"0.82rem",color:"var(--text2)"}}>
                📧 An invitation email will be sent to the instructor. They'll create their account and be listed under your center.
              </div>
            </div>
            <div className="acm-footer">
              <button className="btn btn-ghost" style={{padding:"0.6rem 1.1rem",borderRadius:9,fontSize:"0.875rem"}} onClick={onClose}>Cancel</button>
              <button className="btn btn-primary" style={{padding:"0.6rem 1.25rem",borderRadius:9,fontSize:"0.875rem"}} disabled={!isValid} onClick={()=>{onAdd({...form,avatar:form.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()});setSent(true);}}>Send Invitation →</button>
            </div>
          </>
        ) : (
          <div className="acm-body" style={{textAlign:"center",padding:"1.5rem"}}>
            <div style={{fontSize:"3rem",marginBottom:"0.75rem"}}>✉️</div>
            <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"1.1rem",marginBottom:"0.4rem"}}>Invitation Sent!</div>
            <div style={{fontSize:"0.85rem",color:"var(--text2)",marginBottom:"1.5rem"}}>An invitation was sent to <strong>{form.email}</strong>. Once they accept, they'll appear under your instructors.</div>
            <button className="btn btn-primary" style={{width:"100%",padding:"0.875rem",borderRadius:10}} onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}



// ---- EDIT COURSE MODAL ----
function EditCourseModal({ course, onClose, onSave }) {
  const [form, setForm] = useState({
    title:    course.title    || "",
    price:    course.price    || "",
    level:    course.level    || "Beginner",
    duration: course.duration || "",
    image:    course.image    || "📚",
    status:   course.status   || "draft",
  });
  const [saved, setSaved] = useState(false);
  const emojis = ["📚","🐍","🌐","🤖","🎨","🗄️","📊","⚡","📱","☁️","🔧","🧠"];

  const handleSave = () => {
    onSave({ ...course, ...form });
    setSaved(true);
    setTimeout(() => { onClose(); }, 900);
  };

  return (
    <div className="add-course-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="add-course-modal" style={{maxWidth:520}}>
        <div className="acm-header">
          <div>
            <div className="acm-title">✏ Edit Course</div>
            <div className="acm-sub">Changes will reflect immediately on the course page</div>
          </div>
          <button className="em-close" onClick={onClose}>✕</button>
        </div>
        <div className="acm-body">
          {/* Icon */}
          <div className="form-group">
            <label className="form-label">Course Icon</label>
            <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
              {emojis.map(e=>(
                <div key={e} onClick={()=>setForm(f=>({...f,image:e}))}
                  style={{width:36,height:36,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.25rem",cursor:"pointer",border:`1.5px solid ${form.image===e?"var(--indigo)":"var(--border2)"}`,background:form.image===e?"rgba(99,102,241,0.1)":"var(--bg)",transition:"all 0.15s"}}>
                  {e}
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Course Title</label>
            <input className="form-input" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
          </div>
          <div className="acm-row">
            <div className="form-group">
              <label className="form-label">Price (USD)</label>
              <input className="form-input" type="number" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} />
              {form.price>0 && <div style={{fontSize:"0.72rem",color:"var(--text3)",marginTop:"0.25rem"}}>≈ SDG {(form.price*350).toLocaleString()}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Level</label>
              <select className="acm-select" value={form.level} onChange={e=>setForm(f=>({...f,level:e.target.value}))}>
                {["Beginner","Intermediate","Advanced"].map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Duration</label>
            <input className="form-input" placeholder="e.g. 8 weeks" value={form.duration} onChange={e=>setForm(f=>({...f,duration:e.target.value}))} />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="acm-select" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
              {[["draft","📝 Draft"],["active","✅ Active"],["archived","📦 Archived"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        </div>
        <div className="acm-footer">
          <button className="btn btn-ghost" style={{padding:"0.6rem 1.1rem",borderRadius:9,fontSize:"0.875rem"}} onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" style={{padding:"0.6rem 1.35rem",borderRadius:9,fontSize:"0.875rem",display:"flex",alignItems:"center",gap:"0.4rem"}}
            onClick={handleSave} disabled={!form.title.trim()}>
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [locale, setLocale] = useState("ar");

  const t = (key) => {
    const bundle = translations[locale] || translations.en;
    const value = key.split(".").reduce((acc, part) => acc?.[part], bundle);
    return value ?? key;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => { setUser(null); setPage("home"); };

  const renderPage = () => {
    if (page === "home") return <HomePage setPage={setPage} stats={STATS} features={FEATURES} courses={COURSES} centers={CENTERS} t={t} />;
    if (page === "courses") return <CoursesPage setPage={setPage} courses={COURSES} t={t} />;
    if (page === "instructors") return <InstructorsPage setPage={setPage} instructors={INSTRUCTORS} t={t} />;
    if (page === "centers") return <CentersPage setPage={setPage} centers={CENTERS} t={t} />;
    if (page === "dashboard") return <DashboardPage user={user} setPage={setPage} courses={COURSES} t={t} />;
    if (page === "inst-dashboard") return <InstructorDashboard user={user} setPage={setPage} />;
    if (page === "center-dashboard") return <CenterOwnerDashboard user={user} setPage={setPage} />;
    if (page === "login") return <AuthPage mode="login" setPage={setPage} onLogin={handleLogin} t={t} />;
    if (page === "register") return <AuthPage mode="register" setPage={setPage} onLogin={handleLogin} t={t} />;
    if (page.startsWith("course-")) return <CourseDetailPage courseId={parseInt(page.replace("course-", ""))} setPage={setPage} />;
    if (page.startsWith("instructor-")) return <InstructorProfilePage instructorId={parseInt(page.replace("instructor-", ""))} setPage={setPage} />;
    if (page.startsWith("center-")) return <CenterProfilePage slug={page.replace("center-", "")} setPage={setPage} centers={CENTERS} courses={COURSES} instructors={INSTRUCTORS} t={t} />;
    return <HomePage setPage={setPage} stats={STATS} features={FEATURES} courses={COURSES} centers={CENTERS} t={t} />;
  };

  const showNav = !["login", "register"].includes(page);
  const getActivePage = () => {
    if (page.startsWith("course-") || page === "courses") return "courses";
    if (page.startsWith("instructor-") || page === "instructors") return "instructors";
    if (page.startsWith("center-") || page === "centers") return "centers";
    if (page === "inst-dashboard") return "inst-dashboard";
    if (page === "center-dashboard") return "center-dashboard";
    return page;
  };

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      {showNav && <Navbar activePage={getActivePage()} setPage={setPage} scrolled={scrolled} user={user} onLogout={handleLogout} t={t} onToggleLocale={() => setLocale((prev) => (prev === "ar" ? "en" : "ar"))} />}
      <main>{renderPage()}</main>
    </div>
  );
}
