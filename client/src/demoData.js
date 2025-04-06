export const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi NCR",
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
      "Fullstack Developer",
      "Mobile App Developer",
      "DevOps Engineer",
      "Data Scientist",
      "Machine Learning Engineer",
      "UI/UX Designer",
      "QA Engineer",
      "Project Manager",
    ],
  },
  {
    filterType: "Salary",
    array: [
      "0 - 40k",
      "40k - 80k",
      "80k - 1.5L",
      "1.5L - 3L",
      "3L - 5L",
      "5L - 10L",
      "10L+",
    ],
  },
  {
    filterType: "Job Type",
    array: ["Full-Time", "Part-Time", "Internship", "Freelance", "Contract"],
  },
  {
    filterType: "Experience Level",
    array: ["Fresher", "1-2 Years", "2-5 Years", "5+ Years"],
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
