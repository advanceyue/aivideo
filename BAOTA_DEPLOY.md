# 宝塔面板部署指南

## 适用人群
- 不熟悉 Linux 命令行操作的用户
- 希望通过可视化界面管理服务器的用户
- 需要同时部署多个项目的用户

## 一、安装宝塔面板

### 1. 连接到服务器

使用 SSH 工具连接到腾讯云服务器:
- **Windows**: 使用 PuTTY 或 Xshell
- **Mac/Linux**: 使用终端 `ssh root@服务器IP`

### 2. 安装宝塔面板

根据你的操作系统选择安装命令:

#### Ubuntu/Deepin 安装命令
```bash
wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
```

#### CentOS 安装命令
```bash
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
```

#### Debian 安装命令
```bash
wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && bash install.sh ed8484bec
```

### 3. 记录登录信息

安装完成后会显示:
```
==================================================================
Congratulations! Installed successfully!
==================================================================
外网面板地址: http://服务器IP:8888/xxxxxxxx
内网面板地址: http://内网IP:8888/xxxxxxxx
username: xxxxxxxx
password: xxxxxxxx
==================================================================
```

**重要: 请保存好这些信息!**

### 4. 开放宝塔面板端口

在腾讯云控制台 → 安全组规则中:
- 添加入站规则: 端口 8888，来源 0.0.0.0/0

## 二、宝塔面板初始配置

### 1. 登录宝塔面板

浏览器访问: `http://服务器IP:8888/xxxxxxxx`
输入用户名和密码登录

### 2. 安装推荐套件

首次登录会弹出推荐安装套件，选择安装:

**必须安装:**
- ✅ **Nginx** (选择编译安装，版本 1.22+)
- ✅ **PM2 管理器** (重要! Node.js 项目管理工具)

**可选安装:**
- ✅ **MySQL** (如果后续需要数据库)
- ✅ **phpMyAdmin** (数据库管理工具)

**不需要安装:**
- ❌ PHP (本项目不需要)
- ❌ Apache (已经安装 Nginx)

### 3. 安装 PM2 管理器

如果没有在推荐套件中安装:

1. 点击左侧菜单 → **软件商店**
2. 搜索 "**PM2 管理器**"
3. 点击 **安装**
4. 等待安装完成

### 4. 配置安全设置

1. 点击左侧菜单 → **安全**
2. 开放以下端口:
   - **80** (HTTP) - 必须
   - **443** (HTTPS) - 必须
   - **3000** (Node.js 应用) - 可选，可以只通过 Nginx 反向代理访问

## 三、部署 Node.js 项目

### 方式一: 通过宝塔文件管理器上传 (简单)

#### 1. 打包本地项目

在本地项目目录下:

```bash
# Mac/Linux
cd /Users/zhangmin/code/ossign-claude-wx-video
tar -czf wechat-video-service.tar.gz --exclude=node_modules --exclude=.git --exclude=downloads --exclude=data .

# Windows (使用 7-Zip 或 WinRAR)
# 压缩项目文件，排除 node_modules, .git, downloads, data 文件夹
```

#### 2. 上传到服务器

1. 宝塔面板 → **文件** → 进入 `/www/wwwroot` 目录
2. 点击 **上传**
3. 选择 `wechat-video-service.tar.gz` 上传
4. 上传完成后，点击文件 → **解压** → 解压到 `wechat-video-service` 文件夹

#### 3. 安装依赖

1. 点击左侧菜单 → **终端**
2. 执行命令:

```bash
cd /www/wwwroot/wechat-video-service
npm install --production
```

### 方式二: 通过 Git 克隆 (推荐)

#### 1. 配置 Git

1. 宝塔面板 → **终端**
2. 执行命令:

```bash
# 测试 git 是否安装
git --version

# 如果没有安装 git
apt install -y git  # Ubuntu/Debian
# 或
yum install -y git  # CentOS
```

#### 2. 克隆代码

```bash
cd /www/wwwroot
git clone https://github.com/你的用户名/wechat-video-service.git
# 或使用 Gitee (国内更快)
git clone https://gitee.com/你的用户名/wechat-video-service.git

cd wechat-video-service
npm install --production
```

## 四、使用 PM2 管理器启动项目

### 1. 打开 PM2 管理器

宝塔面板 → 左侧菜单 → **软件商店** → 已安装 → 找到 **PM2 管理器** → 点击 **设置**

### 2. 添加项目

点击 **添加项目**，填写信息:

- **项目名称**: `wechat-video-service`
- **启动文件路径**: `/www/wwwroot/wechat-video-service/src/server.js`
- **运行目录**: `/www/wwwroot/wechat-video-service`
- **端口**: `3000`
- **运行用户**: `www` 或 `root`
- **环境变量**:
  ```
  NODE_ENV=production
  PORT=3000
  ```
- **启动方式**: `fork` (单进程) 或 `cluster` (多进程)
- **实例数量**: `1` (fork 模式下)

点击 **提交** 启动项目。

### 3. 查看项目状态

在 PM2 管理器中可以看到:
- ✅ **运行状态** (绿色表示正常运行)
- **内存占用**
- **CPU 占用**
- **运行时间**

### 4. 管理操作

- **重启**: 点击项目右侧的 **重启** 按钮
- **停止**: 点击 **停止** 按钮
- **查看日志**: 点击 **日志** 按钮
- **删除**: 点击 **删除** 按钮

### 5. 配置开机自启

1. PM2 管理器 → **设置**
2. 开启 **开机启动**
3. 勾选你的项目

## 五、配置 Nginx 反向代理

### 方式一: 使用宝塔可视化配置 (推荐)

#### 1. 添加站点

1. 宝塔面板 → **网站** → **添加站点**
2. 填写信息:
   - **域名**: 输入你的域名 (例如: `video.yourdomain.com`)
   - **根目录**: 随意选择 (反向代理不会用到)
   - **FTP**: 不创建
   - **数据库**: 不创建
   - **PHP 版本**: 纯静态
3. 点击 **提交**

#### 2. 配置反向代理

1. 找到刚创建的站点 → 点击 **设置**
2. 点击左侧 **反向代理** → **添加反向代理**
3. 填写信息:
   - **代理名称**: `wechat-video-service`
   - **目标 URL**: `http://127.0.0.1:3000`
   - **发送域名**: `$host`
   - **内容替换**: 留空
4. 点击 **提交**

#### 3. 配置 SSL 证书 (推荐)

1. 站点设置 → **SSL**
2. 选择 **Let's Encrypt** (免费)
3. 勾选你的域名和 www 子域名
4. 点击 **申请**
5. 申请成功后，开启 **强制 HTTPS**

### 方式二: 手动配置 Nginx

1. 站点设置 → **配置文件**
2. 替换为以下内容:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    # 强制跳转 HTTPS (配置 SSL 后启用)
    # return 301 https://$server_name$request_uri;

    # 如果不使用 HTTPS，使用下面的配置
    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# HTTPS 配置 (申请 SSL 证书后自动生成)
```

3. 点击 **保存**

## 六、配置微信公众平台

### 1. 访问后台管理系统

- **不使用域名**: `http://服务器IP:3000/admin/login`
- **使用域名**: `http://your-domain.com/admin/login` 或 `https://your-domain.com/admin/login`

### 2. 登录并配置

- 账号: `admin`
- 密码: `admin123`

**首次登录后请立即修改密码!**

进入 **配置管理** 页面，填写:
- **AppID**: 从微信公众平台获取
- **AppSecret**: 从微信公众平台获取
- **Token**: 自定义 (与微信后台配置一致)

### 3. 配置微信公众平台

登录微信公众平台 → **开发** → **基本配置** → **服务器配置**

- **URL**:
  - 使用域名: `https://your-domain.com/wechat` (推荐)
  - 使用 IP: `http://服务器IP:3000/wechat` (不推荐)
- **Token**: 与后台管理系统中配置的一致
- **EncodingAESKey**: 点击随机生成 (可选)
- **消息加解密方式**: **明文模式** (推荐) 或 **兼容模式**

点击 **提交** 并 **启用**

## 七、宝塔面板常用功能

### 1. 文件管理

- **上传文件**: 文件 → 上传
- **编辑文件**: 右键点击文件 → 编辑
- **下载文件**: 右键点击文件 → 下载
- **修改权限**: 右键点击 → 权限
- **压缩/解压**: 右键点击 → 压缩/解压

### 2. 计划任务 (定时任务)

宝塔面板 → **计划任务** → **添加任务**

**示例: 每天凌晨 2 点备份项目**
- 任务类型: Shell 脚本
- 执行周期: 每天 02:00
- 脚本内容:
```bash
cd /www/wwwroot/wechat-video-service
tar -czf /www/backup/wechat-$(date +%Y%m%d).tar.gz data/ downloads/
```

**示例: 每月 1 号清理 30 天前的视频**
```bash
find /www/wwwroot/wechat-video-service/downloads -name "*.mp4" -mtime +30 -delete
```

### 3. 监控报警

1. 宝塔面板 → **监控**
2. 可查看:
   - CPU 使用率
   - 内存使用率
   - 磁盘使用率
   - 网络流量

3. 设置报警:
   - 点击右上角 **设置**
   - 配置报警阈值
   - 设置接收报警的邮箱或手机号

### 4. 日志查看

- **Nginx 访问日志**: 网站 → 设置 → 日志
- **Nginx 错误日志**: 网站 → 设置 → 日志
- **PM2 应用日志**: PM2 管理器 → 项目 → 日志
- **系统日志**: 宝塔面板 → 终端 → 执行 `tail -f /var/log/syslog`

### 5. 数据库管理 (可选)

如果后续需要数据库:
1. 宝塔面板 → **数据库**
2. 添加数据库
3. 使用 phpMyAdmin 管理

## 八、项目更新流程

### 如果使用 Git

1. 宝塔面板 → **终端**
2. 执行命令:

```bash
cd /www/wwwroot/wechat-video-service
git pull
npm install --production
```

3. 宝塔面板 → **PM2 管理器** → 找到项目 → 点击 **重启**

### 如果使用文件上传

1. 本地重新打包项目
2. 宝塔面板 → **文件** → 上传并解压
3. PM2 管理器 → 重启项目

## 九、安全设置

### 1. 修改宝塔默认端口

宝塔面板 → **面板设置** → **面板端口** → 改为其他端口 (如 18888)

### 2. 绑定域名访问

宝塔面板 → **面板设置** → **授权域名** → 填写域名
绑定后只能通过该域名访问宝塔面板

### 3. 开启 BasicAuth

宝塔面板 → **面板设置** → **BasicAuth 认证** → 开启

### 4. 开启 IP 白名单

宝塔面板 → **安全** → **SSH 安全** → 设置允许访问的 IP

### 5. 定期更新

宝塔面板 → **面板设置** → 检查更新 → 更新到最新版本

## 十、故障排查

### 1. 项目无法启动

**PM2 管理器中查看日志**:
- 点击项目 → **日志**
- 查看错误信息

**常见问题**:
- **端口被占用**: 检查 3000 端口是否被其他程序占用
- **依赖未安装**: 执行 `npm install`
- **Node.js 版本过低**: 升级 Node.js 到 18+

### 2. 无法访问网站

**检查 Nginx 状态**:
- 宝塔面板 → **首页** → 查看 Nginx 运行状态
- 如果未运行，点击 **启动**

**检查防火墙**:
- 宝塔面板 → **安全** → 确保 80 和 443 端口已开放
- 腾讯云控制台 → 安全组 → 确保端口已开放

**检查域名解析**:
- 使用 `ping your-domain.com` 测试域名是否解析到服务器 IP

### 3. SSL 证书申请失败

**原因**:
- 域名未解析到服务器
- 80 端口未开放
- 服务器防火墙阻止

**解决方法**:
1. 确认域名已正确解析
2. 确认 80 端口可访问
3. 暂时停止 Nginx → 申请证书 → 重新启动

### 4. 微信签名验证失败

1. 检查 Token 配置是否一致
2. 宝塔终端执行 `date` 检查服务器时间
3. PM2 管理器查看应用日志

## 十一、性能优化

### 1. 开启 Nginx Gzip 压缩

站点设置 → **配置文件** → 在 `http` 块中添加:

```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
```

### 2. 配置静态资源缓存

站点设置 → **配置文件** → 添加:

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 7d;
    add_header Cache-Control "public, immutable";
}
```

### 3. 调整 PM2 实例数量

如果服务器配置较高 (4核+):
- PM2 管理器 → 项目设置
- 运行模式: **cluster**
- 实例数量: 根据 CPU 核心数设置 (建议核心数 - 1)

## 十二、宝塔手机 APP

宝塔提供手机 APP，可以随时随地管理服务器:

1. 手机应用商店搜索 "**宝塔**"
2. 下载安装
3. 扫描宝塔面板中的二维码绑定
4. 可在手机上:
   - 查看服务器状态
   - 重启服务
   - 查看日志
   - 接收报警通知

## 总结

使用宝塔面板部署的优势:
- ✅ 可视化操作，无需记忆命令
- ✅ 集成了 PM2、Nginx 等工具
- ✅ 一键申请 SSL 证书
- ✅ 方便的文件管理
- ✅ 强大的监控和日志功能
- ✅ 支持手机 APP 远程管理

推荐配置:
- **开发测试**: 1核2G + 宝塔面板
- **小规模生产**: 2核4G + 宝塔面板 + Nginx
- **大规模生产**: 4核8G + 宝塔面板 + Nginx + 负载均衡

---

如有问题，可以访问宝塔官方论坛: https://www.bt.cn/bbs/
