import { addDynamicIconSelectors } from '@iconify/tailwind'
import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import daisyui from 'daisyui'
import daisyuiThemes from 'daisyui/src/theming/themes'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import { accentColor, accentColorDark, errorColor, errorColorDark, infoColor, infoColorDark, neutralColor, neutralColorDark, primaryColor, primaryColorDark, secondaryColor, secondaryColorDark, successColor, successColorDark, warningColor, warningColorDark } from './src/lib/color'

const config: Config = {
  darkMode: [],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        destructive: {
          DEFAULT: 'var(--error)',
          foreground: 'base-content-reversed',
        },
        muted: {
          DEFAULT: 'var(--base-300)',
          foreground: 'var(--base-content)',
        },
        accent: {
          DEFAULT: 'var(--card-btn-bg)',
          foreground: 'var(--primary)',
        },
        popover: {
          DEFAULT: 'var(--base-300)',
          foreground: 'var(--base-content)',
        },

      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      transitionTimingFunction: {
        'in-out': 'ease-in-out',
      },
      flex: {
        2: '2 2 0%',
      },
    },
  },
  plugins: [addDynamicIconSelectors(), tailwindcssAnimate, daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          ...daisyuiThemes.dark,
          'primary': primaryColorDark[6],
          'secondary': secondaryColorDark[6],
          'secondary-content': '#fff',
          'accent': accentColorDark[6],
          'accent-content': '#fff',
          'neutral': neutralColorDark[6],
          'info': infoColorDark[6],
          'success': successColorDark[6],
          'warning': warningColorDark[6],
          'error': errorColorDark[6],
          'base-100': '#18171d', // 背景色
          // 'base-200': '#18171d', // 背景色
          'base-300': '#1b1c20', // 卡片颜色
          'base-content': '#f7f7fa', // 文字颜色
          'base-content-reversed': '#363636', // 反转文字颜色
          '--primary': primaryColorDark[6], // 主色
          '--error': errorColorDark[6], // 错误色
          '--glass-bg-op': '#1d1d1fb8', // 玻璃背景
          '--border-color': '#3d3d3f', // 默认边框颜色
          '--card-border': '#3d3d3f', // 卡片边框颜色
          '--card-btn-bg': '#30343f', // 卡片按钮背景色

        },
      },
      {
        light: {
          ...daisyuiThemes.light,
          'primary': primaryColor[6],
          'primary-content': '#fff',
          'secondary': secondaryColor[6],
          'secondary-content': '#fff',
          'accent': accentColor[6],
          'accent-content': '#fff',
          'neutral': neutralColor[6],
          'neutral-content': '#fff',
          'info': infoColor[6],
          'info-content': '#fff',
          'success': successColor[6],
          'success-content': '#fff',
          'warning': warningColor[6],
          'warning-content': '#fff',
          'error': errorColor[6],
          'error-content': '#fff',
          'base-content-reversed': '#f7f7fa', // 反转文字颜色
          'base-100': '#f7f9fe', // 背景色
          // 'base-200': 'red', // 背景色
          'base-300': '#fff', // 卡片颜色
          'base-content': '#363636', // 文字颜色
          '--primary': primaryColor[6], // 主色
          '--error': errorColor[6], // 错误色
          '--tab-border': '2px',
          '--glass-bg-op': '#ffffffb8',
          '--border-color': '#e3e8f7',
          '--card-border': '#e3e8f7',
          '--card-btn-bg': '#edf0f7', // 卡片按钮背景色
        },
      },
    ],
  },
}
export default config
