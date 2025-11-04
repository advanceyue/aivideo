# RWA Platform Design System

> **设计理念**：为开放经济而设计 - 连接现实世界与区块链世界

## 核心设计原则

### 1. 开放与透明
- 使用大量留白，营造"呼吸感"
- 简约的线条图标，传达空间感
- 断裂/缺口设计元素，象征"开放"

### 2. 专业与信赖
- 深色主题为主，营造专业金融氛围
- 干净整洁的布局，避免视觉杂乱
- 清晰的信息层次，易于理解

### 3. 现实与链接
- 高质量的实景摄影（建筑、城市、人物）
- 强调技术对现实世界的影响
- 避免过度的抽象科技感

---

## 颜色系统 (Color Palette)

### 主色调 (Primary Colors)

```
背景色系 (Background):
- bg-primary:   #0A1628  (深蓝黑，主背景)
- bg-secondary: #111C2E  (次级背景)
- bg-tertiary:  #1A2942  (卡片背景)
- bg-elevated:  #223254  (悬浮卡片)

品牌色 (Brand):
- brand-primary:   #3B82F6  (亮蓝，主要操作)
- brand-secondary: #60A5FA  (浅蓝，悬停状态)
- brand-dark:      #2563EB  (深蓝，按下状态)

文本色 (Text):
- text-primary:   #F8FAFC  (白色，主要文字)
- text-secondary: #CBD5E1  (灰白，次要文字)
- text-tertiary:  #94A3B8  (灰色，辅助文字)
- text-disabled:  #64748B  (灰色，禁用状态)

边框色 (Border):
- border-primary:   #334155  (深灰，默认边框)
- border-secondary: #475569  (中灰，悬停边框)
- border-focus:     #3B82F6  (品牌色，聚焦边框)
```

### 语义色 (Semantic Colors)

```
成功 (Success):
- success-bg:   #064E3B
- success-text: #34D399
- success-main: #10B981

错误 (Error):
- error-bg:   #7F1D1D
- error-text: #FCA5A5
- error-main: #EF4444

警告 (Warning):
- warning-bg:   #78350F
- warning-text: #FCD34D
- warning-main: #F59E0B

信息 (Info):
- info-bg:   #1E3A8A
- info-text: #93C5FD
- info-main: #3B82F6

涨跌色 (Trading):
- up-color:   #10B981  (涨/买入)
- down-color: #EF4444  (跌/卖出)
```

---

## 字体系统 (Typography)

### 字体族 (Font Family)

```css
/* 英文主字体 - 使用系统字体栈，专业简洁 */
font-sans: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI",
           Roboto, "Helvetica Neue", Arial, sans-serif

/* 中文主字体 */
font-zh: "PingFang SC", "Microsoft YaHei", sans-serif

/* 数字/代码字体 - 等宽，用于金额、价格 */
font-mono: ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono",
           "Courier New", monospace

/* 特殊定制字体（可选）
   类似 Ondo Sans，字母有"缺口"设计，呼应开放理念
   需要自行设计或购买 */
```

### 字号体系 (Font Sizes)

```
text-xs:   12px / 0.75rem   (小标签、脚注)
text-sm:   14px / 0.875rem  (次要文字、表格)
text-base: 16px / 1rem      (正文、输入框)
text-lg:   18px / 1.125rem  (小标题)
text-xl:   20px / 1.25rem   (卡片标题)
text-2xl:  24px / 1.5rem    (页面标题)
text-3xl:  30px / 1.875rem  (大标题)
text-4xl:  36px / 2.25rem   (重要数字)
text-5xl:  48px / 3rem      (首页 Hero)
text-6xl:  60px / 3.75rem   (大屏展示)
```

### 字重 (Font Weights)

```
font-light:    300  (辅助信息)
font-normal:   400  (正文)
font-medium:   500  (强调文字)
font-semibold: 600  (小标题)
font-bold:     700  (大标题、按钮)
```

### 行高 (Line Heights)

```
leading-tight:   1.25  (标题、数字)
leading-snug:    1.375 (卡片标题)
leading-normal:  1.5   (正文)
leading-relaxed: 1.625 (长文本)
```

---

## 间距系统 (Spacing)

基于 4px 网格系统

```
0:  0px
1:  4px    (极小间距，图标与文字)
2:  8px    (小间距，表单内元素)
3:  12px   (中小间距)
4:  16px   (标准间距，组件内边距)
5:  20px   (中等间距)
6:  24px   (大间距，卡片间距)
8:  32px   (特大间距，区块间距)
10: 40px   (超大间距)
12: 48px   (页面边距)
16: 64px   (大屏区块间距)
20: 80px   (首页区块)
24: 96px   (超大区块)
```

---

## 圆角系统 (Border Radius)

```
rounded-none: 0px      (直角，表格)
rounded-sm:   2px      (极小圆角，输入框内部)
rounded:      4px      (小圆角，按钮、标签)
rounded-md:   6px      (标准圆角，卡片)
rounded-lg:   8px      (大圆角，模态框)
rounded-xl:   12px     (特大圆角，重要卡片)
rounded-2xl:  16px     (超大圆角，首页卡片)
rounded-full: 9999px   (圆形，头像、图标)
```

---

## 阴影系统 (Shadows)

深色主题下的阴影更偏向发光效果

```css
/* 卡片阴影 */
shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.5)
shadow:     0 2px 8px rgba(0, 0, 0, 0.6)
shadow-md:  0 4px 12px rgba(0, 0, 0, 0.7)
shadow-lg:  0 8px 24px rgba(0, 0, 0, 0.8)
shadow-xl:  0 12px 36px rgba(0, 0, 0, 0.9)

/* 品牌色发光（用于焦点、强调） */
shadow-brand: 0 0 0 3px rgba(59, 130, 246, 0.3)
shadow-glow:  0 0 20px rgba(59, 130, 246, 0.5)

/* 内阴影（输入框） */
shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.4)
```

---

## 组件设计规范

### 按钮 (Button)

#### 主要按钮 (Primary)
```
背景: brand-primary (#3B82F6)
文字: text-primary (#F8FAFC)
圆角: rounded (4px)
内边距: px-6 py-2.5 (24px 10px)
字体: font-medium text-sm
悬停: bg-brand-secondary + shadow-md
按下: bg-brand-dark
禁用: opacity-50 + cursor-not-allowed
```

#### 次要按钮 (Secondary)
```
背景: transparent
边框: 1px solid border-secondary
文字: text-primary
悬停: border-brand-primary + text-brand-primary
```

#### 危险按钮 (Danger)
```
背景: error-main (#EF4444)
悬停: 亮度增加 10%
```

### 输入框 (Input)

```
背景: bg-tertiary (#1A2942)
边框: 1px solid border-primary
圆角: rounded (4px)
内边距: px-4 py-2.5 (16px 10px)
文字: text-base text-primary
占位符: text-tertiary
聚焦: border-focus + shadow-brand
禁用: bg-secondary + text-disabled
```

### 卡片 (Card)

```
背景: bg-tertiary (#1A2942)
圆角: rounded-lg (8px)
内边距: p-6 (24px)
阴影: shadow-md
边框: 可选 1px solid border-primary
悬停: bg-elevated + shadow-lg (可选)
```

### 表格 (Table)

```
表头:
  背景: bg-secondary
  文字: text-secondary font-semibold text-xs uppercase
  内边距: px-6 py-3
  边框底部: 1px solid border-primary

表格行:
  背景: transparent
  文字: text-primary text-sm
  内边距: px-6 py-4
  边框底部: 1px solid border-primary
  悬停: bg-tertiary

条纹行（可选）:
  奇数行: transparent
  偶数行: bg-secondary/50
```

### 模态框 (Modal)

```
遮罩:
  背景: rgba(0, 0, 0, 0.8)
  模糊: backdrop-blur-sm

内容:
  背景: bg-secondary
  圆角: rounded-xl (12px)
  阴影: shadow-2xl
  最大宽度: max-w-lg (512px)
  边框: 1px solid border-primary
```

### 标签 (Badge)

```
尺寸: px-2.5 py-0.5
圆角: rounded-full
字体: text-xs font-medium

类型:
  默认: bg-tertiary text-secondary
  成功: bg-success-bg text-success-text
  错误: bg-error-bg text-error-text
  警告: bg-warning-bg text-warning-text
```

---

## 图标系统 (Icons)

### 图标库
推荐使用 **Lucide Icons** - 简约线条风格，符合"开放透明"理念

### 图标尺寸
```
icon-xs:  16px  (按钮内图标)
icon-sm:  20px  (导航图标)
icon-md:  24px  (卡片图标)
icon-lg:  32px  (功能入口图标)
icon-xl:  48px  (首页特色图标)
```

### 图标使用规范
- 统一使用 1.5px 描边宽度
- 图标与文字垂直居中对齐
- 图标与文字间距: 8px (space-2)
- 可交互图标悬停时亮度增加

---

## 动画与过渡 (Animations)

### 过渡时长
```
duration-75:   75ms   (极快，按钮反馈)
duration-100:  100ms  (快，下拉菜单)
duration-150:  150ms  (标准，悬停效果)
duration-200:  200ms  (中等，模态框)
duration-300:  300ms  (慢，页面切换)
duration-500:  500ms  (特慢，首页动画)
```

### 缓动函数
```
ease-linear:     linear
ease-in:         cubic-bezier(0.4, 0, 1, 1)
ease-out:        cubic-bezier(0, 0, 0.2, 1)
ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1)
ease-smooth:     cubic-bezier(0.25, 0.1, 0.25, 1)  (推荐)
```

### 常用动画

#### 淡入淡出
```css
.fade-in {
  animation: fadeIn 200ms ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### 滑入
```css
.slide-in-bottom {
  animation: slideInBottom 300ms ease-out;
}

@keyframes slideInBottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### 悬浮效果
```css
.hover-lift {
  transition: all 150ms ease-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
}
```

---

## 布局规范 (Layout)

### 容器宽度
```
container-sm:  640px  (小屏内容)
container-md:  768px  (中屏内容)
container-lg:  1024px (大屏内容，默认)
container-xl:  1280px (超大屏内容)
container-2xl: 1536px (全屏内容)
```

### 网格系统
```
栅格列数: 12列
间距: gap-6 (24px)
响应式: 小屏1列，中屏2列，大屏3列，超大屏4列
```

### 页面结构
```
导航栏高度: 64px (h-16)
侧边栏宽度: 280px (w-70，管理后台)
页面内边距: p-6 到 p-12 (24px - 48px)
区块间距: space-y-8 到 space-y-12 (32px - 48px)
```

---

## 响应式断点 (Breakpoints)

```
sm:  640px   (手机横屏)
md:  768px   (平板竖屏)
lg:  1024px  (平板横屏、小笔记本)
xl:  1280px  (笔记本、台式机，推荐设计基准)
2xl: 1536px  (大屏台式机)
```

### 响应式策略
- 移动优先 (Mobile First)
- 关键操作在所有屏幕上可访问
- 大屏幕优化布局，不简单放大

---

## 数据可视化 (Data Visualization)

### 图表颜色
```
折线图: brand-primary (#3B82F6)
柱状图: brand-primary (#3B82F6), brand-secondary (#60A5FA)
饼图:
  - #3B82F6 (蓝)
  - #10B981 (绿)
  - #F59E0B (橙)
  - #EF4444 (红)
  - #8B5CF6 (紫)
  - #EC4899 (粉)

涨跌图:
  涨: up-color (#10B981)
  跌: down-color (#EF4444)
```

### K线图
```
涨:
  边框: #10B981
  填充: #10B981 (实心) / transparent (空心)
跌:
  边框: #EF4444
  填充: #EF4444 (实心) / transparent (空心)
背景网格: border-primary (#334155)
```

---

## 特殊设计元素

### 开放符号 (Openness Symbol)
在关键位置使用"缺口"或"断裂"设计，象征开放：
- Logo 中字母的缺口
- 卡片边框的断点
- 分隔线的间隙
- 图标的不完整线条

### 实景摄影
用于：
- 首页 Hero 区
- 关于我们页面
- 资产详情配图

要求：
- 高质量专业摄影
- 建筑、城市、人物主题
- 传达"现实世界"与"真实影响"
- 避免过度滤镜，保持真实感

### 深度与层次
使用阴影和背景色营造层次感：
```
层级 1: bg-primary (主背景)
层级 2: bg-secondary (页面容器)
层级 3: bg-tertiary (卡片)
层级 4: bg-elevated (悬浮卡片、下拉菜单)
层级 5: 模态框 (bg-secondary + shadow-2xl)
```

---

## Tailwind CSS 配置

将上述设计系统转换为 Tailwind 配置：

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A1628',
          secondary: '#111C2E',
          tertiary: '#1A2942',
          elevated: '#223254',
        },
        brand: {
          primary: '#3B82F6',
          secondary: '#60A5FA',
          dark: '#2563EB',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          tertiary: '#94A3B8',
          disabled: '#64748B',
        },
        border: {
          primary: '#334155',
          secondary: '#475569',
          focus: '#3B82F6',
        },
        success: {
          bg: '#064E3B',
          text: '#34D399',
          main: '#10B981',
        },
        error: {
          bg: '#7F1D1D',
          text: '#FCA5A5',
          main: '#EF4444',
        },
        warning: {
          bg: '#78350F',
          text: '#FCD34D',
          main: '#F59E0B',
        },
        info: {
          bg: '#1E3A8A',
          text: '#93C5FD',
          main: '#3B82F6',
        },
        up: '#10B981',
        down: '#EF4444',
      },
      fontFamily: {
        sans: ['ui-sans-serif', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SF Mono', 'Cascadia Code', 'monospace'],
      },
      boxShadow: {
        'brand': '0 0 0 3px rgba(59, 130, 246, 0.3)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
      },
    },
  },
  plugins: [],
}
```

---

## 设计工具与资源

### 推荐工具
- **Figma**: UI 设计与原型
- **Unsplash**: 高质量实景摄影
- **Lucide Icons**: 图标库
- **TradingView**: K线图组件

### 参考资源
- Stripe Design System
- Linear Design
- Coinbase Design
- Vercel Design

---

## 可访问性 (Accessibility)

### 对比度
确保文字与背景对比度符合 WCAG AA 标准：
- 正常文字: 至少 4.5:1
- 大号文字: 至少 3:1

### 键盘导航
- 所有交互元素可通过 Tab 键访问
- 聚焦时显示明显的 focus ring (shadow-brand)
- 支持 Enter/Space 触发操作

### 屏幕阅读器
- 使用语义化 HTML 标签
- 图标按钮添加 aria-label
- 表单输入框关联 label

### 色彩
- 不仅依赖颜色传达信息（涨跌使用箭头+颜色）
- 提供高对比度模式（可选）

---

## 更新日志

**v1.0.0** - 2025-11-03
- 初始设计系统文档
- 定义核心设计原则
- 建立完整的颜色、字体、组件规范
