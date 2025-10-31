#!/bin/bash

# 微信视频下载服务 - 自动部署脚本
# 使用方法: ./deploy.sh

set -e  # 遇到错误立即退出

echo "=================================="
echo "微信视频下载服务 - 自动部署脚本"
echo "=================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 项目目录
PROJECT_DIR=$(pwd)
APP_NAME="wechat-video-service"

# 检查 Node.js
echo -e "${YELLOW}检查 Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: 未安装 Node.js${NC}"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js 版本: $(node -v)${NC}"

# 检查 npm
echo -e "${YELLOW}检查 npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}错误: 未安装 npm${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm 版本: $(npm -v)${NC}"

# 检查 PM2
echo -e "${YELLOW}检查 PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}PM2 未安装,正在安装...${NC}"
    npm install -g pm2
    echo -e "${GREEN}✓ PM2 安装完成${NC}"
else
    echo -e "${GREEN}✓ PM2 版本: $(pm2 -v)${NC}"
fi

# 创建必要的目录
echo -e "${YELLOW}创建必要的目录...${NC}"
mkdir -p data
mkdir -p downloads
mkdir -p logs
echo -e "${GREEN}✓ 目录创建完成${NC}"

# 安装依赖
echo -e "${YELLOW}安装项目依赖...${NC}"
if [ "$1" == "dev" ]; then
    npm install
else
    npm install --production
fi
echo -e "${GREEN}✓ 依赖安装完成${NC}"

# 停止已运行的服务
echo -e "${YELLOW}检查并停止旧服务...${NC}"
if pm2 list | grep -q "$APP_NAME"; then
    echo "正在停止旧服务..."
    pm2 stop $APP_NAME
    pm2 delete $APP_NAME
    echo -e "${GREEN}✓ 旧服务已停止${NC}"
else
    echo "未发现运行中的服务"
fi

# 启动服务
echo -e "${YELLOW}启动服务...${NC}"
if [ -f "ecosystem.config.js" ]; then
    pm2 start ecosystem.config.js
else
    pm2 start src/server.js --name $APP_NAME
fi
echo -e "${GREEN}✓ 服务启动成功${NC}"

# 保存 PM2 配置
echo -e "${YELLOW}保存 PM2 配置...${NC}"
pm2 save
echo -e "${GREEN}✓ PM2 配置已保存${NC}"

# 设置开机自启 (仅首次部署时需要)
if [ "$1" == "init" ]; then
    echo -e "${YELLOW}配置开机自启...${NC}"
    pm2 startup
    echo -e "${YELLOW}请复制上面的命令并执行,然后运行: pm2 save${NC}"
fi

# 显示服务状态
echo ""
echo -e "${GREEN}=================================="
echo "部署完成!"
echo -e "==================================${NC}"
echo ""
pm2 status
echo ""
echo -e "${YELLOW}常用命令:${NC}"
echo "  查看日志: pm2 logs $APP_NAME"
echo "  重启服务: pm2 restart $APP_NAME"
echo "  停止服务: pm2 stop $APP_NAME"
echo "  查看状态: pm2 status"
echo "  监控服务: pm2 monit"
echo ""
echo -e "${YELLOW}后台管理:${NC}"
echo "  访问地址: http://localhost:3000/admin/login"
echo "  默认账号: admin"
echo "  默认密码: admin123"
echo ""
echo -e "${RED}重要: 首次登录后请立即修改默认密码!${NC}"
echo ""
