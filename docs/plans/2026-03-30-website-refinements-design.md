# Personal Website Refinements - Design Document

**Date**: 2026-03-30
**Author**: Atlas (Master Orchestrator)
**Status**: Approved

## Overview

This document outlines the design refinements for 马晨恩's personal portfolio website, focusing on four key improvements:

1. Name display hierarchy (Michael larger, 马晨恩 smaller)
2. Liquid metal background animation with minimalist colors
3. Flip card project detail view with full resume content
4. Content-only language toggle (English default, no persistence)

## 1. Name Display on Intro Page

### Requirements
- Update English name from "Ma Chen'en" to "Michael"
- Display hierarchy: "Michael" prominent, "马晨恩" refined

### Implementation
- **Typography**:
  - "Michael": `text-6xl md:text-9xl font-bold`
  - "马晨恩": `text-3xl md:text-4xl font-light`
- **Animation**: Existing staggered fade-in preserved
- **Configuration**: Update `siteConfig.intro.nameEn` to "Michael" in `lib/config.ts`

### Visual Preview
```
     MICHAEL
    马晨恩
  AI Technical Product Manager
```

## 2. Liquid Metal Background Animation

### Requirements
- Liquid metal surface with flowing mercury effect
- Fashionable, minimalist color palette
- Smooth, glossy movement

### Visual Style
- **Color Palette**:
  - Silver: `#C0C0C0`
  - Gunmetal: `#2C3539`
  - Deep Blue: `#1A237E`
- **Animation**: Slower speed (0.3-0.5x current) for elegance
- **Alpha**: 0.6-0.8 for subtle, non-distracting background
- **Mouse Interaction**: Gentle ripples that propagate smoothly

### Technical Implementation
- **Fragment Shader**:
  - Base: Dark gunmetal gradient
  - Noise: Multi-layered Perlin/Simplex noise for organic flow
  - Highlight: Specular reflection following mouse position
  - Color: Mix silver highlights into blue undertones
- **Optimization**: Continuous slow flow (not chaotic), 2-3 color blend points

## 3. Project Card Flip Animation

### Requirements
- Flip card design: Brief front, detailed back
- Full project content from resume preserved
- Smooth flip animation

### Interaction Design
- **Hover**: Card tilts 3-5° to hint interactivity
- **Click**: Card flips 180° with smooth rotation
- **Front Face**: Brief summary
  - Title (Chinese + English)
  - 1-sentence description
  - 2 key metrics
  - Technology tags
- **Back Face**: Full details from resume
  - Title with "← 返回" button
  - 需求背景
  - 过程与核心贡献
  - 项目成果
  - Link to GitHub (if available)

### Animation Details
- **Duration**: 500ms ease-in-out
- **Perspective**: 1000px
- **Technique**: Framer Motion `rotateY: 180`
- **3D**: Backface visibility hidden, z-index flip

### Projects with Full Content
1. **大模型推理性能优化与算子基建项目**
   - FA算子全量化性能建模工具
   - CANN套件PYPTO的FA系列算子开发
   - 字节跳动豆包大模型性能调优
   - 成果: 性能建模误差≤15%, 开发周期7天→1天, 单卡TPS 1700+

2. **基站智能供配电算法产品化项目**
   - 秒级按需供电算法 (卡尔曼滤波 + MLP + SLSQP)
   - 小时级按需配电算法 (差分进化 + 局部优化)
   - 成果: 30%配电量压缩, 专利授权 202510828251.7

3. **前传隐患业务影响量化评估及智能修复方案项目**
   - 用户级前传误码-谱效影响量化MLP模型
   - 谱效-下行速率映射MLP模型
   - 成果: 谱效影响误差0.9%, 已规模应用于浙江移动

4. **华为键鼠穿越及打印机智能化项目**
   - 激光打印机需求定义与规格设计
   - 耗材全生命周期管理方案
   - 半色调画质优化算法重构
   - 成果: 服务人力10人→1.2人, 打印机核心特性商用

## 4. Language Toggle Implementation

### Requirements
- Toggle button on content pages only (not intro/main hub)
- English as default language
- No localStorage persistence (reset each visit)

### Toggle Button Design
- **Position**: Top-right corner of content pages
- **Style**: Minimalist circular button with language icons
  - Current language: Highlighted with accent color
  - Other language: Dimmed
- **Animation**: Smooth fade-out and re-fade in

### State Management
- **Context**: `LanguageContext` with global language state
- **Values**: `'en' | 'zh'` (default: `'en'`)
- **Scope**: Content pages only (About, Experience, Projects, Skills, Blog, Contact)
- **Persistence**: None - reset on each visit

### Implementation Pattern
```typescript
// Provider wraps content pages
<LanguageProvider>
  {content pages...}
</LanguageProvider>

// Usage in components
const { language } = useLanguage()
<h1>{language === 'zh' ? titleZh : title}</h1>
```

### Content Strategy
- Config structure already supports bilingual fields
- Toggle button: Floating circular button in top-right
- Pages affected: All 6 content pages (About, Experience, Projects, Skills, Blog, Contact)
- Pages NOT affected: Intro page (/), Main hub (/main)

## Technical Architecture

### New Components
1. `LanguageProvider` (Context + Provider)
2. `LanguageToggle` (Button component)
3. `ProjectCardFlip` (Enhanced ProjectCard with flip functionality)
4. `FluidBackgroundLiquid` (Updated liquid metal shader)

### Modified Components
1. `page.tsx` (Intro) - Update name hierarchy
2. `FluidBackground.tsx` - Replace shader with liquid metal
3. `ProjectCard.tsx` - Enhance with flip animation and detailed back face
4. All content pages - Wrap in LanguageProvider, use language-aware rendering
5. `lib/config.ts` - Update `nameEn` to "Michael", add full project descriptions

### Files to Modify
- `app/page.tsx` - Name display
- `components/FluidBackground.tsx` - Liquid metal shader
- `components/ProjectCard.tsx` - Flip card with full details
- `components/LanguageToggle.tsx` (new) - Toggle button
- `context/LanguageContext.tsx` (new) - Language context
- `lib/config.ts` - Extended project content
- `app/about/page.tsx` - Language-aware
- `app/experience/page.tsx` - Language-aware
- `app/projects/page.tsx` - Language-aware
- `app/skills/page.tsx` - Language-aware
- `app/blog/page.tsx` - Language-aware
- `app/contact/page.tsx` - Language-aware

## Verification Criteria

- [ ] Name displays: "MICHAEL" larger, "马晨恩" smaller
- [ ] Background shows liquid metal effect with silver/gunmetal/blue palette
- [ ] Project cards flip on click with full resume content on back
- [ ] Language toggle appears on content pages only (not intro/main)
- [ ] Language switches between English (default) and Chinese
- [ ] No localStorage - language resets on refresh
- [ ] Build passes: `npm run build`
- [ ] Dev server runs: `npm run dev --webpack`
- [ ] All TypeScript errors resolved
- [ ] Visual testing: Test all flip interactions and language toggles

## Timeline Estimate

1. Name display: 30 minutes
2. Liquid metal background: 2 hours (shader development + testing)
3. Flip card with full content: 3 hours (component + content migration)
4. Language toggle: 2 hours (context + toggle + page integration)
5. Testing & refinement: 1 hour

**Total**: ~8.5 hours

## Next Steps

1. Implement design (delegated to implementation agents)
2. Test all four refinements
3. User approval
4. Deploy updates
