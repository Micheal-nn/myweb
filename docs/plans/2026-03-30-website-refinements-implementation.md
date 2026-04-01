# Website Refinements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement four refinements to the personal website: name display hierarchy, liquid metal background, flip card project details, and language toggle.

**Architecture:**
1. Update intro page name typography and config
2. Replace WebGL fluid background with liquid metal shader
3. Enhance ProjectCard with flip animation and full resume content
4. Create LanguageContext and toggle button, integrate into content pages

**Tech Stack:**
- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- Framer Motion for animations
- WebGL (canvas 2D context with custom shaders)
- React Context for state management

---

## Task 1: Update Name Display Hierarchy

**Files:**
- Modify: `lib/config.ts:11-12`
- Modify: `app/page.tsx:27-32`

**Step 1: Update config with Michael as English name**

Open `lib/config.ts` and change line 12:

```typescript
// Change from:
nameEn: "Ma Chen'en",

// To:
nameEn: "Michael",
```

**Step 2: Update intro page name typography**

Open `app/page.tsx`, replace the h1 and p elements (lines 27-32):

```tsx
<h1 className="text-6xl md:text-9xl font-display font-bold mb-2">
  {siteConfig.intro.nameEn}
</h1>
<p className="text-3xl md:text-4xl text-text-secondary font-light">
  {siteConfig.intro.name}
</p>
```

**Step 3: Verify dev server**

Run:
```bash
cd D:/models/myproject/myprofile/my-website
npm run dev --webpack
```

Visit http://localhost:3000 and verify:
- "MICHAEL" displays in large font
- "马晨恩" displays in smaller font below

**Step 4: Commit**

```bash
git add lib/config.ts app/page.tsx
git commit -m "feat: update name display hierarchy - Michael larger, Chinese smaller"
```

---

## Task 2: Implement Liquid Metal Background Animation

**Files:**
- Modify: `components/FluidBackground.tsx:38-65` (shader section)

**Step 1: Update fragment shader for liquid metal effect**

Open `components/FluidBackground.tsx`, replace the `fragmentShaderSource` (lines 38-65):

```glsl
const fragmentShaderSource = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  // Simplex 3D Noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;

    // Liquid metal flow with multi-layered noise
    float time = u_time * 0.4; // Slower speed for elegance
    float noise1 = snoise(vec3(uv * 3.0, time * 0.5));
    float noise2 = snoise(vec3(uv * 6.0 + 100.0, time * 0.7)) * 0.5;
    float noise3 = snoise(vec3(uv * 12.0 + 200.0, time * 0.3)) * 0.25;
    float flow = noise1 + noise2 + noise3;

    // Mouse interaction - gentle ripples
    float dist = distance(uv, mouse);
    float ripple = sin(dist * 25.0 - time * 4.0) * 0.08 * smoothstep(0.4, 0.0, dist);
    flow += ripple;

    // Color palette: Silver, Gunmetal, Deep Blue
    vec3 silver = vec3(0.753, 0.753, 0.753);   // #C0C0C0
    vec3 gunmetal = vec3(0.173, 0.208, 0.224); // #2C3539
    vec3 deepBlue = vec3(0.102, 0.137, 0.494); // #1A237E

    // Mix colors based on noise flow
    vec3 color = mix(gunmetal, deepBlue, uv.y * 0.6 + flow * 0.2);
    color = mix(color, silver, smoothstep(-0.3, 0.5, flow) * 0.3);

    // Specular highlight effect
    float specular = pow(max(0.0, flow), 2.0) * 0.4;
    color += vec3(specular);

    // Alpha for subtle background
    gl_FragColor = vec4(color, 0.7);
  }
`
```

**Step 2: Update canvas background**

In `components/FluidBackground.tsx`, line 140, update the canvas style:

```tsx
style={{ background: '#0a0a0a' }} // Keep as is
```

**Step 3: Test the animation**

Visit http://localhost:3000 and verify:
- Background shows liquid metal effect
- Colors blend silver/gunmetal/blue
- Animation is smooth and elegant (not chaotic)
- Mouse interaction creates gentle ripples

**Step 4: Commit**

```bash
git add components/FluidBackground.tsx
git commit -m "feat: implement liquid metal background with silver/gunmetal/blue palette"
```

---

## Task 3: Create Flip Card Project Detail View

**Files:**
- Modify: `lib/config.ts:118-155` (extend projects with full descriptions)
- Modify: `components/ProjectCard.tsx` (entire file)

**Step 1: Extend project data with full descriptions**

Open `lib/config.ts`, replace the `projects` array (lines 118-155) with complete content:

```typescript
projects: [
  {
    id: "llm-optimization",
    title: "大模型推理性能优化与算子基建项目",
    titleEn: "LLM Inference Optimization & Operator Infrastructure",
    description: "主导千亿级大模型算子开发、推理性能调优与硬件适配，负责Flash Attention系列算子的功能实现、精度对齐与性能优化。",
    descriptionFull: {
      background: "针对千亿级大模型商用落地面临的推理性能瓶颈、算子硬件性能黑箱化、开发迭代周期长等核心行业痛点，先后主导负责字节跳动豆包千亿大模型推理性能调优、基于PYPTO的FIA融合推理注意力算子开发调优、FA算子全量化性能建模三大核心模块。",
      contributions: [
        "1) 算子性能建模产品：基于FA计算逻辑的全量化硬件性能分析工具，无需编写Ascend C代码即可精准预估算子硬件性能。基于Roofline模型完成FA、GQA/MLA/PA等主流大模型算子的计算-访存全流程拆解，建立算子理论性能上限数学模型；覆盖全位宽、多粒度、多算法的量化策略，完成量化场景下的算子性能映射建模，针对昇腾芯片完成向量、矩阵运算指令的cycle级性能摸底。工具可通过量化-分块-硬件协同优化锁定最优方案，精准定位计算/带宽/SRAM瓶颈，大幅降低算子开发试错成本。",
        "2) 算子开发调优与agent：主导CANN套件PYPTO的FA系列算子全流程开发，适配GLM-4\\DS32等主流大模型复杂注意力架构（PFA/IFA/SFA/MLA/LI），完成功能原生重构、rtol<0.05级精度全量验证。通过Tile分块精细化优化、硬件亲和性调优、因果注意力架构重构等攻坚，突破初始版本性能不足原生算子0.6倍的瓶颈，最终性能达标。沉淀标准化开发流程，研发全流程开发技能自动化算子开发Agent，实现端到端提效。",
        "3) 字节跳动驻场豆包大模型性能调优项目：豆包大模型M9在10k长序列场景下的单卡吞吐、推理延迟等指标不足，且昇腾算子适配验证、多模块协同优化存在诸多难点。项目中支撑A3芯片在大EP Decode方舟上线及模型商用落地，聚焦豆包M9大模型完成全链路性能优化。项目中先完成M9模型性能专项攻坚，解决IPC与cachemiss关联影响、内存管理优化等问题，将推理任务下发耗时从70ms降至8ms，在10k长序列场景下实现单卡TPS达1710，超额完成1700+的目标，autoeval跑分达65。同时完成客户自定义算子集适配，跑通开源中间层XpuGraph，实现eager与compile模式张量精度一致。此外，叠加服务化框架完成MTP、多机分布式、PD分离等多维度优化，形成全链路优化方案。"
      ],
      results: [
        "性能建模实现理论性能预估与实测值误差≤15%，将算子开发迭代周期从7天压缩至1天以内",
        "基于pypto开发的FIA算子性能达ascendC基准0.6倍",
        "豆包大模型调优实现单卡TPS 1700+，支撑千亿级模型全量商用上线"
      ]
    },
    metrics: ["单卡TPS 1700+", "开发周期7天→1天", "性能建模误差≤15%"],
    technologies: ["Python", "C++", "PyTorch", "Flash Attention", "Ascend C"],
    link: null,
  },
  {
    id: "power-distribution",
    title: "基站智能供配电算法产品化项目",
    titleEn: "Intelligent Base Station Power Distribution Algorithm",
    description: "针对运营商基站配电改造成本高、电源利用率不足、功率秒级波动易引发跳闸的痛点，打造智能化供配电算法产品。",
    descriptionFull: {
      background: "针对运营商基站配电改造成本高、周期长、电源实际利用率不足50%、功率秒级波动易引发跳闸的行业共性痛点，现有方案无法平衡供电安全、网络质量与改造成本，难以兼顾降本增效与风险防控，需打造智能化供配电算法产品，实现精细化配电管控。",
      contributions: [
        "1) 按需供电算法：采用卡尔曼滤波实现秒级小区负载预测，平均预测误差6.5%；搭建四层MLP模型实现射频模块秒级功率预测，拟合优度92%、平均误差1.34%；基于SLSQP算法求解带电源硬约束的谱效损失最小化优化问题，保障功率分配的实时性与最优性；设计动态冗余反馈机制，大幅提升系统鲁棒性。",
        "2) 按需配电算法：构建MLP模型实现4/5G小区小时级负载分布统一建模，拟合优度97%；设计差分进化+局部优化的混合寻优策略，搭配随机抽样方案解决多载波多模块场景的算力瓶颈；优化分布式计算架构，解决百GB级数据CPU处理的内存溢出与并行锁冲突问题。"
      ],
      results: [
        "秒级功率锁实现基站100%不超载，忙时电源利用率达98%",
        "功率预测综合误差0.4%，谱效损失预估平均误差3.8%",
        "在5%谱效损失容忍度内，实现30%的配电量压缩",
        "数据清理效率从天级优化至小时级，配电策略寻优时间从天级压缩至秒级",
        "已获得发明专利授权，专利号：202510828251.7"
      ]
    },
    metrics: ["配电量压缩30%", "电源利用率98%", "专利授权"],
    technologies: ["Python", "MLP", "SLSQP", "Kalman Filter", "差分进化算法"],
    link: null,
  },
  {
    id: "network-prediction",
    title: "前传隐患业务影响量化评估及智能修复方案",
    titleEn: "Network Fault Prediction & Impact Quantification",
    description: "通信网络传统被动式运维模式升级为主动预防，量化前传误码对业务的实际影响，实现故障事前预防。",
    descriptionFull: {
      background: "通信网络传统被动式运维模式下，前传类故障工单占比高，行业核心痛点为无法量化前传误码对频谱效率、用户下行速率的实际业务影响，导致隐患治理无科学优先级，运维人力投放低效，难以实现故障事前预防。",
      contributions: [
        "1) 研发用户级秒级前传误码-谱效影响量化MLP模型，采用控制变量法隔离干扰因素，创新用户抽样+流量加权的小区级结果汇总方案，在降低90%以上算力负载的同时，保障预测精度，解决了用户分布差异导致的小区级评估精度不足问题。",
        "2) 搭建谱效-下行速率映射MLP模型，解耦用户级精度评估与小区级体验量化，为一线运维提供可落地的判断依据。设计误码触发式检测机制，减少93%的无效计算与冗余存储；创新影子模式部署方案，解决模型迭代的数据瓶颈与现网部署风险，配套完成隐患治理优先级排序体系与秒级数据时间对齐方案。"
      ],
      results: [
        "谱效影响量化平均相对误差0.9%，下行速率预测误差<10%",
        "拟合优度R²达0.8，完成杭州内场理想环境验证",
        "已规模应用于浙江移动等运营商局点"
      ]
    },
    metrics: ["谱效误差0.9%", "预测误差<10%", "R²=0.8"],
    technologies: ["Python", "MLP", "影子模式部署", "控制变量法"],
    link: null,
  },
  {
    id: "printer-smart",
    title: "华为键鼠穿越及打印机智能化项目",
    titleEn: "Huawei Multi-Screen Collaboration & Smart Printer",
    description: "完善华为智能办公硬件生态布局，参与激光打印机新品从0到1的需求定义，针对行业核心痛点完成特性创新。",
    descriptionFull: {
      background: "为完善华为智能办公硬件生态布局，打破传统打印行业智能化程度低、用户核心痛点解决不足、产品需求管理无标准化体系的行业困境，参与华为激光打印机新品从0到1的需求定义，针对行业通用共性痛点，完成特性创新与技术落地。",
      contributions: [
        "深入企业、医院、学校等核心场景挖掘需求，输出全场景需求分析说明书，完成激光打印机需求架构与规格定义；创新搭建三级需求分级管理模型，颗粒度细化至特性级，输出华为首版激光打印机三方合作RFI全维度规格书。",
        "针对行业核心痛点，设计耗材全生命周期管理方案，定义耗材芯片与设备SOC的交互逻辑，创新基于历史打印数据的余量预测算法、RFID防伪方案与硒鼓粉盒联动阈值机制；主导半色调画质优化算法重构，完成图像预处理到打印输出的全链路画质优化，解决画面颗粒感强、还原度不足的用户痛点。"
      ],
      results: [
        "打印机项目两大核心智能特性全量商用落地",
        "一线服务月人力投入从10人优化至1.2人",
        "耗材更换周期预测精度达±5%",
        "打印图像还原度与用户满意度显著提升",
        "键鼠穿越特性成功商用，成为多屏协同生态核心差异化卖点"
      ]
    },
    metrics: ["服务人力10人→1.2人", "预测精度±5%", "特性全量商用"],
    technologies: ["需求管理", "画质优化算法", "RFID防伪", "多屏协同"],
    link: null,
  },
],
```

**Step 2: Update TypeScript type for project descriptions**

Add to `lib/config.ts` after the existing type definition (around line 200):

```typescript
export type ProjectDescription = {
  background: string
  contributions: string[]
  results: string[]
}

export type SiteConfig = typeof siteConfig & {
  projects: Array<{
    id: string
    title: string
    titleEn: string
    description: string
    descriptionFull: ProjectDescription
    metrics: string[]
    technologies: string[]
    link: string | null
  }>
};
```

**Step 3: Rewrite ProjectCard component with flip functionality**

Replace entire `components/ProjectCard.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronLeft } from 'lucide-react'

interface ProjectCardProps {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionFull: {
    background: string
    contributions: string[]
    results: string[]
  }
  metrics: string[]
  technologies: string[]
  link: string | null
  index: number
}

export default function ProjectCard({
  id,
  title,
  titleEn,
  description,
  descriptionFull,
  metrics,
  technologies,
  link,
  index,
}: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="perspective-container" style={{ perspective: '1000px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="card cursor-pointer relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.5s ease-in-out',
          minHeight: isFlipped ? '600px' : 'auto',
        }}
        onClick={() => !isFlipped && setIsFlipped(true)}
        onMouseEnter={(e) => !isFlipped && e.currentTarget.style.transform = 'rotateY(-3deg) rotateX(2deg)'}
        onMouseLeave={(e) => !isFlipped && (e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg)')}
      >
        {/* Front Face */}
        <AnimatePresence mode="wait">
          {!isFlipped && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="front-face"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-text-secondary text-sm">{titleEn}</p>
              </div>

              <p className="text-text-secondary mb-4 text-sm">{description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {metrics.slice(0, 2).map((metric, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white/5 text-text-secondary rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-text-secondary/50 text-xs flex items-center gap-1">
                点击查看详情 <ExternalLink className="w-3 h-3" />
              </p>
            </motion.div>
          )}

          {isFlipped && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="back-face absolute inset-0 p-6 overflow-y-auto"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFlipped(false)
                }}
                className="absolute top-4 right-4 text-text-secondary hover:text-accent-primary transition-colors"
                title="返回"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <h3 className="text-lg font-bold mb-4 pr-8">{title}</h3>

              <div className="mb-4">
                <h4 className="text-accent-primary font-semibold mb-2 text-sm">【需求背景】</h4>
                <p className="text-text-secondary text-xs leading-relaxed">{descriptionFull.background}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-accent-primary font-semibold mb-2 text-sm">【过程与核心贡献】</h4>
                <div className="space-y-2">
                  {descriptionFull.contributions.map((contribution, i) => (
                    <p key={i} className="text-text-secondary text-xs leading-relaxed">
                      {contribution}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-accent-primary font-semibold mb-2 text-sm">【项目成果】</h4>
                <ul className="space-y-1">
                  {descriptionFull.results.map((result, i) => (
                    <li key={i} className="text-text-secondary text-xs leading-relaxed flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent-primary hover:underline text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  View on GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
```

**Step 4: Test flip cards**

Visit http://localhost:3000/projects and verify:
- Cards tilt slightly on hover
- Click flips card 180°
- Back face shows full project details
- Click back button or "返回" flips back
- All 4 projects work correctly

**Step 5: Commit**

```bash
git add lib/config.ts components/ProjectCard.tsx
git commit -m "feat: add flip card project detail view with full resume content"
```

---

## Task 4: Create Language Toggle and Context

**Files:**
- Create: `context/LanguageContext.tsx`
- Create: `components/LanguageToggle.tsx`
- Modify: `app/layout.tsx` (add provider to content pages)

**Step 1: Create LanguageContext**

Create new file `context/LanguageContext.tsx`:

```tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en')
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
```

**Step 2: Create LanguageToggle button**

Create new file `components/LanguageToggle.tsx`:

```tsx
'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:border-accent-primary/50 transition-all duration-300"
      title="切换语言 / Switch Language"
    >
      <span
        className={`text-sm font-medium transition-colors ${
          language === 'en' ? 'text-accent-primary' : 'text-text-secondary/50'
        }`}
      >
        EN
      </span>
      <span className="text-text-secondary/30">/</span>
      <span
        className={`text-sm font-medium transition-colors ${
          language === 'zh' ? 'text-accent-primary' : 'text-text-secondary/50'
        }`}
      >
        中
      </span>
    </button>
  )
}
```

**Step 3: Update root layout to include LanguageToggle**

Modify `app/layout.tsx` to add LanguageProvider and LanguageToggle:

```tsx
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import FluidBackground from "@/components/FluidBackground"
import { LanguageProvider } from "@/context/LanguageContext"
import LanguageToggle from "@/components/LanguageToggle"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" })
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Michael | Ma Chen'en",
  description: "AI Technical Product Manager at Huawei",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Determine if we're on a content page (not intro or main)
  const isContentPage = children && typeof children === 'object' &&
    'props' in children &&
    children.props?.childProp?.segment &&
    !['/', '/main'].includes(children.props.childProp.segment)

  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <LanguageProvider>
          <FluidBackground />
          {children}
          {/* Only show toggle on content pages */}
          {isContentPage && <LanguageToggle />}
        </LanguageProvider>
      </body>
    </html>
  )
}
```

**Step 4: Alternative approach - add toggle to individual content pages**

Since determining content pages in layout is complex, let's add toggle directly to content pages.

Update `app/about/page.tsx`:

```tsx
import PageLayout from '@/components/PageLayout'
import LanguageToggle from '@/components/LanguageToggle'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutPage() {
  const { language } = useLanguage()

  return (
    <>
      <LanguageToggle />
      <PageLayout
        title={language === 'zh' ? '关于' : 'About'}
        titleZh="关于"
        titleEn="About"
      >
        {/* Content will use language state */}
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-text-secondary mb-6">
            {language === 'zh'
              ? '你好，我是Michael，一名AI技术产品经理...'
              : 'Hello, I\'m Michael, an AI Technical Product Manager...'}
          </p>
        </div>
      </PageLayout>
    </>
  )
}
```

Repeat for other content pages similarly.

**Step 5: Test language toggle**

Visit http://localhost:3000/about and verify:
- Toggle button appears in top-right
- Click toggles between EN / 中
- Content updates accordingly
- Toggle does NOT appear on / or /main

**Step 6: Commit**

```bash
git add context/ components/LanguageToggle.tsx app/about/page.tsx app/experience/page.tsx app/projects/page.tsx app/skills/page.tsx app/blog/page.tsx app/contact/page.tsx
git commit -m "feat: add language toggle (EN/中) to content pages with context state"
```

---

## Task 5: Final Testing and Cleanup

**Files:**
- All modified files

**Step 1: Run typecheck**

```bash
cd D:/models/myproject/myprofile/my-website
npx tsc --noEmit
```

Expected: No TypeScript errors

**Step 2: Run build**

```bash
npm run build
```

Expected: Build successful, 8 pages generated

**Step 3: Manual testing checklist**

- [ ] Intro page: "MICHAEL" larger, "马晨恩" smaller
- [ ] Background: Liquid metal effect with smooth animation
- [ ] Projects page: Cards flip on click with full details
- [ ] About page: Language toggle works, content switches
- [ ] Experience page: Language toggle works
- [ ] Skills page: Language toggle works
- [ ] Blog page: Language toggle works
- [ ] Contact page: Language toggle works
- [ ] Intro (/): No language toggle
- [ ] Main (/main): No language toggle
- [ ] All flip cards show full resume content
- [ ] Mouse interaction on background works

**Step 4: Fix any issues found**

If issues found, address them and re-test.

**Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final testing and cleanup for website refinements"
```

---

## Summary

This implementation plan covers:

1. ✅ Name display hierarchy (Michael larger, Chinese smaller)
2. ✅ Liquid metal background with silver/gunmetal/blue palette
3. ✅ Flip card project details with full resume content
4. ✅ Language toggle on content pages only (English default, no persistence)

**Total estimated time**: ~8.5 hours

**Verification**:
- All TypeScript errors resolved
- Build passes
- All four refinements working correctly
- Manual testing complete
