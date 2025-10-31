#!/bin/bash

# 微信视频下载服务 - 打包脚本
# 用于打包项目准备上传到服务器

echo "=================================="
echo "开始打包微信视频下载服务"
echo "=================================="

# 项目名称和版本
PROJECT_NAME="wechat-video-service"
VERSION=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="${PROJECT_NAME}_${VERSION}.tar.gz"

# 需要排除的文件和目录
EXCLUDE_DIRS=(
    "node_modules"
    ".git"
    "downloads"
    "data"
    "logs"
    ".DS_Store"
    "*.log"
    ".env"
)

# 构建排除参数
EXCLUDE_ARGS=""
for dir in "${EXCLUDE_DIRS[@]}"; do
    EXCLUDE_ARGS="${EXCLUDE_ARGS} --exclude=${dir}"
done

echo "排除的文件/目录:"
printf '%s\n' "${EXCLUDE_DIRS[@]}" | sed 's/^/  - /'
echo ""

# 打包
echo "正在打包..."
tar -czf "${PACKAGE_NAME}" ${EXCLUDE_ARGS} \
    src/ \
    public/ \
    package.json \
    package-lock.json \
    ecosystem.config.js \
    nginx.conf \
    deploy.sh \
    .gitignore \
    .env.example \
    README.md \
    DEPLOY.md \
    QUICKSTART.md \
    BAOTA_DEPLOY.md \
    BAOTA_CHECKLIST.md \
    CLAUDE.md

if [ $? -eq 0 ]; then
    # 获取文件大小
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        SIZE=$(ls -lh "${PACKAGE_NAME}" | awk '{print $5}')
    else
        # Linux
        SIZE=$(du -h "${PACKAGE_NAME}" | cut -f1)
    fi

    echo ""
    echo "=================================="
    echo "✅ 打包成功!"
    echo "=================================="
    echo "文件名: ${PACKAGE_NAME}"
    echo "大小: ${SIZE}"
    echo "位置: $(pwd)/${PACKAGE_NAME}"
    echo ""
    echo "📦 打包内容:"
    echo "  ✅ 源代码 (src/)"
    echo "  ✅ 前端页面 (public/)"
    echo "  ✅ 配置文件 (package.json, ecosystem.config.js, nginx.conf)"
    echo "  ✅ 部署脚本 (deploy.sh)"
    echo "  ✅ 文档 (README.md, DEPLOY.md 等)"
    echo ""
    echo "❌ 已排除:"
    echo "  - node_modules (需在服务器上重新安装)"
    echo "  - downloads (视频文件)"
    echo "  - data (配置数据)"
    echo "  - logs (日志文件)"
    echo "  - .git (Git 版本控制)"
    echo ""
    echo "📝 下一步操作:"
    echo "  1. 上传 ${PACKAGE_NAME} 到服务器"
    echo "  2. 在服务器上解压: tar -xzf ${PACKAGE_NAME}"
    echo "  3. 安装依赖: npm install --production"
    echo "  4. 启动服务: ./deploy.sh"
    echo ""
    echo "或者使用宝塔面板:"
    echo "  1. 文件管理 → 上传 ${PACKAGE_NAME}"
    echo "  2. 右键解压"
    echo "  3. PM2 管理器 → 添加项目"
    echo ""
else
    echo "❌ 打包失败!"
    exit 1
fi
