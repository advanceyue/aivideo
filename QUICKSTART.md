# 快速部署指南

## 本地部署 (5 分钟)

```bash
# 1. 克隆代码
git clone <your-repo-url>
cd wechat-video-service

# 2. 安装依赖
npm install

# 3. 启动服务
npm run dev

# 4. 访问后台
# 浏览器打开: http://localhost:3000/admin/login
# 账号: admin / 密码: admin123
```

## 腾讯云服务器部署 (15 分钟)

### 准备工作
1. 购买腾讯云服务器 (推荐: 2核2G, Ubuntu 20.04)
2. 获取服务器公网 IP
3. 注册一个域名 (可选,建议使用)

### 快速部署步骤

#### 1. 连接到服务器
```bash
ssh root@your-server-ip
```

#### 2. 安装 Node.js 和 PM2
```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# 安装 Node.js 18
nvm install 18
nvm use 18

# 安装 PM2
npm install -g pm2
```

#### 3. 克隆代码
```bash
# 创建项目目录
mkdir -p /www/wwwroot
cd /www/wwwroot

# 克隆代码 (替换为你的仓库地址)
git clone https://github.com/your-username/wechat-video-service.git
cd wechat-video-service
```

#### 4. 一键部署
```bash
# 赋予执行权限
chmod +x deploy.sh

# 首次部署 (会配置开机自启)
./deploy.sh init

# 或普通部署
./deploy.sh
```

#### 5. 配置防火墙 (重要!)
```bash
# 开放端口
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw enable
```

#### 6. 配置微信公众平台

1. **后台管理系统配置**
   - 访问: `http://服务器IP:3000/admin/login`
   - 登录: admin / admin123 (首次登录后请修改密码!)
   - 填写微信公众号的 AppID, AppSecret, Token

2. **微信公众平台配置**
   - 登录微信公众平台
   - 进入: 开发 → 基本配置 → 服务器配置
   - URL: `http://服务器IP:3000/wechat` 或 `http://你的域名/wechat`
   - Token: 与后台管理系统中配置的一致
   - 点击提交并启用

### 可选: 配置域名和 HTTPS (推荐)

#### 1. 配置域名解析
在域名服务商处添加 A 记录:
- 主机记录: @ 或 www
- 记录值: 服务器公网 IP

#### 2. 安装 Nginx
```bash
apt update
apt install -y nginx
systemctl start nginx
systemctl enable nginx
```

#### 3. 配置 Nginx 反向代理
```bash
# 复制配置文件
cp /www/wwwroot/wechat-video-service/nginx.conf /etc/nginx/sites-available/wechat-video

# 编辑配置文件,替换域名
nano /etc/nginx/sites-available/wechat-video
# 将 your-domain.com 替换为你的实际域名

# 创建软链接
ln -s /etc/nginx/sites-available/wechat-video /etc/nginx/sites-enabled/

# 删除默认配置
rm -f /etc/nginx/sites-enabled/default

# 测试配置
nginx -t

# 重载 Nginx
systemctl reload nginx
```

#### 4. 配置 HTTPS (Let's Encrypt)
```bash
# 安装 Certbot
apt install -y certbot python3-certbot-nginx

# 获取证书
certbot --nginx -d your-domain.com -d www.your-domain.com

# 测试自动续期
certbot renew --dry-run
```

## 验证部署

### 1. 检查服务状态
```bash
pm2 status
pm2 logs wechat-video-service
```

### 2. 测试接口
```bash
# 健康检查
curl http://localhost:3000/health

# 或通过域名
curl https://your-domain.com/health
```

### 3. 测试微信验证
在微信公众平台后台提交服务器配置,如果验证成功说明部署正常。

## 常见问题

### 1. 端口被占用
```bash
# 查看占用端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>
```

### 2. PM2 服务无法启动
```bash
# 查看错误日志
pm2 logs wechat-video-service --err

# 删除并重新启动
pm2 delete wechat-video-service
pm2 start src/server.js --name wechat-video-service
```

### 3. 微信签名验证失败
- 检查 Token 配置是否一致
- 确认服务器时间准确: `date`
- 检查服务是否正常运行: `pm2 status`

### 4. 无法访问后台管理系统
- 检查防火墙是否开放 3000 端口
- 如果使用 Nginx,检查配置是否正确
- 查看 Nginx 日志: `tail -f /var/log/nginx/error.log`

## 日常维护

### 更新代码
```bash
cd /www/wwwroot/wechat-video-service
git pull
npm install --production
pm2 restart wechat-video-service
```

### 查看日志
```bash
# PM2 日志
pm2 logs wechat-video-service

# 应用日志
tail -f logs/out.log
tail -f logs/err.log

# Nginx 日志
tail -f /var/log/nginx/wechat-video-access.log
tail -f /var/log/nginx/wechat-video-error.log
```

### 备份数据
```bash
cd /www/wwwroot/wechat-video-service
tar -czf backup-$(date +%Y%m%d).tar.gz data/ downloads/
```

### 清理旧视频
```bash
# 删除 30 天前的视频
find downloads -name "*.mp4" -mtime +30 -delete
```

## 推荐工具

### PM2 Web 监控 (可选)
```bash
# 安装 PM2 Plus (提供 Web 监控界面)
pm2 plus
```

### 宝塔面板 (可选)
如果不熟悉命令行,可以安装宝塔面板:
```bash
wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh
```

## 技术支持

- 查看完整部署文档: [DEPLOY.md](DEPLOY.md)
- 查看项目说明: [README.md](README.md)
- 查看开发指南: [CLAUDE.md](CLAUDE.md)

---

祝部署顺利! 🎉
