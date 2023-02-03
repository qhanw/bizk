import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  themeConfig: {
    name: 'bizk',
    logo: '/logo.png',
    footer:
      'Copyright © 2023 | Powered by <a href="http://qhan.wang">Qhan W</a>',
  },

  favicons: ['/favicon.png'],

  resolve: {
    atomDirs: [
      { type: 'utils', dir: 'packages/utils/src' },
      { type: 'component', dir: 'packages/components/src' },
    ],
  },
  // 包引入配置
  alias: {
    '@bizk/components': path.resolve(__dirname, 'packages/components/src'),
  },
});
