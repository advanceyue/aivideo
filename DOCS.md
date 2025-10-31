# 项目文档说明

## 📚 文档列表

### 核心文档

- **[README.md](README.md)** - 项目主文档
  - 项目介绍和功能特点
  - 快速开始和使用方法
  - 简化的部署步骤

### 宝塔部署文档（推荐）

- **[BAOTA.md](BAOTA.md)** - 宝塔面板一站式部署指南 ⭐️
  - 完整的五步部署流程
  - Node 版本管理和项目管理器
  - 故障排查和性能优化
  - 时间同步、SSL 配置等所有细节
  - **📌 所有宝塔相关内容已整合到这一个文件**

### 开发文档

- **[CLAUDE.md](CLAUDE.md)** - AI 助手开发指南
  - 代码架构说明
  - 开发注意事项
  - 供 Claude Code 等 AI 助手使用

## 🛠️ 配置文件

- **[ecosystem.config.js](ecosystem.config.js)** - PM2 进程管理配置
- **[nginx.conf](nginx.conf)** - Nginx 反向代理配置示例
- **[deploy.sh](deploy.sh)** - 自动部署脚本
- **[pack.sh](pack.sh)** - 项目打包脚本

## 🚀 快速导航

### 新手部署（使用宝塔面板）
1. 先看 [README.md](README.md) 了解项目
2. 按照 [BAOTA.md](BAOTA.md) 一站式部署指南逐步操作
3. 遇到问题在同一文件的"故障排查"章节查找解决方案

### 开发者部署（命令行）
1. 阅读 [README.md](README.md) 的命令行部署部分
2. 参考 `ecosystem.config.js` 和 `nginx.conf` 配置

### 常见问题速查

| 问题 | 位置 |
|------|------|
| 如何安装宝塔面板？ | [BAOTA.md](BAOTA.md) - 第一步 |
| 如何安装 Node.js？ | [BAOTA.md](BAOTA.md) - 第二步 → Node 版本管理器 |
| Node 项目管理器怎么用？ | [BAOTA.md](BAOTA.md) - 第三步 |
| 502 错误怎么办？ | [BAOTA.md](BAOTA.md) - 故障排查 → 无法访问网站 |
| 服务器时间不对？ | [BAOTA.md](BAOTA.md) - 第二步 → 检查服务器时间同步 |
| 如何配置 SSL？ | [BAOTA.md](BAOTA.md) - 第四步 → 配置 SSL 证书 |
| 如何更新项目？ | [BAOTA.md](BAOTA.md) - 常用操作 → 项目更新 |

## 📝 文档更新记录

### 2025-10-31
✅ **简化 Baota 文档结构**
- 合并 4 个 Baota 文档为 1 个：`BAOTA.md`
- 删除：`BAOTA_DEPLOY.md`、`BAOTA_CHECKLIST.md`、`BAOTA_NODEJS.md`、`BAOTA_NODE_MANAGER.md`
- 新增完整的时间同步、故障排查章节
- 优化文档目录结构，更易查找

### 之前的更新
- ✅ 更新所有 "PM2 管理器" 为 "Node 项目管理器"
- ✅ 保留宝塔部署完整文档体系
- ✅ README 简化部署说明
- ❌ 删除重复的快速开始文档
- ❌ 删除单独的打包说明文档
