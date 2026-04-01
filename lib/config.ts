// lib/config.ts

export const siteConfig = {
  // Site metadata
  title: "Michael | Michael",
  description: "AI Technical Product Manager at Huawei. Tokyo Tech & Beihang graduate. Specializing in LLM optimization, algorithm productization, and AI product development.",
  url: "https://machenan.vercel.app",
  
  // Intro screen
  intro: {
    name: "Michael",
    nameEn: "Michael",
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
      roleZh: "AI算法产品经理SE",
      period: "2022.06 - Present",
      location: "Shanghai",
      locationZh: "上海",
      description: "Responsible for AI algorithm product full lifecycle management, from requirement analysis to commercial deployment.",
      descriptionZh: "负责AI算法产品全生命周期管理，从需求分析到商业部署。",
      achievements: [
        "Led Flash Attention operator development for billion-parameter LLMs",
        "Achieved 1700+ TPS on single card for Doubao model",
        "Launched 5+ AI products deployed across major telecom operators",
        "Authored 1 patent on intelligent power distribution algorithms",
      ],
      achievementsZh: [
        "主导Flash Attention算子开发，支撑千亿参数大模型推理",
        "实现豆包模型单卡TPS达1700+",
        "推出5+款AI产品，部署于各大电信运营商",
        "申请智能供配电算法发明专利1项",
      ],
      technologies: ["Python", "C++", "PyTorch", "Flash Attention"],
    },
    {
      company: "阿里巴巴本地生活",
      companyEn: "Alibaba Local Services",
      role: "Data R&D Engineer Assistant",
      roleZh: "数据研发工程师（实习）",
      period: "2021.06 - 2021.09",
      location: "Beijing",
      locationZh: "北京",
      description: "Data analysis for user growth and engagement optimization.",
      descriptionZh: "负责用户增长与活跃度优化的数据分析工作。",
      achievements: [
        "Built data dashboards for WeChat social insights (TB-scale data)",
        "Improved user retention by 38% through interactive features",
        "Optimized DAU by 8万+ through friend gameplay features",
      ],
      achievementsZh: [
        "搭建微信社交洞察数据看板（TB级数据处理）",
        "通过互动功能优化提升用户留存率38%",
        "通过好友玩法功能优化DAU提升8万+",
      ],
      technologies: ["Python", "Hive", "SQL", "Hadoop"],
    },
    {
      company: "字节跳动",
      companyEn: "ByteDance",
      role: "Data Analysis Intern",
      roleZh: "数据分析实习生",
      period: "2020.08 - 2020.10",
      location: "Beijing",
      locationZh: "北京",
      description: "Built reviewer efficiency analysis system using Hive and internal databases.",
      descriptionZh: "使用Hive和内部数据库搭建审核人员效率分析系统。",
      achievements: [
        "Developed efficiency analysis panel processing 200-300M records/month",
        "Improved efficiency accuracy from 78% to 92%",
        "Reduced salary disputes by 37 cases",
      ],
      achievementsZh: [
        "开发效率分析面板，月处理2-3亿条记录",
        "将效率准确率从78%提升至92%",
        "减少薪资争议37起",
      ],
      technologies: ["Python", "Hive", "SQL"],
    },
    {
      company: "北大LEEEPS实验室",
      companyEn: "Peking University LEEEPS Lab",
      role: "Research Assistant",
      roleZh: "研究助理",
      period: "2019.10 - 2020.01",
      location: "Beijing",
      locationZh: "北京",
      description: "Research on carbon emission reduction and air quality improvement.",
      descriptionZh: "参与碳排放减少和空气质量改善相关研究。",
      achievements: [
        "Assisted in research on Sichuan province carbon reduction benefits",
        "Developed data visualization modules using Python",
      ],
      achievementsZh: [
        "协助四川省碳减排效益研究",
        "使用Python开发数据可视化模块",
      ],
      technologies: ["Python", "GAINS Model"],
    },
    {
      company: "中国城市规划设计院",
      companyEn: "China Academy of Urban Planning",
      role: "Data Analysis Intern",
      roleZh: "数据分析实习生",
      period: "2018.07 - 2018.10",
      location: "Beijing",
      locationZh: "北京",
      description: "Urban function and transportation planning research using mobile signaling data.",
      descriptionZh: "利用手机信令数据进行城市功能与交通规划研究。",
      achievements: [
        "Built job-housing analysis model with 89% accuracy",
        "Visualized results included in urban master plan",
        "3 recommendations adopted for transit planning",
      ],
      achievementsZh: [
        "构建职住分析模型，准确率达89%",
        "可视化成果纳入城市总体规划",
        "3项交通规划建议被采纳",
      ],
      technologies: ["Python", "SQL", "EMME"],
    },
  ],
  
  // Featured projects
  projects: [
    {
      id: "llm-optimization",
      title: "大模型推理性能优化与算子基建项目",
      titleEn: "LLM Inference Optimization & Operator Infrastructure",
      description: "针对千亿级大模型商用落地面临的推理性能瓶颈、算子硬件性能黑箱化、开发迭代周期长等核心行业痛点，先后主导负责字节跳动豆包千亿大模型推理性能调优、基于PYPTO的FIA融合推理注意力算子开发调优、FA算子全量化性能建模三大核心模块。",
      descriptionEn: "Led three core modules for billion-parameter LLM commercialization: Doubao model inference optimization, FIA operator development, and full-quantization performance modeling.",
      metrics: ["TPS 1700+", "开发周期 7天→1天", "建模误差≤15%"],
      metricsEn: ["TPS 1700+", "Dev Cycle 7d→1d", "Modeling Error ≤15%"],
      technologies: ["Python", "C++", "PyTorch", "Flash Attention", "Ascend C"],
      link: null,
      period: "2025.08 - Present",
      role: "开发者工具负责人",
      roleEn: "Developer Tools Lead",
      background: "针对千亿级大模型商用落地面临的推理性能瓶颈、算子硬件性能黑箱化、开发迭代周期长等核心行业痛点，先后主导负责字节跳动豆包千亿大模型推理性能调优、基于PYPTO的FIA融合推理注意力算子开发调优、FA算子全量化性能建模三大核心模块。",
      backgroundEn: "Addressed critical industry bottlenecks in billion-parameter LLM commercialization including inference performance, opaque hardware performance models, and long development cycles.",
      contributions: [
        "算子性能建模产品：基于FA计算逻辑的全量化硬件性能分析工具，基于Roofline模型完成FA、GQA/MLA/PA等主流大模型算子的计算-访存全流程拆解，建立算子理论性能上限数学模型",
        "算子开发调优：主导CANN套件PYPTO的FA系列算子全流程开发，适配GLM-4/DS32等主流大模型复杂注意力架构（PFA/IFA/SFA/MLA/LI），完成功能原生重构、rtol<0.05级精度全量验证",
        "豆包大模型性能调优：聚焦豆包M9大模型完成全链路性能优化，推理任务下发耗时从70ms降至8ms，10k长序列场景下单卡TPS达1710，超额完成1700+目标"
      ],
      contributionsEn: [
        "Built full-quantization hardware performance analysis tool based on Roofline model for mainstream LLM operators",
        "Led FA series operator development for CANN PYPTO suite, supporting GLM-4/DS32 architectures with rtol<0.05 precision",
        "Optimized Doubao M9 model: reduced task dispatch from 70ms to 8ms, achieved single-card TPS 1710 at 10k sequence length"
      ],
      outcomes: "性能建模实现理论性能预估与实测值误差≤15%，将算子开发迭代周期从7天压缩至1天以内；豆包大模型调优实现单卡TPS1700+，支撑千亿级模型全量商用上线。",
      outcomesEn: "Performance modeling error ≤15%, compressed operator dev cycle from 7 days to <1 day; achieved TPS 1700+ for Doubao model, supporting full commercial deployment."
    },
    {
      id: "power-distribution",
      title: "基站智能供配电算法产品化项目",
      titleEn: "Intelligent Power Distribution Algorithm",
      description: "打造智能化供配电算法产品，实现秒级按需供电与小时级按需配电，解决运营商基站配电改造成本高、电源利用率不足50%的行业痛点。",
      descriptionEn: "Built intelligent power distribution products achieving second-level and hour-level on-demand power allocation, solving high retrofit costs and <50% power utilization.",
      metrics: ["30% 配电量压缩", "专利授权", "电源利用率 98%"],
      metricsEn: ["30% Distribution Reduction", "Patent Granted", "Power Utilization 98%"],
      technologies: ["Python", "MLP", "SLSQP", "Kalman Filter", "Differential Evolution"],
      link: null,
      period: "2024.05 - 2025.05",
      role: "算法产品负责人",
      roleEn: "Algorithm Product Lead",
      background: "针对运营商基站配电改造成本高、周期长、电源实际利用率不足50%、功率秒级波动易引发跳闸的行业共性痛点，需打造智能化供配电算法产品，实现精细化配电管控。",
      backgroundEn: "Addressed industry pain points: high base station power distribution costs, long retrofit cycles, <50% power utilization, and trip risks from second-level power fluctuations.",
      contributions: [
        "按需供电算法：采用卡尔曼滤波实现秒级小区负载预测（平均误差6.5%），搭建四层MLP实现射频模块秒级功率预测（拟合优度92%），基于SLSQP求解带电源硬约束的优化问题",
        "按需配电算法：构建MLP模型实现4/5G小区小时级负载分布统一建模（拟合优度97%），设计差分进化+局部优化混合寻优策略，优化分布式计算架构解决百GB级数据处理问题",
        "构建'负载预测-功率预测-最优分配-反馈优化'全链路算法体系"
      ],
      contributionsEn: [
        "On-demand power supply: Kalman filter for second-level load prediction (6.5% error), 4-layer MLP for power prediction (R²=92%), SLSQP optimization",
        "On-demand distribution: MLP for 4/5G hourly load modeling (R²=97%), differential evolution + local optimization hybrid strategy",
        "Built full-chain algorithm system: load prediction, power prediction, optimal allocation, feedback optimization"
      ],
      outcomes: "核心指标全面超预期：秒级功率锁实现基站100%不超载，忙时电源利用率达98%，在5%谱效损失容忍度内实现30%配电量压缩。核心方案获发明专利授权（202510828251.7）。",
      outcomesEn: "All core metrics exceeded targets: 100% no-overload, 98% peak power utilization, 30% distribution compression within 5% spectral efficiency tolerance. Patent granted: 202510828251.7."
    },
    {
      id: "network-prediction",
      title: "前传隐患业务影响量化评估及智能修复方案项目",
      titleEn: "Network Fault Impact Assessment & Smart Repair",
      description: "研发前传误码对频谱效率和用户下行速率的量化评估模型，实现运维模式从被动响应到主动预防的升级。",
      descriptionEn: "Developed quantitative assessment models for fronthaul error impact on spectral efficiency and user throughput, upgrading operations from reactive to proactive.",
      metrics: ["谱效误差 0.9%", "R²达0.8", "规模应用浙江移动"],
      metricsEn: ["Spectral Eff. Error 0.9%", "R²=0.8", "Deployed at Zhejiang Mobile"],
      technologies: ["Python", "MLP", "SQL"],
      link: null,
      period: "2024.12 - 2025.08",
      role: "算法产品负责人",
      roleEn: "Algorithm Product Lead",
      background: "通信网络传统被动式运维模式下，前传类故障工单占比高，无法量化前传误码对频谱效率、用户下行速率的实际业务影响，导致隐患治理无科学优先级。",
      backgroundEn: "Under traditional reactive maintenance, fronthaul fault tickets were high-portion, with no way to quantify impact on spectral efficiency and user throughput.",
      contributions: [
        "研发用户级秒级前传误码-谱效影响量化MLP模型，创新用户抽样+流量加权的小区级结果汇总方案，降低90%以上算力负载",
        "搭建谱效-下行速率映射MLP模型，设计误码触发式检测机制减少93%无效计算，创新影子模式部署方案",
        "完成杭州内场验证与10个典型现网站点Beta全流程验证"
      ],
      contributionsEn: [
        "Developed user-level fronthaul error to spectral efficiency MLP model with innovative sampling + traffic-weighted aggregation, reducing compute by 90%+",
        "Built spectral efficiency to downlink throughput MLP model, designed error-triggered detection reducing 93% invalid computation",
        "Completed Hangzhou lab verification and 10 live-site Beta full-flow verification"
      ],
      outcomes: "核心模型精度超验收标准：谱效影响量化平均相对误差0.9%、下行速率预测误差<10%，拟合优度R²达0.8。方案已规模应用于浙江移动等运营商局点。",
      outcomesEn: "Core model precision exceeded acceptance: spectral efficiency relative error 0.9%, throughput prediction error <10%, R²=0.8. Deployed at scale at Zhejiang Mobile and other operators."
    },
    {
      id: "doubao-llm",
      title: "字节跳动豆包大模型调优",
      titleEn: "ByteDance Doubao LLM Optimization",
      description: "字节跳动豆包千亿大模型推理性能调优项目，聚焦M9模型全链路性能优化，支撑A3芯片商用上线。",
      descriptionEn: "Doubao billion-parameter model inference optimization, focusing on M9 model full-chain performance optimization, supporting A3 chip commercial launch.",
      metrics: ["TPS 1710", "任务下发 70ms→8ms", "autoeval 65分"],
      metricsEn: ["TPS 1710", "Task Dispatch 70ms→8ms", "Autoeval Score 65"],
      technologies: ["Python", "C++", "Ascend C"],
      link: null,
      period: "2025.08 - Present",
      role: "性能调优工程师",
      roleEn: "Performance Optimization Engineer",
      background: "豆包大模型M9在10k长序列场景下的单卡吞吐、推理延迟等指标不足，且昇腾算子适配验证、多模块协同优化存在诸多难点。",
      backgroundEn: "Doubao M9 model had insufficient single-card throughput and inference latency at 10k sequence length, with challenges in Ascend operator adaptation and multi-module optimization.",
      contributions: [
        "完成M9模型性能专项攻坚，解决IPC与cachemiss关联影响、内存管理优化等问题，推理任务下发耗时从70ms降至8ms",
        "在10k长序列场景下实现单卡TPS达1710，超额完成1700+目标，autoeval跑分达65",
        "完成客户自定义算子集适配，跑通开源中间层XpuGraph，实现eager与compile模式张量精度一致",
        "叠加服务化框架完成MTP、多机分布式、PD分离等多维度优化"
      ],
      contributionsEn: [
        "Solved IPC and cachemiss correlation issues, memory management optimization, reduced task dispatch from 70ms to 8ms",
        "Achieved single-card TPS 1710 at 10k sequence length, exceeding 1700+ target, autoeval score 65",
        "Adapted custom operator sets, ran XpuGraph middleware, achieved tensor precision consistency between eager and compile modes",
        "Added service framework with MTP, multi-node distributed, PD separation optimization"
      ],
      outcomes: "单卡TPS1700+，支撑千亿级模型全量商用上线，完成A3芯片大EP Decode方舟上线及模型商用落地。",
      outcomesEn: "Single-card TPS 1700+, supporting full commercial deployment of billion-parameter model, A3 chip large EP Decode launch."
    },
    {
      id: "keyboard-printer",
      title: "华为键鼠穿越及打印机智能化项目",
      titleEn: "Huawei Keyboard/Mouse Crossing & Smart Printer",
      description: "参与华为激光打印机新品从0到1的需求定义，针对行业核心痛点完成特性创新与技术落地。",
      descriptionEn: "Participated in Huawei laser printer new product from 0 to 1 requirement definition, completing feature innovation and technology implementation.",
      metrics: ["服务人力 10人→1.2人", "预测精度±5%", "核心特性商用"],
      metricsEn: ["Service Staff 10→1.2", "Prediction Accuracy ±5%", "Core Features Launched"],
      technologies: ["RFID", "SOC", "Python"],
      link: null,
      period: "2022.06 - 2022.11",
      role: "智能硬件特性产品经理",
      roleEn: "Smart Hardware Feature PM",
      background: "为完善华为智能办公硬件生态布局，打破传统打印行业智能化程度低、用户核心痛点解决不足、产品需求管理无标准化体系的行业困境。",
      backgroundEn: "To complete Huawei's smart office hardware ecosystem, addressing low industry intelligence, unmet user pain points, and lack of standardized product requirement management.",
      contributions: [
        "深入企业、医院、学校等核心场景挖掘需求，输出全场景需求分析说明书，完成激光打印机需求架构与规格定义",
        "创新搭建三级需求分级管理模型，输出华为首版激光打印机三方合作RFI全维度规格书",
        "设计耗材全生命周期管理方案，定义耗材芯片与设备SOC交互逻辑，创新基于历史打印数据的余量预测算法与RFID防伪方案",
        "主导半色调画质优化算法重构，完成图像预处理到打印输出的全链路画质优化"
      ],
      contributionsEn: [
        "Conducted field research at enterprises, hospitals, schools; produced full-scenario requirements analysis and printer specification definition",
        "Built 3-tier requirements management model, produced Huawei's first laser printer 3rd-party RFI specification",
        "Designed consumable lifecycle management with chip-SOC interaction logic. historical data-based residual prediction algorithm, and RFID anti-counterfeiting",
        "Led halftone image quality optimization algorithm reconstruction. full-link quality improvement"
      ],
      outcomes: "打印机项目两大核心智能特性全量商用落地；一线服务月人力投入从10人优化至1.2人；耗材更换周期预测精度达±5%。键鼠穿越特性成功商用，成为多屏协同生态核心差异化卖点。",
      outcomesEn: "Two core smart features commercially deployed; service staff reduced from 10 to 1.2/month; consumable prediction accuracy ±5%. Keyboard/mouse crossing feature commercially launched as multi-screen ecosystem differentiator."
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
