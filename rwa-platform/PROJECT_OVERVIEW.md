# 📊 RWA Platform 项目概览

**创建日期**: 2025-11-03
**项目类型**: RWA资产代币化交易平台
**技术架构**: Next.js + Express + PostgreSQL

---

## 🏗️ 项目结构

```
rwa-system/
│
├── 📁 frontend/                    # 前端应用（Next.js 14）
│   ├── app/                        # Next.js App Router页面
│   │   ├── (auth)/                 # 认证页面组
│   │   │   ├── login/              # 登录
│   │   │   └── register/           # 注册
│   │   ├── (dashboard)/            # 用户端页面组
│   │   │   ├── markets/            # 市场列表
│   │   │   ├── trade/[symbol]/     # 交易页面
│   │   │   ├── assets/             # 我的资产
│   │   │   ├── profile/            # 个人资料
│   │   │   └── invite/             # 邀请推荐
│   │   ├── (admin)/                # 管理端页面组
│   │   │   ├── dashboard/          # 管理首页
│   │   │   ├── users/              # 用户管理
│   │   │   ├── kyc/                # KYC审核
│   │   │   ├── assets/             # 资产管理
│   │   │   ├── orders/             # 订单管理
│   │   │   ├── wallet/             # 钱包管理
│   │   │   └── settings/           # 系统设置
│   │   ├── api/                    # Next.js API路由（可选）
│   │   ├── globals.css             # ✅ 全局样式
│   │   └── layout.tsx              # 根布局
│   │
│   ├── components/                 # React组件
│   │   ├── ui/                     # 基础UI组件（Button, Input等）
│   │   ├── layout/                 # 布局组件（Header, Sidebar等）
│   │   ├── trading/                # 交易相关组件（K线图等）
│   │   └── admin/                  # 管理端组件
│   │
│   ├── lib/                        # ✅ 工具库
│   │   ├── utils.ts                # 工具函数
│   │   ├── types.ts                # TypeScript类型
│   │   └── api-client.ts           # API客户端
│   │
│   ├── hooks/                      # 自定义React Hooks
│   ├── store/                      # Zustand状态管理
│   ├── styles/                     # 额外样式文件
│   ├── public/                     # 静态资源
│   │
│   ├── next.config.js              # ✅ Next.js配置
│   ├── tailwind.config.ts          # ✅ Tailwind配置
│   ├── tsconfig.json               # ✅ TypeScript配置
│   ├── package.json                # ✅ 依赖配置
│   └── .env.local.example          # ✅ 环境变量模板
│
├── 📁 backend/                     # 后端应用（Express + TypeScript）
│   ├── src/
│   │   ├── routes/                 # API路由
│   │   │   ├── auth.routes.ts      # 认证路由
│   │   │   ├── user.routes.ts      # 用户路由
│   │   │   ├── kyc.routes.ts       # KYC路由
│   │   │   ├── market.routes.ts    # 市场路由
│   │   │   ├── trade.routes.ts     # 交易路由
│   │   │   ├── wallet.routes.ts    # 钱包路由
│   │   │   ├── asset.routes.ts     # 资产路由
│   │   │   ├── referral.routes.ts  # 推荐路由
│   │   │   └── admin.routes.ts     # 管理路由
│   │   │
│   │   ├── controllers/            # 控制器（处理请求）
│   │   ├── services/               # 业务逻辑层
│   │   │   ├── auth.service.ts     # 认证服务
│   │   │   ├── user.service.ts     # 用户服务
│   │   │   ├── trading.service.ts  # 交易服务
│   │   │   ├── wallet.service.ts   # 钱包服务
│   │   │   └── matching.service.ts # 订单撮合引擎
│   │   │
│   │   ├── middleware/             # 中间件
│   │   │   ├── auth.middleware.ts  # JWT认证
│   │   │   ├── error.middleware.ts # 错误处理
│   │   │   ├── upload.middleware.ts# 文件上传
│   │   │   └── rate-limit.middleware.ts # 限流
│   │   │
│   │   ├── utils/                  # 工具函数
│   │   ├── config/                 # 配置文件
│   │   ├── types/                  # TypeScript类型
│   │   └── server.ts               # 服务器入口
│   │
│   ├── prisma/                     # Prisma ORM
│   │   ├── schema.prisma           # ✅ 数据库Schema
│   │   ├── migrations/             # 数据库迁移文件
│   │   └── seed.ts                 # 种子数据
│   │
│   ├── uploads/                    # 文件上传目录（KYC证件等）
│   │
│   ├── tsconfig.json               # ✅ TypeScript配置
│   ├── nodemon.json                # ✅ Nodemon配置
│   ├── package.json                # ✅ 依赖配置
│   └── .env.example                # ✅ 环境变量模板
│
├── 📁 database/                    # 数据库相关
│   └── init.sql                    # 初始化SQL（可选）
│
├── 📁 docs/                        # ✅ 项目文档
│   ├── DESIGN_SYSTEM.md            # ✅ 设计系统文档
│   ├── PROJECT_STATUS.md           # ✅ 项目状态文档
│   ├── API.md                      # API接口文档（待创建）
│   └── DEPLOYMENT.md               # 部署指南（待创建）
│
├── 📄 README.md                    # ✅ 项目说明
├── 📄 QUICK_START.md               # ✅ 快速启动指南
├── 📄 PROJECT_OVERVIEW.md          # ✅ 本文件
├── 📄 .gitignore                   # ✅ Git忽略文件
└── 📄 docker-compose.yml           # ✅ Docker编排文件
```

---

## 🎯 核心功能模块

### 1. 用户端功能

#### 1.1 认证系统
- 📝 用户注册（邮箱验证）
- 🔐 用户登录（支持2FA）
- 🔑 密码找回
- 👤 个人资料管理
- 🆔 KYC三级认证（身份证、人脸识别等）

#### 1.2 市场与交易
- 📊 市场列表（股票RWA、虚拟资产RWA、房产RWA）
- 📈 资产详情（价格、涨跌、K线图）
- 💹 实时交易（限价单、市价单、止损单、止盈单）
- 📉 盘口深度
- 🔄 最新成交

#### 1.3 资产管理
- 💼 持仓列表
- 💰 钱包余额（CNY、USDT、USDC）
- 📥 充币（显示地址、监控确认数）
- 📤 提币（风险评分、人工审核）
- 📜 交易记录
- 📊 资金流水

#### 1.4 数据分析
- 📈 收益曲线图
- 🥧 资产分布饼图
- 🔥 交易热力图
- 📊 收益统计（总收益、胜率、最大回撤）

#### 1.5 推荐系统
- 🎁 专属邀请码
- 🔗 邀请链接
- 📱 邀请海报（含二维码）
- 💸 推荐返佣
- 📊 推荐统计

### 2. 管理端功能

#### 2.1 用户管理
- 👥 用户列表（搜索、筛选、排序）
- 🔍 用户详情（资产、交易统计、KYC信息）
- ❄️ 冻结/解冻账户
- 🚫 封禁用户
- 🔄 重置密码

#### 2.2 KYC审核
- 📋 待审核列表
- 🔍 查看用户资料和证件照片
- ✅ 批准审核
- ❌ 拒绝审核（填写原因）

#### 2.3 资产管理
- 📊 资产列表
- ➕ 添加新资产（RWA资产）
- ✏️ 编辑资产信息
- ⏸️ 暂停/恢复交易
- 🗑️ 下架资产

#### 2.4 订单管理
- 📜 所有订单列表
- 🔍 订单详情
- ❌ 强制取消订单（异常情况）
- 📊 成交记录统计

#### 2.5 钱包与财务
- 📥 充币记录（手动确认）
- 📤 提币审核（批准/拒绝）
- 💰 财务统计（手续费收入、用户资产、平台准备金）
- 📈 收入趋势图

#### 2.6 系统配置
- ⚙️ 平台配置（手续费率、限额等）
- 📢 公告管理
- 👨‍💼 管理员管理
- 📝 操作日志

### 3. RWA开放API

#### 3.1 市场数据API（公开）
- GET `/api/v1/market/assets` - 资产列表
- GET `/api/v1/market/assets/:code` - 资产详情
- GET `/api/v1/market/kline/:code` - K线数据
- GET `/api/v1/market/orderbook/:code` - 盘口深度
- GET `/api/v1/market/trades/:code` - 最新成交
- GET `/api/v1/market/ticker` - 24h行情

#### 3.2 用户管理API
- POST `/api/v1/partner/user/create` - 创建子账户
- GET `/api/v1/partner/user/:id` - 查询用户信息

#### 3.3 钱包管理API
- GET `/api/v1/partner/wallet/balance/:userId` - 查询余额
- POST `/api/v1/partner/wallet/deposit` - 充值
- POST `/api/v1/partner/wallet/withdraw` - 提现
- GET `/api/v1/partner/wallet/transactions` - 资金流水

#### 3.4 交易API
- POST `/api/v1/partner/trade/order` - 创建订单
- DELETE `/api/v1/partner/trade/order/:id` - 取消订单
- GET `/api/v1/partner/trade/orders` - 查询订单
- GET `/api/v1/partner/positions/:userId` - 查询持仓
- GET `/api/v1/partner/trades` - 查询成交记录

#### 3.5 API管理
- 🔑 API Key / Secret 管理
- 📊 调用统计（次数、响应时间、错误率）
- 🚨 监控告警
- 📝 调用日志

---

## 🗄️ 数据库设计（20+张表）

### 核心表

| 表名 | 说明 | 状态 |
|------|------|------|
| `users` | 用户表 | ✅ |
| `kyc_applications` | KYC申请 | ✅ |
| `assets` | 资产表 | ✅ |
| `orders` | 订单表 | ✅ |
| `trades` | 成交记录 | ✅ |
| `klines` | K线数据 | ✅ |
| `wallets` | 钱包表 | ✅ |
| `positions` | 持仓表 | ✅ |
| `deposit_records` | 充币记录 | ✅ |
| `withdraw_records` | 提币记录 | ✅ |
| `transactions` | 资金流水 | ✅ |
| `referral_records` | 推荐记录 | ✅ |
| `admins` | 管理员 | ✅ |
| `admin_logs` | 管理日志 | ✅ |
| `announcements` | 公告表 | ✅ |
| `configs` | 系统配置 | ✅ |
| `partners` | API合作伙伴 | ✅ |
| `api_call_logs` | API调用日志 | ✅ |
| `login_logs` | 登录日志 | ✅ |

---

## 🔐 安全设计

### 认证与授权
- 🔑 JWT Token（Access Token + Refresh Token）
- 🔐 密码使用bcrypt加密（成本因子10）
- 🔒 2FA双因素认证（Google Authenticator）
- 🚪 会话管理（记录登录设备）

### API安全
- 🛡️ Helmet（HTTP头安全）
- 🚦 Rate Limiting（限流保护）
- ✅ 输入验证（express-validator）
- 🔒 CORS配置
- 📝 API Key/Secret认证（开放API）

### 数据安全
- 🔐 敏感字段加密存储
- 📝 操作日志记录
- 🚨 异常行为监控（大额提币、频繁失败登录）
- 🔍 风险评分系统（提币）

---

## 🎨 设计风格

**核心理念**: "为开放经济而设计"

### 视觉特征
- 🌙 **深色主题** - 专业金融氛围
- 🎯 **极简布局** - 大量留白，清晰层次
- 🔓 **开放元素** - 断裂/缺口设计，象征透明
- 📸 **实景摄影** - 建筑、城市、人物，强调现实连接
- 📐 **严格规范** - 统一的颜色、字体、间距系统

### 配色方案
```
主背景: #0A1628 (深蓝黑)
品牌色: #3B82F6 (亮蓝)
文字色: #F8FAFC (白)
涨: #10B981 (绿)
跌: #EF4444 (红)
```

详见：`docs/DESIGN_SYSTEM.md`

---

## 📈 技术栈对比

| 类别 | 技术选型 | 原因 |
|------|---------|------|
| 前端框架 | Next.js 14 | SSR/SSG支持，性能优秀，SEO友好 |
| 状态管理 | Zustand | 轻量、简单、TypeScript友好 |
| 样式方案 | Tailwind CSS | 快速开发，设计系统友好 |
| 图表库 | Recharts + TradingView | 专业金融图表支持 |
| 后端框架 | Express | 成熟稳定，生态丰富 |
| ORM | Prisma | 类型安全，开发效率高 |
| 数据库 | PostgreSQL | 关系型，ACID支持，适合金融系统 |
| 认证 | JWT | 无状态，扩展性好 |

---

## 🚀 开发进度

### 阶段一：基础架构 ✅ (100%)
- [x] 项目初始化
- [x] 技术栈选型
- [x] 设计系统定义
- [x] 数据库设计
- [x] 前端配置
- [x] 后端配置

### 阶段二：核心API ⏳ (0%)
- [ ] 认证API
- [ ] 用户API
- [ ] KYC API
- [ ] 市场API
- [ ] 交易API
- [ ] 钱包API

### 阶段三：管理后台API ⏳ (0%)
- [ ] 用户管理API
- [ ] KYC审核API
- [ ] 资产管理API
- [ ] 订单管理API
- [ ] 钱包财务API

### 阶段四：前端核心页面 ⏳ (0%)
- [ ] UI组件库
- [ ] 认证页面
- [ ] 用户端页面
- [ ] 管理端页面

### 阶段五：高级功能 ⏳ (0%)
- [ ] 推荐系统
- [ ] 收益分析
- [ ] RWA开放API
- [ ] 实时功能（WebSocket）

### 阶段六：优化与测试 ⏳ (0%)
- [ ] 单元测试
- [ ] 集成测试
- [ ] 性能优化
- [ ] 安全加固

---

## 📊 预估工作量

| 阶段 | 功能 | 预计时间 | 状态 |
|------|------|---------|------|
| 1 | 基础架构 | 1天 | ✅ 完成 |
| 2 | 核心API | 7-10天 | ⏳ 待开发 |
| 3 | 管理API | 5-7天 | ⏳ 待开发 |
| 4 | 前端页面 | 10-14天 | ⏳ 待开发 |
| 5 | 高级功能 | 7-10天 | ⏳ 待开发 |
| 6 | 优化测试 | 5-7天 | ⏳ 待开发 |
| **总计** | - | **35-49天** | **3% 完成** |

---

## 🎯 里程碑

### Milestone 1: MVP (最小可行产品)
**目标时间**: 完成核心API和前端基础功能（约20天）

**功能清单**：
- ✅ 用户注册登录
- ✅ 市场浏览
- ✅ 简单交易（限价单、市价单）
- ✅ 钱包充提（手动审核）
- ✅ 基础管理后台

### Milestone 2: 完整功能版
**目标时间**: 完成所有核心功能（约35-40天）

**功能清单**：
- ✅ MVP所有功能
- ✅ KYC三级认证
- ✅ 高级交易（止损、止盈）
- ✅ 推荐系统
- ✅ 收益分析
- ✅ 完整管理后台

### Milestone 3: 企业版
**目标时间**: 完成开放API和优化（约45-50天）

**功能清单**：
- ✅ 完整功能版所有内容
- ✅ RWA开放API
- ✅ API管理后台
- ✅ 实时推送（WebSocket）
- ✅ 性能优化
- ✅ 完整测试覆盖

---

## 📞 项目信息

**项目名称**: RWA Platform - 真实世界资产代币化交易平台

**合同编号**: YY-2025-10-23

**开发方**: 元岳信息科技（济南）有限公司

**项目联系人**: 张钦明

**联系电话**: 18660869996

**合同金额**: $42,000 USDT

**交付内容**:
1. Web交易平台（用户端）
2. 后台管理系统（管理端）
3. RWA开放API（第三方集成）

---

## 📚 相关文档

- 📖 [README.md](../README.md) - 项目说明
- 🚀 [QUICK_START.md](../QUICK_START.md) - 快速启动指南
- 🎨 [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - 设计系统文档
- 📊 [PROJECT_STATUS.md](./PROJECT_STATUS.md) - 项目状态文档
- 📄 [合同文件](../CONTRACT.md) - 商业合同（如有）

---

**最后更新**: 2025-11-03
**版本**: 1.0.0
**状态**: 基础架构完成，准备开发
