# 宝塔面板部署完整指南

> 微信服务号视频下载服务 - 宝塔面板一站式部署文档

## 📖 目录

- [快速开始](#快速开始)
- [第一步：安装宝塔面板](#第一步安装宝塔面板)
- [第二步：安装必要软件](#第二步安装必要软件)
- [第三步：部署项目](#第三步部署项目)
- [第四步：配置 Nginx](#第四步配置-nginx)
- [第五步:](#第五步配置微信公众号)
- [常用操作](#常用操作)
- [故障排查](#故障排查)

---

## 快速开始

### 适用人群
- 不熟悉 Linux 命令行的用户
- 希望通过可视化界面管理服务器
- 需要快速部署微信服务号项目

### 部署清单

- [ ] 腾讯云服务器（推荐 2核2G，Ubuntu 20.04）
- [ ] 服务器公网 IP
- [ ] 域名（可选，微信公众平台建议使用）
- [ ] 微信公众号 AppID 和 AppSecret

---

## 第一步：安装宝塔面板

### 1. 连接服务器

使用 SSH 工具连接到服务器：
- **Windows**：PuTTY 或 Xshell
- **Mac/Linux**：终端 `ssh root@服务器IP`

### 2. 执行安装命令

根据操作系统选择命令：

**Ubuntu/Debian**：
```bash
wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
```

**CentOS**：
```bash
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
```

安装过程中输入 `y` 确认，等待 5-10 分钟。

### 3. 保存登录信息

安装完成后会显示：
```
==================================================================
外网面板地址: http://服务器IP:8888/xxxxxxxx
username: xxxxxxxx
password: xxxxxxxx
==================================================================
```

**重要：请保存这些信息！**

### 4. 开放宝塔端口

在腾讯云控制台 → 安全组规则：
- 添加入站规则：端口 **8888**，来源 `0.0.0.0/0`

### 5. 登录宝塔面板

浏览器访问 `http://服务器IP:8888/xxxxxxxx`，输入账号密码登录。

---

## 第二步：安装必要软件

### 1. 安装 Nginx

首次登录会弹出推荐安装套件：

- [x] **Nginx**（选择编译安装，版本 1.22+）
- [ ] ~~PHP~~（本项目不需要）
- [ ] ~~Apache~~（已安装 Nginx）

点击 **一键安装**，等待 5-10 分钟。

### 2. 安装 Node 版本管理器

宝塔面板 → 软件商店 → 搜索 "**Node 版本管理器**"

#### 安装步骤

1. 点击 **安装**，等待安装完成
2. 软件商店 → 已安装 → Node 版本管理器 → **设置**
3. 选择 **Node.js 18** 或更高版本 → 点击 **安装**
4. 等待 2-5 分钟安装完成
5. 点击 **设为默认**

#### 验证安装

宝塔终端执行：
```bash
node -v  # 应显示 v18.x.x
npm -v   # 应显示对应 npm 版本
```

**推荐版本**：

| 版本 | 用途 | 本项目 |
|------|------|--------|
| Node.js 16.x | LTS 版本 | ✅ 可用 |
| Node.js 18.x | LTS 版本 | ✅ **推荐** |
| Node.js 20.x | 最新 LTS | ✅ 可用 |

### 3. 安装 Node 项目管理器

> ⚠️ **重要**：宝塔现在使用 "Node 项目管理器"，不再使用旧的 "PM2 管理器"！

软件商店 → 搜索 "**Node 项目管理器**" → 点击 **安装**

**Node 项目管理器优势**：
- ✅ 自动识别 package.json 中的启动脚本
- ✅ 可选择 Node.js 版本
- ✅ 支持 npm/yarn/pnpm
- ✅ 内置域名绑定
- ✅ 无需手动安装 PM2

**❌ 不要这样做**：
```bash
npm install -g pm2  # 已过时，不需要
```

### 4. 配置安全端口

左侧菜单 → **安全** → 添加以下端口：

- [x] **80**（HTTP）- 必须开放
- [x] **443**（HTTPS）- 必须开放
- [ ] **3000**（Node.js）- 可选（建议只通过 Nginx 访问）

同时在腾讯云控制台 → 安全组中开放这些端口。

### 5. 检查服务器时间同步

> ⚠️ **微信签名验证对时间非常敏感！时间不对会导致 502 错误。**

#### 检查时间

宝塔终端执行：
```bash
date
```

应该显示当前真实时间（误差不超过 1 分钟）。

#### 同步时间

如果时间不对：

```bash
# 安装 NTP（如果未安装）
yum install -y ntpdate    # CentOS
apt-get install -y ntpdate  # Ubuntu

# 立即同步时间
ntpdate ntp.aliyun.com

# 启用自动同步
systemctl start ntpd
systemctl enable ntpd

# 验证
date
```

---

## 第三步：部署项目

### 方式一：上传打包文件（简单）

#### 1. 打包项目

在本地项目目录：

```bash
cd /Users/zhangmin/code/ossign-claude-wx-video
./pack.sh
```

会生成 `wechat-video-service_YYYYMMDD_HHMMSS.tar.gz`

#### 2. 上传到服务器

1. 宝塔面板 → **文件** → 进入 `/www/wwwroot`
2. 点击 **上传** → 选择打包文件上传
3. 上传完成后，右键点击文件 → **解压** → 解压到 `wechat-video-service` 文件夹

#### 3. 安装依赖

宝塔终端：
```bash
cd /www/wwwroot/wechat-video-service
npm install --production
```

### 方式二：Git 克隆（推荐）

#### 1. 安装 Git

宝塔终端：
```bash
git --version  # 检查是否已安装

# 如果未安装
apt install -y git  # Ubuntu/Debian
yum install -y git  # CentOS
```

#### 2. 克隆代码

```bash
cd /www/wwwroot
git clone https://github.com/你的用户名/wechat-video-service.git
# 或使用 Gitee（国内更快）
git clone https://gitee.com/你的用户名/wechat-video-service.git

cd wechat-video-service
npm install --production
```

### 使用 Node 项目管理器启动

#### 1. 打开 Node 项目管理器

宝塔面板 → 软件商店 → 已安装 → **Node 项目管理器** → **设置**

#### 2. 添加项目

点击 **添加 Node 项目**，填写配置：

| 配置项 | 填写内容 | 说明 |
|-------|---------|------|
| **项目目录** | `/www/wwwroot/wechat-video-service` | 项目代码路径 |
| **项目名称** | `wechat-video-service` | 方便识别 |
| **启动选项** | 选择"自动获取 package.json..." | 自动识别启动命令 |
| **项目端口** | `3000` | 应用监听端口 |
| **运行用户** | `www` | 推荐使用 www |
| **包管理器** | `npm` | 本项目使用 npm |
| **Node 版本** | 选择 `v18.x.x` | Node.js 版本 |
| **项目备注** | `微信视频下载服务` | 可选 |

#### 3. 启动项目

点击 **确定**，系统会自动启动项目。

#### 4. 查看状态

在 Node 项目管理器中应该看到：
- ✅ **运行状态**（绿色 = 正常运行）
- 内存占用
- CPU 占用
- 运行时间

---

## 第四步：配置 Nginx

### 方式一：可视化配置（推荐）

#### 1. 添加站点

宝塔面板 → **网站** → **添加站点**

填写：
- **域名**：`aivideo.yourdomain.com`
- **根目录**：随意选择（反向代理不会用到）
- **FTP**：不创建
- **数据库**：不创建
- **PHP 版本**：纯静态

点击 **提交**。

#### 2. 配置反向代理

1. 找到刚创建的站点 → 点击 **设置**
2. 点击 **反向代理** → **添加反向代理**
3. 填写：
   - **代理名称**：`wechat-video-service`
   - **目标 URL**：`http://127.0.0.1:3000`
   - **发送域名**：`$host`
4. 点击 **提交**

#### 3. 配置 SSL 证书（推荐）

1. 站点设置 → **SSL**
2. 选择 **Let's Encrypt**（免费）
3. 勾选域名
4. 点击 **申请**
5. 申请成功后，开启 **强制 HTTPS**

### 方式二：手动配置

站点设置 → **配置文件** → 添加：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

点击 **保存**。

---

## 第五步：配置微信公众号

### 1. 访问后台管理系统

浏览器打开：
- 使用域名：`https://your-domain.com/admin/login`
- 使用 IP：`http://服务器IP:3000/admin/login`

### 2. 登录

默认账号：
- 用户名：`admin`
- 密码：`admin123`

**首次登录后请立即修改密码！**

### 3. 填写配置

进入 **配置管理**，填写：
- **AppID**：从微信公众平台获取
- **AppSecret**：从微信公众平台获取
- **Token**：自定义（记住，稍后要用）

### 4. 配置微信公众平台

登录微信公众平台 → **开发** → **基本配置** → **服务器配置**

填写：
- **URL**：`https://your-domain.com/wechat`（推荐）或 `http://服务器IP:3000/wechat`
- **Token**：与后台管理系统中配置的一致
- **EncodingAESKey**：点击随机生成（可选）
- **消息加解密方式**：**明文模式**（推荐）或兼容模式

点击 **提交** 并 **启用**。

---

## 常用操作

### 项目管理

#### 启动项目
Node 项目管理器 → 找到项目 → 点击 **启动**

#### 停止项目
Node 项目管理器 → 找到项目 → 点击 **停止**

#### 重启项目
Node 项目管理器 → 找到项目 → 点击 **重启**

#### 查看日志
Node 项目管理器 → 找到项目 → 点击 **日志**

#### 编辑配置
Node 项目管理器 → 找到项目 → 点击 **编辑** → 修改配置 → 保存并重启

### 项目更新

#### 使用 Git 更新

宝塔终端：
```bash
cd /www/wwwroot/wechat-video-service
git pull
npm install --production
```

然后在 Node 项目管理器中 **重启** 项目。

#### 使用文件上传更新

1. 本地重新打包项目（`./pack.sh`）
2. 宝塔面板 → **文件** → 上传并解压
3. Node 项目管理器 → **重启** 项目

### 文件管理

- **上传文件**：文件 → 上传
- **编辑文件**：右键文件 → 编辑
- **下载文件**：右键文件 → 下载
- **压缩/解压**：右键文件 → 压缩/解压

### 定时任务

宝塔面板 → **计划任务** → **添加任务**

**示例：每天凌晨 2 点备份项目**
```bash
cd /www/wwwroot/wechat-video-service
tar -czf /www/backup/wechat-$(date +%Y%m%d).tar.gz data/ downloads/
```

**示例：每月 1 号清理 30 天前的视频**
```bash
find /www/wwwroot/wechat-video-service/downloads -name "*.mp4" -mtime +30 -delete
```

---

## 故障排查

### 1. 项目无法启动

**检查步骤**：
1. Node 项目管理器 → **日志** → 查看错误信息
2. 确认项目目录路径正确
3. 确认 `npm install` 已执行
4. 确认端口 3000 未被占用

**手动测试**：
```bash
cd /www/wwwroot/wechat-video-service
node src/server.js
```

**常见错误**：
- **端口被占用**：检查是否有其他项目占用 3000 端口
- **依赖未安装**：执行 `npm install --production`
- **Node 版本过低**：升级到 Node.js 18+

### 2. 无法访问网站（502 错误）

**可能原因**：

#### 原因 1：Node.js 应用未运行

检查：Node 项目管理器 → 查看运行状态

解决：点击 **启动** 按钮

#### 原因 2：服务器时间不对

> ⚠️ **最常见问题！微信签名验证对时间敏感。**

检查：
```bash
date  # 应显示当前真实时间
```

解决：
```bash
ntpdate ntp.aliyun.com
systemctl start ntpd
systemctl enable ntpd
```

然后重启 Node.js 应用。

#### 原因 3：Nginx 未运行

检查：宝塔面板 → 首页 → 查看 Nginx 状态

解决：点击 **启动**

#### 原因 4：防火墙未开放端口

检查：
- 宝塔面板 → **安全** → 确保 80/443 端口已开放
- 腾讯云控制台 → 安全组 → 确保端口已开放

#### 原因 5：域名未解析

测试：
```bash
ping your-domain.com
```

应该显示服务器 IP 地址。

### 3. SSL 证书申请失败

**原因**：
- 域名未解析到服务器
- 80 端口未开放
- 服务器防火墙阻止

**解决**：
1. 确认域名已正确解析（A 记录指向服务器 IP）
2. 确认 80 端口可访问
3. 暂时停止 Nginx → 申请证书 → 重新启动

### 4. 微信签名验证失败

**检查清单**：
1. Token 配置是否一致（后台管理系统 vs 微信公众平台）
2. 服务器时间是否准确（`date` 命令检查）
3. Node.js 应用日志（Node 项目管理器 → 日志）

**解决**：
```bash
# 1. 同步时间
ntpdate ntp.aliyun.com

# 2. 重启应用
# 在 Node 项目管理器中点击"重启"

# 3. 查看日志
# 在 Node 项目管理器中点击"日志"
```

### 5. npm install 很慢

**原因**：使用国外 npm 源

**解决**：
```bash
# 设置淘宝镜像源
npm config set registry https://registry.npmmirror.com

# 重新安装
cd /www/wwwroot/wechat-video-service
rm -rf node_modules package-lock.json
npm install --production

# 验证源
npm config get registry
```

### 6. Node 版本切换后项目无法启动

**原因**：node_modules 是用旧版本编译的

**解决**：
```bash
cd /www/wwwroot/wechat-video-service
rm -rf node_modules package-lock.json
npm install --production
```

然后在 Node 项目管理器中 **重启** 项目。

---

## 安全设置

### 1. 修改管理员密码

后台管理系统 → **设置** → **修改密码**

默认密码 `admin123` 必须修改！

### 2. 修改宝塔端口

宝塔面板 → **面板设置** → **面板端口** → 改为其他端口（如 18888）

### 3. 绑定域名访问

宝塔面板 → **面板设置** → **授权域名** → 填写域名

绑定后只能通过该域名访问宝塔面板。

### 4. 开启 BasicAuth

宝塔面板 → **面板设置** → **BasicAuth 认证** → 开启

### 5. 定期更新

宝塔面板 → **面板设置** → 检查更新

---

## 性能优化

### 1. 开启 Nginx Gzip 压缩

站点设置 → **配置文件** → 在 `http` 块中添加：

```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
```

### 2. 配置静态资源缓存

站点设置 → **配置文件** → 添加：

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 7d;
    add_header Cache-Control "public, immutable";
}
```

### 3. 调整 Node.js 实例数量

如果服务器配置较高（4核+）：
- Node 项目管理器 → 编辑项目
- 运行模式：**cluster**
- 实例数量：根据 CPU 核心数设置（建议核心数 - 1）

---

## 宝塔手机 APP

宝塔提供手机 APP，可以随时随地管理服务器：

1. 应用商店搜索 "**宝塔**"
2. 下载安装
3. 扫描宝塔面板中的二维码绑定
4. 功能：
   - 查看服务器状态
   - 重启服务
   - 查看日志
   - 接收报警通知

---

## 总结

### 使用宝塔面板的优势

- ✅ 可视化操作，无需记忆命令
- ✅ 集成了 Nginx、Node.js、PM2 等工具
- ✅ 一键申请 SSL 证书
- ✅ 方便的文件管理
- ✅ 强大的监控和日志功能
- ✅ 支持手机 APP 远程管理

### 推荐配置

| 环境 | 配置 | 说明 |
|------|------|------|
| **开发测试** | 1核2G + 宝塔 | 学习和测试 |
| **小规模生产** | 2核4G + 宝塔 + Nginx | 小流量应用 |
| **大规模生产** | 4核8G + 宝塔 + Nginx + 负载均衡 | 高流量应用 |

### 常用命令速查

```bash
# Node.js
node -v                    # 查看版本
npm -v                     # 查看 npm 版本
npm install --production   # 安装依赖

# 时间同步
date                       # 查看时间
ntpdate ntp.aliyun.com    # 同步时间
systemctl start ntpd      # 启动 NTP 服务

# Git
git pull                   # 更新代码
git status                 # 查看状态
git log                    # 查看日志

# 文件
ls -la                     # 列出文件
cd /path/to/dir           # 切换目录
rm -rf folder             # 删除文件夹
```

---

## 相关资源

- **宝塔官网**：https://www.bt.cn/
- **宝塔论坛**：https://www.bt.cn/bbs/
- **Node.js 官网**：https://nodejs.org
- **npm 淘宝镜像**：https://npmmirror.com

---

**如有问题，请参考本文档的故障排查章节或访问宝塔官方论坛。**
