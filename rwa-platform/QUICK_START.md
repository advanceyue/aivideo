# 🚀 RWA Platform 快速启动指南

本指南将帮助您在5分钟内启动项目。

---

## 📋 前置要求

确保您的系统已安装：

- **Node.js** >= 18.x
  检查: `node --version`

- **npm** >= 9.x
  检查: `npm --version`

- **PostgreSQL** >= 14.x
  检查: `psql --version`

**或者**使用Docker（推荐）：

- **Docker** >= 20.x
- **Docker Compose** >= 2.x

---

## 方案一：使用Docker（推荐，最简单）

### 1. 一键启动

```bash
cd /home/user/rwa-system
docker-compose up -d
```

等待容器启动（首次需要下载镜像，约3-5分钟）

### 2. 初始化数据库

```bash
# 进入后端容器
docker exec -it rwa-backend sh

# 运行数据库迁移
npx prisma migrate dev --name init

# 生成Prisma Client
npx prisma generate

# 填充种子数据（可选）
npx prisma db seed

# 退出容器
exit
```

### 3. 访问应用

- 🌐 前端: http://localhost:3000
- 🔌 后端API: http://localhost:4000
- 💾 数据库管理: http://localhost:8080 (Adminer)
  - 服务器: `postgres`
  - 用户名: `postgres`
  - 密码: `postgres`
  - 数据库: `rwa_platform`

### 4. 停止服务

```bash
docker-compose down
```

---

## 方案二：本地开发（手动）

### 1. 创建数据库

```bash
# 登录PostgreSQL
psql -U postgres

# 创建数据库
CREATE DATABASE rwa_platform;

# 退出
\q
```

### 2. 安装依赖

```bash
# 后端
cd /home/user/rwa-system/backend
npm install

# 前端（新终端）
cd /home/user/rwa-system/frontend
npm install
```

### 3. 配置环境变量

#### 后端 `.env`

```bash
cd /home/user/rwa-system/backend
cp .env.example .env
nano .env  # 或使用您喜欢的编辑器
```

**必须修改的配置：**

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/rwa_platform?schema=public"
JWT_SECRET="your-super-secret-jwt-key-min-32-chars-CHANGE-THIS"
```

#### 前端 `.env.local`

```bash
cd /home/user/rwa-system/frontend
cp .env.local.example .env.local
```

保持默认值即可，或根据需要修改。

### 4. 初始化数据库

```bash
cd /home/user/rwa-system/backend

# 生成Prisma Client
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev --name init

# 查看数据库（可选）
npx prisma studio  # 在浏览器打开 http://localhost:5555
```

### 5. 启动项目

#### 终端1: 启动后端

```bash
cd /home/user/rwa-system/backend
npm run dev
```

看到 `🚀 Server running on http://localhost:4000` 表示成功

#### 终端2: 启动前端

```bash
cd /home/user/rwa-system/frontend
npm run dev
```

看到 `✓ Ready in Xms` 表示成功

### 6. 访问应用

- 🌐 前端: http://localhost:3000
- 🔌 后端API: http://localhost:4000
- 💾 Prisma Studio: http://localhost:5555 (如果运行了 `npx prisma studio`)

---

## 🧪 测试API

### 使用curl测试

```bash
# 测试服务器是否运行
curl http://localhost:4000

# 测试注册API（当后端实现后）
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123!@#"
  }'
```

### 使用Postman/Insomnia

1. 导入API集合（完成后提供）
2. 配置环境变量 `BASE_URL=http://localhost:4000`
3. 开始测试

---

## 📚 下一步

现在您已经成功启动了项目，接下来可以：

### 1. 查看项目状态

```bash
cat /home/user/rwa-system/docs/PROJECT_STATUS.md
```

### 2. 阅读设计系统

```bash
cat /home/user/rwa-system/docs/DESIGN_SYSTEM.md
```

### 3. 开始开发

**当前状态**：
- ✅ 前后端架构搭建完成
- ✅ 数据库Schema设计完成
- ✅ 前端工具函数和类型定义完成
- ⏳ 后端API实现（下一步）
- ⏳ 前端页面开发（下一步）

**建议的开发顺序**：
1. 实现认证API（注册、登录）
2. 创建前端登录/注册页面
3. 实现市场API
4. 创建市场列表页面
5. ...逐步完善

### 4. 查看数据库

```bash
# 使用Prisma Studio（推荐）
cd /home/user/rwa-system/backend
npx prisma studio

# 或使用psql
psql -U postgres -d rwa_platform
\dt  # 查看所有表
SELECT * FROM users;  # 查询用户表
```

---

## ❓ 常见问题

### Q: 端口被占用怎么办？

**A**: 修改端口配置

前端端口（默认3000）：
```bash
# frontend/.env.local
PORT=3001
```

后端端口（默认4000）：
```bash
# backend/.env
PORT=4001
```

### Q: 数据库连接失败？

**A**: 检查以下几点：

1. PostgreSQL是否运行？
   ```bash
   # Linux/Mac
   sudo systemctl status postgresql

   # 或查看进程
   ps aux | grep postgres
   ```

2. 数据库是否存在？
   ```bash
   psql -U postgres -l
   ```

3. 连接字符串是否正确？
   ```env
   DATABASE_URL="postgresql://用户名:密码@主机:端口/数据库名"
   ```

### Q: npm install 失败？

**A**: 尝试以下方法：

```bash
# 清除缓存
npm cache clean --force

# 删除node_modules重新安装
rm -rf node_modules package-lock.json
npm install

# 或使用npm镜像
npm install --registry=https://registry.npmmirror.com
```

### Q: Prisma迁移失败？

**A**: 重置数据库：

```bash
cd backend
npx prisma migrate reset  # 警告：会删除所有数据
npx prisma migrate dev --name init
```

### Q: 如何查看日志？

**A**:

Docker模式：
```bash
# 查看所有容器日志
docker-compose logs -f

# 查看特定容器日志
docker-compose logs -f backend
docker-compose logs -f frontend
```

本地开发：
- 后端：直接在终端查看
- 前端：终端 + 浏览器控制台

---

## 🛠️ 有用的命令

### 数据库管理

```bash
cd backend

# 创建新迁移
npx prisma migrate dev --name <迁移名称>

# 应用迁移（生产环境）
npx prisma migrate deploy

# 重置数据库（开发环境）
npx prisma migrate reset

# 查看数据库
npx prisma studio

# 生成Prisma Client
npx prisma generate

# 查看数据库结构
npx prisma db pull
```

### 代码质量

```bash
# 后端
cd backend
npm run lint      # 检查代码规范
npm run format    # 格式化代码
npm run build     # 编译TypeScript

# 前端
cd frontend
npm run lint      # 检查代码规范
npm run type-check  # TypeScript类型检查
npm run build     # 生产构建
```

### Docker命令

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 重建容器
docker-compose up -d --build

# 进入容器
docker exec -it rwa-backend sh
docker exec -it rwa-frontend sh

# 清理（删除数据）
docker-compose down -v
```

---

## 📞 需要帮助？

如果遇到问题：

1. 📖 查看 `docs/PROJECT_STATUS.md` 了解项目状态
2. 📘 查看 `docs/DESIGN_SYSTEM.md` 了解设计规范
3. 📄 查看 `README.md` 了解项目详情
4. 📞 联系项目负责人：张钦明 18660869996

---

**祝开发顺利！🎉**

最后更新：2025-11-03
