export const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Chennai",
      "Kolkata",
      "Remote",
      "Ahmedabad",
      "Jaipur",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Mobile App Developer",
      "DevOps Engineer",
      "Data Engineer",
      "ML Engineer",
      "UI/UX Designer",
      "Data Scientist",
      "Product Manager",
    ],
  },
  {
    filterType: "JobType",
    array: ["Full-Time", "Part-Time", "Internship", "Contract"],
  },
  {
    filterType: "ExperienceLevel",
    array: ["Entry", "Mid", "Senior"],
  },
];

export const filterJobs = [
  {
    _id: "1",
    title: "Frontend Developer",
    description: "Build beautiful and interactive web interfaces.",
    createdAt: new Date().toISOString(),
    company: {
      name: "TechNova",
      logo: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
    },
    location: "Bangalore",
    position: 2,
    jobType: "Full Time",
    salary: "8",
  },
  {
    _id: "2",
    title: "Backend Developer",
    description: "Design APIs and build scalable backend systems.",
    createdAt: new Date().toISOString(),
    company: {
      name: "CodeBase",
      logo: "https://avatars.githubusercontent.com/u/1342004?s=200&v=4",
    },
    location: "Pune",
    position: 1,
    jobType: "Part Time",
    salary: "6",
  },
  {
    _id: "3",
    title: "Fullstack Developer",
    description: "End-to-end development with MERN stack.",
    createdAt: new Date().toISOString(),
    company: {
      name: "DevX",
      logo: "https://avatars.githubusercontent.com/u/15658638?s=200&v=4",
    },
    location: "Hyderabad",
    position: 3,
    jobType: "Remote",
    salary: "10",
  },
  {
    _id: "4",
    title: "DevOps Engineer",
    description: "Automate and optimize CI/CD pipelines.",
    createdAt: new Date().toISOString(),
    company: {
      name: "InfraZen",
      logo: "https://avatars.githubusercontent.com/u/50039094?s=200&v=4",
    },
    location: "Chennai",
    position: 1,
    jobType: "Full Time",
    salary: "12",
  },
  {
    _id: "5",
    title: "UI/UX Designer",
    description: "Craft intuitive user experiences with modern design tools.",
    createdAt: new Date().toISOString(),
    company: {
      name: "PixelPro",
      logo: "https://avatars.githubusercontent.com/u/18133?s=200&v=4",
    },
    location: "Mumbai",
    position: 2,
    jobType: "Internship",
    salary: "4",
  },
  {
    _id: "6",
    title: "Machine Learning Engineer",
    description: "Develop and deploy intelligent ML models.",
    createdAt: new Date().toISOString(),
    company: {
      name: "NeuroNet",
      logo: "https://avatars.githubusercontent.com/u/29030307?s=200&v=4",
    },
    location: "Delhi",
    position: 2,
    jobType: "Full Time",
    salary: "15",
  },
  {
    _id: "7",
    title: "Cloud Architect",
    description: "Design scalable solutions on AWS and Azure.",
    createdAt: new Date().toISOString(),
    company: {
      name: "CloudScape",
      logo: "https://avatars.githubusercontent.com/u/20027290?s=200&v=4",
    },
    location: "Noida",
    position: 1,
    jobType: "Remote",
    salary: "18",
  },
  {
    _id: "8",
    title: "QA Automation Engineer",
    description: "Ensure quality via Selenium and Cypress.",
    createdAt: new Date().toISOString(),
    company: {
      name: "Testify",
      logo: "https://avatars.githubusercontent.com/u/33003157?s=200&v=4",
    },
    location: "Gurgaon",
    position: 1,
    jobType: "Full Time",
    salary: "7",
  },
  {
    _id: "9",
    title: "Data Analyst",
    description: "Turn data into actionable insights.",
    createdAt: new Date().toISOString(),
    company: {
      name: "InsightIQ",
      logo: "https://avatars.githubusercontent.com/u/17281506?s=200&v=4",
    },
    location: "Kolkata",
    position: 2,
    jobType: "Part Time",
    salary: "6.5",
  },
  {
    _id: "10",
    title: "Mobile App Developer",
    description: "Develop cross-platform apps using Flutter.",
    createdAt: new Date().toISOString(),
    company: {
      name: "AppFusion",
      logo: "https://avatars.githubusercontent.com/u/17906289?s=200&v=4",
    },
    location: "Ahmedabad",
    position: 1,
    jobType: "Full Time",
    salary: "9",
  },
];

export const initialNotifications = [
  {
    id: 1,
    company: "Google",
    message: "Your application was viewed",
    logo: "https://logo.clearbit.com/google.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
  },
  {
    id: 2,
    company: "Facebook",
    message: "You have a new message",
    logo: "https://logo.clearbit.com/facebook.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    read: false,
  },
  {
    id: 3,
    company: "Netflix",
    message: "Job closed - Senior Developer",
    logo: "https://logo.clearbit.com/netflix.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: false,
  },
  {
    id: 4,
    company: "Amazon",
    message: "Interview scheduled for tomorrow",
    logo: "https://logo.clearbit.com/amazon.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: false,
  },
  {
    id: 5,
    company: "Apple",
    message: "We received your resume",
    logo: "https://logo.clearbit.com/apple.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
  },
  {
    id: 6,
    company: "Adobe",
    message: "Recruiter sent you a message",
    logo: "https://logo.clearbit.com/adobe.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 mins ago
    read: false,
  },
  {
    id: 7,
    company: "Tesla",
    message: "Position reopened - Apply again",
    logo: "https://logo.clearbit.com/tesla.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    read: false,
  },
  {
    id: 8,
    company: "LinkedIn",
    message: "New job match found for you",
    logo: "https://logo.clearbit.com/linkedin.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: false,
  },
  {
    id: 9,
    company: "Spotify",
    message: "Your resume passed the screening round",
    logo: "https://logo.clearbit.com/spotify.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    read: true,
  },
  {
    id: 10,
    company: "Airbnb",
    message: "Your application has been rejected",
    logo: "https://logo.clearbit.com/airbnb.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: true,
  },
];
