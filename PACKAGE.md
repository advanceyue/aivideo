# 项目打包说明

## 快速打包

### 使用打包脚本（推荐）

```bash
# 执行打包脚本
./pack.sh
```

打包完成后会生成类似 `wechat-video-service_20251031_165630.tar.gz` 的文件。

### 手动打包

如果需要手动打包，使用以下命令：

```bash
tar -czf wechat-video-service.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=downloads \
    --exclude=data \
    --exclude=logs \
    --exclude=.DS_Store \
    --exclude=*.log \
    --exclude=.env \
    --exclude=*.tar.gz \
    --exclude=*.zip \
    .
```

## 打包文件说明

### ✅ 包含的文件

| 目录/文件 | 说明 |
|----------|------|
| `src/` | 源代码目录 |
| `public/` | 前端页面和静态资源 |
| `package.json` | 项目依赖配置 |
| `package-lock.json` | 依赖版本锁定文件 |
| `ecosystem.config.js` | PM2 进程管理配置 |
| `nginx.conf` | Nginx 配置示例 |
| `deploy.sh` | 自动部署脚本 |
| `pack.sh` | 打包脚本 |
| `.gitignore` | Git 忽略配置 |
| `.env.example` | 环境变量示例 |
| `README.md` | 项目说明 |
| `DEPLOY.md` | 完整部署文档 |
| `QUICKSTART.md` | 快速部署指南 |
| `BAOTA_DEPLOY.md` | 宝塔面板部署指南 |
| `BAOTA_CHECKLIST.md` | 宝塔部署检查清单 |
| `CLAUDE.md` | AI 助手工作指南 |

### ❌ 排除的文件

| 目录/文件 | 原因 | 处理方式 |
|----------|------|---------|
| `node_modules/` | 体积大，依赖可重新安装 | 服务器上执行 `npm install` |
| `downloads/` | 已下载的视频文件 | 服务器上自动创建 |
| `data/` | 本地配置数据（包含密码） | 服务器上重新配置 |
| `logs/` | 本地日志文件 | 服务器上自动创建 |
| `.git/` | Git 版本控制信息 | 使用 Git clone 方式部署 |
| `.env` | 环境变量（可能包含密钥） | 使用后台管理系统配置 |
| `.DS_Store` | macOS 系统文件 | 无需上传 |
| `*.log` | 日志文件 | 服务器上自动生成 |
| `*.tar.gz` | 打包文件 | 避免重复打包 |

## 上传到服务器

### 方式一：使用 SCP 命令

```bash
# 上传到服务器
scp wechat-video-service_*.tar.gz root@服务器IP:/www/wwwroot/

# 登录服务器
ssh root@服务器IP

# 解压
cd /www/wwwroot
tar -xzf wechat-video-service_*.tar.gz -C wechat-video-service/
cd wechat-video-service

# 安装依赖
npm install --production

# 启动服务
./deploy.sh
```

### 方式二：使用宝塔面板

1. 登录宝塔面板：`http://服务器IP:8888`
2. 左侧菜单 → **文件**
3. 进入 `/www/wwwroot` 目录
4. 点击 **上传** → 选择打包文件
5. 上传完成后，右键点击文件 → **解压** → 解压到 `wechat-video-service` 文件夹
6. 宝塔终端执行：
   ```bash
   cd /www/wwwroot/wechat-video-service
   npm install --production
   ```
7. PM2 管理器 → 添加项目

### 方式三：使用 SFTP 工具

**Windows 用户**:
- 使用 WinSCP 或 FileZilla
- 连接到服务器
- 上传打包文件到 `/www/wwwroot/`

**Mac 用户**:
- 使用 Cyberduck 或 Transmit
- 连接到服务器
- 上传打包文件到 `/www/wwwroot/`

## 验证打包文件

### 查看打包文件内容

```bash
# 列出打包文件内容
tar -tzf wechat-video-service_*.tar.gz

# 查看文件数量
tar -tzf wechat-video-service_*.tar.gz | wc -l

# 查看文件大小
ls -lh wechat-video-service_*.tar.gz
```

### 测试解压

```bash
# 创建测试目录
mkdir test-unpack
cd test-unpack

# 解压测试
tar -xzf ../wechat-video-service_*.tar.gz

# 检查文件结构
ls -la
```

## 打包文件大小

### 正常大小

- **不含 node_modules**: 约 50-100 KB
- **含 node_modules**: 约 20-50 MB（不推荐）

### 如果文件过大

检查是否包含了不应该打包的文件：

```bash
# 查看压缩包中的大文件
tar -tzf wechat-video-service_*.tar.gz | while read f; do
  echo "$(tar -xzOf wechat-video-service_*.tar.gz "$f" 2>/dev/null | wc -c) $f"
done | sort -rn | head -20
```

## 更新打包内容

如果需要修改打包内容，编辑 `pack.sh` 文件：

```bash
# 添加需要排除的目录
EXCLUDE_DIRS=(
    "node_modules"
    ".git"
    "downloads"
    "data"
    "logs"
    # 添加更多...
)
```

## 自动化打包

### 每次提交前自动打包（可选）

创建 Git Hook `.git/hooks/pre-commit`:

```bash
#!/bin/bash
./pack.sh
```

### 使用 npm scripts

在 `package.json` 中添加：

```json
{
  "scripts": {
    "pack": "./pack.sh"
  }
}
```

然后使用：

```bash
npm run pack
```

## 常见问题

### 1. 打包文件无法创建

**原因**: 权限不足或磁盘空间不足

**解决**:
```bash
# 检查权限
ls -la pack.sh

# 添加执行权限
chmod +x pack.sh

# 检查磁盘空间
df -h
```

### 2. 打包文件过大

**原因**: 可能包含了 node_modules 或其他大文件

**解决**:
```bash
# 检查打包内容
tar -tzf wechat-video-service_*.tar.gz | grep node_modules

# 如果包含 node_modules，删除后重新打包
rm wechat-video-service_*.tar.gz
./pack.sh
```

### 3. 解压后缺少文件

**原因**: 打包时路径错误或文件被排除

**解决**:
```bash
# 检查打包内容
tar -tzf wechat-video-service_*.tar.gz | grep src/

# 确认所有必要文件都在
```

### 4. Windows 上打包出错

**原因**: Windows 没有 tar 命令或路径格式问题

**解决**:
- 使用 Git Bash 执行脚本
- 或使用 7-Zip、WinRAR 手动打包
- 或在 WSL (Windows Subsystem for Linux) 中执行

## 最佳实践

1. ✅ **定期清理旧的打包文件**
   ```bash
   rm wechat-video-service_*.tar.gz
   ```

2. ✅ **打包前确保代码已提交**
   ```bash
   git status
   git add .
   git commit -m "准备部署"
   ```

3. ✅ **验证打包文件完整性**
   ```bash
   tar -tzf wechat-video-service_*.tar.gz | grep -E "src/|public/|package.json"
   ```

4. ✅ **保存打包文件的副本**（用于回滚）
   ```bash
   mkdir -p backups
   cp wechat-video-service_*.tar.gz backups/
   ```

5. ✅ **在测试环境先验证**
   - 先在测试服务器解压和部署
   - 确认无误后再部署到生产环境

## 相关文档

- [快速部署指南](QUICKSTART.md) - 5-15 分钟快速部署
- [完整部署文档](DEPLOY.md) - 详细的部署步骤
- [宝塔面板部署](BAOTA_DEPLOY.md) - 可视化部署方式
- [宝塔部署检查清单](BAOTA_CHECKLIST.md) - 逐步检查清单

---

打包愉快！ 📦
