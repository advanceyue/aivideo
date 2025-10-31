# 更新日志 - 2025年10月31日

## 主要更新

### 1. 宝塔部署文档更新 - Node 项目管理器

**变更原因**: 宝塔面板现已使用 "Node 项目管理器" 替代旧的 "PM2 管理器"

**更新文件**:
- ✅ `BAOTA_NODE_MANAGER.md` - 全新创建，详细说明 Node 项目管理器的使用
- ✅ `BAOTA_DEPLOY.md` - 所有 "PM2 管理器" 已更新为 "Node 项目管理器"
- ✅ `BAOTA_CHECKLIST.md` - 部署清单已更新术语
- ✅ `README.md` - 主文档已更新
- ✅ `DOCS.md` - 文档索引已更新

**关键变化**:
```diff
- 宝塔面板使用 PM2 管理器
+ 宝塔面板使用 Node 项目管理器

- 需要手动安装: npm install -g pm2
+ 无需手动安装，Node 项目管理器内置 PM2

- PM2 管理器界面较旧
+ Node 项目管理器界面更现代，支持更多特性
```

**Node 项目管理器优势**:
- ✅ 自动识别 package.json 中的启动脚本
- ✅ 可选择 Node.js 版本
- ✅ 支持 npm/yarn/pnpm 包管理器
- ✅ 内置域名绑定功能
- ✅ 更友好的配置界面

### 2. 管理员密码修复

**问题**: 后台登录密码不正确  
**原因**: data/config.json 中的 bcrypt 哈希值与 "admin123" 不匹配  
**解决**: 
- 更新了 `data/config.json` 中的密码哈希
- 更新了 `src/services/configManager.js` 中的默认哈希
- 验证密码 "admin123" 现在可以正常登录

### 3. 部署文档简化

**删除冗余文件**:
- ❌ `QUICKSTART.md` (内容已合并到 BAOTA_DEPLOY.md)
- ❌ `PACKAGE.md` (打包说明已合并到 README.md)
- ❌ `DEPLOY.md` (通用部署文档已由用户删除)

**保留核心文档**:
- ✅ `BAOTA_DEPLOY.md` - 宝塔部署详细指南
- ✅ `BAOTA_CHECKLIST.md` - 宝塔部署检查清单
- ✅ `BAOTA_NODEJS.md` - Node.js 版本管理
- ✅ `BAOTA_NODE_MANAGER.md` - Node 项目管理器使用说明
- ✅ `DOCS.md` - 文档导航索引

### 4. 打包脚本

**新增文件**: `pack.sh`  
**功能**: 自动打包项目，排除不必要的文件  
**生成**: `wechat-video-service_YYYYMMDD_HHMMSS.tar.gz` (~59KB)  
**排除项**: node_modules, .git, downloads, data, logs

### 5. 配置文件

**新增**:
- `ecosystem.config.js` - PM2 配置文件
- `nginx.conf` - Nginx 反向代理配置模板
- `deploy.sh` - 自动化部署脚本

## 当前项目状态

### 部署方式 (推荐: 宝塔面板)

```bash
# 1. 打包项目
./pack.sh

# 2. 上传到服务器
# 使用宝塔文件管理器上传 .tar.gz 文件

# 3. 解压
cd /www/wwwroot
tar -xzf wechat-video-service_*.tar.gz

# 4. 安装依赖
cd wechat-video-service
npm install --production

# 5. 使用 Node 项目管理器添加项目
# 宝塔面板 → Node 项目管理器 → 添加 Node 项目
```

### 核心文档

| 文档 | 用途 |
|------|------|
| [README.md](README.md) | 项目概述和快速开始 |
| [CLAUDE.md](CLAUDE.md) | AI 助手架构指南 |
| [DOCS.md](DOCS.md) | 文档导航索引 |
| [BAOTA_DEPLOY.md](BAOTA_DEPLOY.md) | 宝塔部署详细步骤 |
| [BAOTA_CHECKLIST.md](BAOTA_CHECKLIST.md) | 宝塔部署清单 |
| [BAOTA_NODE_MANAGER.md](BAOTA_NODE_MANAGER.md) | Node 项目管理器说明 |
| [BAOTA_NODEJS.md](BAOTA_NODEJS.md) | Node 版本管理 |

### 验证清单

- ✅ 所有文档已更新为 "Node 项目管理器" 术语
- ✅ 管理员密码已修复 (admin/admin123)
- ✅ 打包脚本可正常运行
- ✅ 部署文档完整且准确
- ✅ 冗余文档已清理

## 下一步操作

用户可以:
1. 使用 `./pack.sh` 打包项目
2. 按照 `BAOTA_CHECKLIST.md` 在服务器上部署
3. 使用 "Node 项目管理器" 而非手动安装 PM2
4. 参考 `BAOTA_NODE_MANAGER.md` 了解新管理器的使用方法

---

**更新完成时间**: 2025年10月31日  
**更新内容**: 文档术语更新、密码修复、文档简化、打包脚本  
**状态**: ✅ 所有更新已完成
