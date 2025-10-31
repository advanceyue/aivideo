# CLAUDE.md

这个文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 项目概述

这是一个微信服务号视频下载服务,可以自动接收和下载用户转发的视频号视频和普通视频,并通过微信消息反馈下载结果。项目使用 Node.js + Express 构建,包含后台管理系统。

## 开发环境

### 启动服务

```bash
# 开发模式(自动重启)
npm run dev

# 生产模式
npm start

# 使用 PM2 管理(推荐生产环境)
pm2 start src/server.js --name wechat-video-service
```

### 安装依赖

```bash
npm install
```

### 环境配置

配置信息存储在 `data/config.json` 中(自动创建),不使用 `.env` 文件。通过后台管理系统 (http://localhost:3000/admin/login) 进行配置。

默认管理员账号:
- 用户名: admin
- 密码: admin123

## 架构设计

### 核心消息处理流程

```
微信用户转发视频
    ↓
微信服务器 POST 到 /wechat
    ↓
server.js 验证签名 → utils/wechat.js
    ↓
解析 XML 消息 → utils/wechat.js
    ↓
分发到消息处理器 → services/messageHandler.js
    ↓
识别消息类型:
  - text: 处理命令(帮助、列表等)
  - video/shortvideo: 调用 videoDownloader.downloadVideo()
  - link: 检查是否为视频号链接
  - finderFeed: 视频号消息 → finderVideoService
    ↓
下载视频:
  - 普通视频: wechatAPI.getMedia() 或 getJssdk()
  - 视频号视频: finderVideoService.parseFinderVideoUrl()
    ↓
保存到 downloads/ 目录
    ↓
通过客服消息 API 异步回复结果 → wechatAPI.sendCustomMessage()
```

### 关键服务模块

#### services/messageHandler.js
消息路由和业务逻辑中心。负责:
- 识别消息类型(文本/视频/视频号链接/事件)
- 处理用户命令(帮助、列表)
- 启动异步下载任务
- 通过客服消息 API 发送下载结果

#### services/videoDownloader.js
视频下载和文件管理。提供:
- `downloadVideo(mediaId, msgId)`: 下载普通视频,自动尝试两种 API
- `downloadFinderVideo(objectId, objectNonceId, msgId)`: 下载视频号视频
- `listDownloadedVideos()`: 列出已下载视频

#### services/finderVideoService.js
视频号专用服务。负责:
- 解析视频号消息中的 `objectId` 和 `objectNonceId`
- 调用第三方解析 API 获取真实视频 URL
- 支持多个备用 API (在 `parseFinderVideoUrl` 中配置)
- 如果无法解析,返回视频号链接供用户手动下载

#### services/wechatAPI.js
微信 API 封装层。功能:
- Access Token 管理(自动缓存和刷新)
- `getMedia(mediaId)`: 获取临时素材
- `getJssdk(mediaId)`: 获取高清素材(备用)
- `sendCustomMessage(openId, content)`: 发送客服消息(用于异步回复)

#### services/configManager.js
配置持久化服务。管理 `data/config.json` 中的:
- 微信公众号配置(appId, appSecret, token)
- 系统配置(端口、下载目录)
- 管理员账号(密码使用 bcryptjs 加密)

### 前端架构

后台管理系统位于 `public/` 目录:
- login.html: 登录页面
- dashboard.html: 仪表盘(统计信息)
- config.html: 微信配置管理
- videos.html: 视频列表查看
- settings.html: 系统设置和密码修改
- static/: CSS 和 JS 资源

路由通过 `routes/admin.js` 处理,使用 express-session 进行身份验证。

## 微信 API 关键点

### Access Token 管理
- Token 缓存在内存中,提前 5 分钟刷新避免过期
- 配置未完成时会抛出友好错误提示

### 消息响应时间限制
- 微信要求 5 秒内响应,否则重试
- 下载任务立即返回"正在下载..."消息
- 实际下载在后台异步进行(`downloadVideoAsync`)
- 完成后通过客服消息 API 推送结果

### 视频号消息识别
视频号消息可能以多种形式出现:
- 包含 `finderFeed` 字段的消息
- `link` 类型消息,URL 包含 `channels.weixin.qq.com`
- 需要提取 `objectId` 和 `objectNonceId` 用于解析

### 两种视频下载接口
普通视频优先使用 `/cgi-bin/media/get`,失败时尝试 `/cgi-bin/media/get/jssdk`。

## 配置第三方视频号解析 API

修改 [src/services/finderVideoService.js](src/services/finderVideoService.js) 中的 `parseFinderVideoUrl` 函数:

```javascript
// 方法1: 主要解析 API
const response = await axios.post(
  'https://your-api-endpoint.com/parse',
  {
    objectId: objectId,
    objectNonceId: objectNonceId
  },
  { timeout: 15000 }
);

// 方法2: 备用 API
// 添加更多 try-catch 块实现多个备用源
```

## 常见开发任务

### 添加新的消息类型处理

在 [src/services/messageHandler.js](src/services/messageHandler.js) 的 `handleMessage` 中添加新 case:

```javascript
case 'image':
  replyContent = await handleImageMessage(message);
  break;
```

### 修改下载文件命名规则

在 [src/services/videoDownloader.js](src/services/videoDownloader.js) 中修改:
- 普通视频: `video_${msgId}_${timestamp}.mp4`
- 视频号视频: `finder_${objectId}_${timestamp}.mp4`

### 调试微信消息

所有接收的消息会记录到控制台:
```javascript
console.log('收到微信消息:', JSON.stringify(message, null, 2));
```

查看消息结构以理解新的消息类型。

### 添加新的后台管理页面

1. 在 `public/` 创建 HTML 文件
2. 在 `routes/admin.js` 添加路由
3. 使用 `authMiddleware` 保护需要登录的页面

## 部署注意事项

### 生产环境要求
- 需要公网 IP 或域名(微信回调要求)
- 推荐使用 HTTPS(微信官方要求)
- 使用 PM2 或 systemd 管理进程
- 配置 Nginx 反向代理

### 微信服务器配置
在微信公众平台后台配置:
- URL: `http://your-domain.com:3000/wechat`
- Token: 与后台管理系统中配置的一致
- 消息加解密方式: 明文模式或兼容模式

### 数据持久化
- 配置文件: `data/config.json`
- 视频文件: `downloads/` 目录
- 确保这两个目录在部署时正确挂载

## 故障排查

### 签名验证失败
- 检查 Token 配置是否与微信后台一致
- 确认服务器时间准确
- 查看 [src/utils/wechat.js](src/utils/wechat.js) 的 `verifySignature` 函数

### 视频下载失败
- 检查 Access Token 是否有效(查看日志)
- 确认 AppID 和 AppSecret 配置正确
- 临时素材有效期为 3 天,过期无法下载

### 视频号视频无法下载
- 视频号需要第三方解析 API
- 检查 [src/services/finderVideoService.js](src/services/finderVideoService.js) 中的 API 配置
- 如果 API 失败,系统会返回视频号链接供用户手动访问

### 客服消息发送失败
- 客服消息有 48 小时窗口限制
- 只能在用户最后交互 48 小时内发送
- 检查 errcode 了解具体错误

## 代码风格

- 使用 CommonJS 模块系统 (`require`/`module.exports`)
- 异步操作使用 `async/await`
- 错误处理使用 try-catch,记录详细日志到控制台
- 文件命名使用 camelCase
- 所有用户可见消息使用中文
