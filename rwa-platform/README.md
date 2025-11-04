# RWA Platform - 真实世界资产代币化交易平台

> 为开放经济而设计 - 连接现实世界与区块链世界

## 项目概述

RWA Platform 是一个专业的真实世界资产（Real World Assets）代币化交易平台，支持股票RWA、虚拟资产RWA、房产RWA等多种资产的交易。

### 三大核心产品

1. **Web交易平台** - 用户端资产交易系统
2. **后台管理系统** - 平台运营管理系统
3. **RWA开放API** - 第三方系统集成接口

## 核心功能

### 用户端功能
- ✅ 用户注册、登录、KYC三级认证
- ✅ 市场浏览、资产详情、实时K线图
- ✅ 交易下单（限价单、市价单、止损单、获利单）
- ✅ 钱包管理（充币、提币、余额查询）
- ✅ 资产持仓、交易记录、收益分析
- ✅ 邀请推荐、返佣系统

### 管理端功能
- ✅ 用户管理、KYC审核
- ✅ 资产管理（上架、编辑、下架）
- ✅ 订单管理、成交记录
- ✅ 充提审核、财务统计
- ✅ 系统配置、公告管理
- ✅ 管理员权限管理、操作日志

### API功能
- ✅ 市场数据API（K线、行情、深度）
- ✅ 用户管理API（子账户创建、查询）
- ✅ 钱包管理API（充值、提现、余额）
- ✅ 交易API（下单、撤单、查询）
- ✅ 合作伙伴管理、调用统计、监控告警

## 技术栈

### 前端
- **框架**: Next.js 14 (App Router) + TypeScript
- **样式**: Tailwind CSS (深色主题)
- **UI组件**: shadcn/ui
- **状态管理**: Zustand
- **图表**: TradingView Lightweight Charts + Recharts
- **表单**: React Hook Form + Zod
- **图标**: Lucide Icons

### 后端
- **框架**: Node.js + Express + TypeScript
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **认证**: JWT + bcryptjs
- **文件上传**: Multer
- **API文档**: Swagger/OpenAPI

### DevOps
- **容器化**: Docker + Docker Compose
- **反向代理**: Nginx
- **进程管理**: PM2

## 项目结构

```
rwa-system/
├── frontend/              # Next.js前端应用
│   ├── app/              # App Router页面
│   │   ├── (auth)/       # 认证相关页面（登录、注册）
│   │   ├── (dashboard)/  # 用户端页面
│   │   ├── (admin)/      # 管理端页面
│   │   └── api/          # Next.js API路由
│   ├── components/       # React组件
│   │   ├── ui/           # 基础UI组件
│   │   ├── layout/       # 布局组件
│   │   ├── trading/      # 交易相关组件
│   │   └── admin/        # 管理端组件
│   ├── lib/              # 工具函数
│   ├── hooks/            # 自定义Hooks
│   ├── store/            # Zustand状态管理
│   └── styles/           # 全局样式
│
├── backend/              # Express后端应用
│   ├── src/
│   │   ├── routes/       # API路由
│   │   ├── controllers/  # 控制器
│   │   ├── services/     # 业务逻辑
│   │   ├── middleware/   # 中间件
│   │   ├── models/       # 数据模型（Prisma）
│   │   ├── utils/        # 工具函数
│   │   └── config/       # 配置文件
│   ├── prisma/           # Prisma Schema
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   └── uploads/          # 文件上传目录（KYC证件）
│
├── database/             # 数据库相关
│   └── init.sql          # 初始化SQL脚本
│
├── docs/                 # 项目文档
│   ├── DESIGN_SYSTEM.md  # 设计系统文档
│   ├── API.md            # API接口文档
│   └── DEPLOYMENT.md     # 部署指南
│
├── docker-compose.yml    # Docker编排文件
└── README.md             # 项目说明
```

## 快速开始

### 环境要求

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm >= 9.x

### 1. 克隆项目

```bash
git clone <repository-url>
cd rwa-system
```

### 2. 配置环境变量

#### 后端环境变量

创建 `backend/.env` 文件：

```env
# 数据库配置
DATABASE_URL="postgresql://user:password@localhost:5432/rwa_platform"

# JWT配置
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# 服务端口
PORT=4000

# 文件上传
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE=5242880  # 5MB

# 邮件配置（可选）
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-password"

# 区块链配置（模拟，未来对接真实链）
BLOCKCHAIN_ENABLED=false
ETHEREUM_RPC_URL="https://mainnet.infura.io/v3/YOUR-PROJECT-ID"
```

#### 前端环境变量

创建 `frontend/.env.local` 文件：

```env
# API地址
NEXT_PUBLIC_API_URL=http://localhost:4000

# 网站配置
NEXT_PUBLIC_SITE_NAME="RWA Platform"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. 安装依赖

```bash
# 后端
cd backend
npm install

# 前端
cd ../frontend
npm install
```

### 4. 数据库初始化

```bash
cd backend

# 运行Prisma迁移
npx prisma migrate dev --name init

# 生成Prisma Client
npx prisma generate

# 填充种子数据
npx prisma db seed
```

### 5. 启动项目

#### 方式一：分别启动

```bash
# 启动后端（在backend目录）
npm run dev  # 默认运行在 http://localhost:4000

# 启动前端（在frontend目录，新终端）
npm run dev  # 默认运行在 http://localhost:3000
```

#### 方式二：使用Docker Compose（推荐）

```bash
# 在项目根目录
docker-compose up -d
```

### 6. 访问应用

- **用户端**: http://localhost:3000
- **管理端**: http://localhost:3000/admin/login
- **API文档**: http://localhost:4000/api-docs

### 默认账号

#### 管理员账号
- 用户名: `admin`
- 密码: `Admin123!@#`

#### 测试用户账号
- 邮箱: `user@example.com`
- 密码: `User123!@#`

## 开发指南

### 前端开发

```bash
cd frontend

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产版本
npm run start

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

### 后端开发

```bash
cd backend

# 开发模式（自动重启）
npm run dev

# 构建TypeScript
npm run build

# 启动生产版本
npm run start

# 数据库迁移
npm run migrate

# 打开Prisma Studio（数据库GUI）
npm run studio
```

### 数据库管理

```bash
# 创建新迁移
npx prisma migrate dev --name <migration-name>

# 重置数据库
npx prisma migrate reset

# 生成Prisma Client
npx prisma generate

# 查看数据库数据
npx prisma studio
```

## 设计系统

本项目采用专业的金融科技设计风格，详细设计规范请查看：

👉 [设计系统文档](./docs/DESIGN_SYSTEM.md)

核心设计特征：
- 🌙 **深色主题** - 专业金融氛围
- 🎨 **简约现代** - 大量留白，清晰层次
- 🔓 **开放透明** - 断裂/缺口设计元素
- 📸 **实景摄影** - 强调现实世界连接
- 📐 **严格规范** - 统一的颜色、字体、间距系统

## API文档

完整的API接口文档请查看：

👉 [API文档](./docs/API.md)

### API分类

1. **认证API** - 注册、登录、Token刷新
2. **用户API** - 个人信息、KYC、安全设置
3. **市场API** - 资产列表、详情、K线、行情
4. **交易API** - 下单、撤单、订单查询
5. **钱包API** - 充值、提现、余额、流水
6. **管理API** - 用户管理、资产管理、审核
7. **开放API** - 第三方集成接口

## 部署指南

详细部署步骤请查看：

👉 [部署指南](./docs/DEPLOYMENT.md)

### 生产环境建议

1. **反向代理**: 使用Nginx，配置SSL证书（Let's Encrypt）
2. **数据库**: PostgreSQL主从复制，定期备份
3. **文件存储**: 使用对象存储（AWS S3、阿里云OSS）
4. **监控**: 使用PM2监控进程，Sentry收集错误
5. **日志**: 集中日志管理（ELK Stack）
6. **CDN**: 静态资源使用CDN加速

## 测试

```bash
# 前端测试
cd frontend
npm run test

# 后端测试
cd backend
npm run test

# E2E测试
npm run test:e2e
```

## 贡献指南

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 联系方式

**元岳信息科技（济南）有限公司**

- 项目联系人: 张钦明
- 联系电话: 18660869996
- 邮箱: contact@yuanyue.tech

## 免责声明

本系统仅作为技术服务提供，不参与任何资产运营、融资、代币发行等业务。使用本系统从事的任何金融活动，请遵守当地法律法规，开发方不承担任何法律责任。

---

**Built with ❤️ by YuanYue Tech**
