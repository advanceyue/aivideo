module.exports = {
  apps: [{
    name: 'wechat-video-service',
    script: 'src/server.js',

    // 实例数量 (cluster 模式)
    instances: 1,
    exec_mode: 'fork', // 或 'cluster' 用于多核

    // 自动重启配置
    autorestart: true,
    watch: false, // 生产环境不要开启 watch
    max_memory_restart: '500M',

    // 环境变量
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },

    // 日志配置
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,

    // 其他配置
    min_uptime: '10s', // 最小运行时间
    max_restarts: 10, // 最大重启次数
    restart_delay: 4000 // 重启延迟
  }],

  // 部署配置 (可选)
  deploy: {
    production: {
      user: 'root',
      host: 'your-server-ip', // 替换为你的服务器 IP
      ref: 'origin/main',
      repo: 'git@github.com:your-username/wechat-video-service.git', // 替换为你的仓库地址
      path: '/www/wwwroot/wechat-video-service',
      'post-deploy': 'npm install --production && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt-get install git -y'
    }
  }
};
