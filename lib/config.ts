// lib/config.ts

export const siteConfig = {
  // Site metadata
  title: "马晨恩 | Ma Chen'en",
  description: "AI Technical Product Manager at Huawei. Tokyo Tech & Beihang graduate. Specializing in LLM optimization, algorithm productization, and AI product development.",
  url: "https://machenan.vercel.app",
  
  // Intro screen
  intro: {
    name: "马晨恩",
    nameEn: "Ma Chen'en",
    title: "AI Technical Product Manager",
    subtitle: "华为 | Tokyo Tech | Beihang",
    enterText: "ENTER",
  },
  
  // Profile
  profile: {
    avatar: "/photos/avatar.png",
    tagline: "Building AI products that scale",
    location: "Shanghai, China",
    email: "m640302@163.com",
    phone: "13121213769",
  },
  
  // External links
  links: {
    github: "https://github.com/Micheal-nn?tab=repositories",
    csdn: "https://blog.csdn.net/weixin_37837856",
  },
  
  // Navigation items
  navigation: [
    { id: "about", icon: "User", label: "About", labelZh: "关于", href: "/about" },
    { id: "experience", icon: "Briefcase", label: "Experience", labelZh: "经历", href: "/experience" },
    { id: "projects", icon: "Rocket", label: "Projects", labelZh: "项目", href: "/projects" },
    { id: "contact", icon: "Mail", label: "Contact", labelZh: "联系", href: "/contact" },
    { id: "skills", icon: "Code", label: "Skills", labelZh: "技能", href: "/skills" },
    { id: "blog", icon: "Edit", label: "Blog", labelZh: "博客", href: "/blog" },
  ],
  
  // Work experience
  experience: [
    {
      company: "华为技术有限公司",
      companyEn: "Huawei Technologies",
      role: "AI Algorithm Product Manager SE",
      period: "2022.06 - Present",
      location: "Shanghai",
      description: "Responsible for AI algorithm product full lifecycle management, from requirement analysis to commercial deployment.",
      achievements: [
        "Led Flash Attention operator development for billion-parameter LLMs",
        "Achieved 1700+ TPS on single card for Doubao model",
        "Launched 5+ AI products deployed across major telecom operators",
        "Authored 1 patent on intelligent power distribution algorithms",
      ],
      technologies: ["Python", "C++", "PyTorch", "Flash Attention"],
    },
    {
      company: "阿里巴巴本地生活",
      companyEn: "Alibaba Local Services",
      role: "Data R&D Engineer Assistant",
      period: "2021.06 - 2021.09",
      location: "Beijing",
      description: "Data analysis for user growth and engagement optimization.",
      achievements: [
        "Built data dashboards for WeChat social insights (TB-scale data)",
        "Improved user retention by 38% through interactive features",
        "Optimized DAU by 8万+ through friend gameplay features",
      ],
      technologies: ["Python", "Hive", "SQL", "Hadoop"],
    },
    {
      company: "字节跳动",
      companyEn: "ByteDance",
      role: "Data Analysis Intern",
      period: "2020.08 - 2020.10",
      location: "Beijing",
      description: "Built reviewer efficiency analysis system using Hive and internal databases.",
      achievements: [
        "Developed efficiency analysis panel processing 200-300M records/month",
        "Improved efficiency accuracy from 78% to 92%",
        "Reduced salary disputes by 37 cases",
      ],
      technologies: ["Python", "Hive", "SQL"],
    },
    {
      company: "北大LEEEPS实验室",
      companyEn: "Peking University LEEEPS Lab",
      role: "Research Assistant",
      period: "2019.10 - 2020.01",
      location: "Beijing",
      description: "Research on carbon emission reduction and air quality improvement.",
      achievements: [
        "Assisted in research on Sichuan province carbon reduction benefits",
        "Developed data visualization modules using Python",
      ],
      technologies: ["Python", "GAINS Model"],
    },
    {
      company: "中国城市规划设计院",
      companyEn: "China Academy of Urban Planning",
      role: "Data Analysis Intern",
      period: "2018.07 - 2018.10",
      location: "Beijing",
      description: "Urban function and transportation planning research using mobile signaling data.",
      achievements: [
        "Built job-housing analysis model with 89% accuracy",
        "Visualized results included in urban master plan",
        "3 recommendations adopted for transit planning",
      ],
      technologies: ["Python", "SQL", "EMME"],
    },
  ],
  
  // Featured projects
  projects: [
    {
      id: "llm-optimization",
      title: "大模型推理优化",
      titleEn: "LLM Inference Optimization",
      description: "Led development of Flash Attention operators for billion-parameter large language models at Huawei.",
      metrics: ["1700+ TPS achieved", "7 days → <1 day dev cycle"],
      technologies: ["Python", "C++", "PyTorch", "Flash Attention"],
      link: null,
    },
    {
      id: "power-distribution",
      title: "基站智能供配电算法",
      titleEn: "Intelligent Power Distribution",
      description: "AI-powered base station power allocation system reducing costs while maintaining network quality.",
      metrics: ["30% cost reduction", "Patent granted"],
      technologies: ["Python", "MLP", "SLSQP", "Kalman Filter"],
      link: null,
    },
    {
      id: "network-prediction",
      title: "前传隐患评估",
      titleEn: "Network Fault Prediction",
      description: "ML-based prediction model for proactive network maintenance and fault prevention.",
      metrics: ["Deployed at Zhejiang Mobile", "<10% error rate"],
      technologies: ["Python", "MLP", "SQL"],
      link: null,
    },
    {
      id: "doubao-llm",
      title: "豆包大模型调优",
      titleEn: "Doubao LLM Optimization",
      description: "Client project for ByteDance's Doubao model, achieving commercial launch targets.",
      metrics: ["Commercial launch support", "Full-stack optimization"],
      technologies: ["Python", "C++", "Ascend C"],
      link: null,
    },
  ],
  
  // Skills
  skills: {
    programming: ["Python", "C++", "SQL", "Hive"],
    aiml: ["PyTorch", "TensorFlow", "Transformer", "Flash Attention"],
    product: ["Product Lifecycle Management", "Requirements Engineering", "Cross-functional Leadership", "Stakeholder Management"],
    domain: ["LLM Development", "Algorithm Productization", "Telecommunications", "Smart Hardware"],
    tools: ["Git/GitHub", "Linux", "Docker", "Jira", "Confluence"],
  },
  
  // Education
  education: [
    {
      school: "東京工業大学",
      schoolEn: "Tokyo Institute of Technology",
      degree: "Master of Engineering",
      major: "Industrial Engineering & Economics",
      period: "2020.04 - 2022.04",
      location: "Tokyo, Japan",
      achievements: ["Full Scholarship", "JASSO Scholarship"],
    },
    {
      school: "北京航空航天大学",
      schoolEn: "Beihang University",
      degree: "Bachelor of Engineering",
      major: "Management Science & Engineering",
      period: "2015.09 - 2019.06",
      location: "Beijing, China",
      achievements: ["Outstanding Graduate", "National PM Competition 2nd Prize"],
      minor: "Applied Mathematics",
    },
  ],
  
  // Awards
  awards: [
    { title: "Patent Granted", detail: "Intelligent Power Distribution Algorithm (202510828251.7)", year: "2025" },
    { title: "SCI Paper (1st Author)", detail: "Q2 Journal", year: "2024" },
    { title: "Tokyo Tech Full Scholarship", detail: null, year: "2021" },
    { title: "JASSO Study Abroad Scholarship", detail: null, year: "2020" },
    { title: "Outstanding Graduate", detail: "Beihang University", year: "2019" },
    { title: "National PM Competition", detail: "2nd Prize", year: "2017" },
  ],
};

export type SiteConfig = typeof siteConfig;
