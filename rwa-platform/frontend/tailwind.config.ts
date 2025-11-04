import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 背景色系
        bg: {
          primary: '#0A1628',
          secondary: '#111C2E',
          tertiary: '#1A2942',
          elevated: '#223254',
        },
        // 品牌色
        brand: {
          primary: '#3B82F6',
          secondary: '#60A5FA',
          dark: '#2563EB',
        },
        // 文本色
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          tertiary: '#94A3B8',
          disabled: '#64748B',
        },
        // 边框色
        border: {
          primary: '#334155',
          secondary: '#475569',
          focus: '#3B82F6',
        },
        // 语义色 - 成功
        success: {
          bg: '#064E3B',
          text: '#34D399',
          main: '#10B981',
        },
        // 语义色 - 错误
        error: {
          bg: '#7F1D1D',
          text: '#FCA5A5',
          main: '#EF4444',
        },
        // 语义色 - 警告
        warning: {
          bg: '#78350F',
          text: '#FCD34D',
          main: '#F59E0B',
        },
        // 语义色 - 信息
        info: {
          bg: '#1E3A8A',
          text: '#93C5FD',
          main: '#3B82F6',
        },
        // 交易色
        up: '#10B981',
        down: '#EF4444',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          '"SF Mono"',
          '"Cascadia Code"',
          '"Roboto Mono"',
          'monospace',
        ],
      },
      boxShadow: {
        brand: '0 0 0 3px rgba(59, 130, 246, 0.3)',
        glow: '0 0 20px rgba(59, 130, 246, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-in-bottom': 'slideInBottom 300ms ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideInBottom: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
