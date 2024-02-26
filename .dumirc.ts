import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  themeConfig: {
    name: 'Bizk',
    logo: '/logo.png',
    github: 'https://github.com/qhanw/bizk',
    apiHeader: false,
    footerConfig: {
      bottom: 'Powered by <a href="https://qhan.wang">Qhan W</a>',
      columns: [],
    },
  },

  favicons: ['/favicon.png'],

  resolve: {
    atomDirs: [
      { type: 'component', dir: 'packages/components/src' },
      { type: 'hooks', dir: 'packages/hooks/src' },
      { type: 'utils', dir: 'packages/utils/src' },
    ],
  },
  // 包引入配置
  alias: {
    '@bizk/components': path.resolve(__dirname, 'packages/components/src'),
    '@bizk/hooks': path.resolve(__dirname, 'packages/hooks/src'),
  },
});
