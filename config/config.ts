import { IConfig, IPlugin } from 'umi-types';
import slash from 'slash2';

const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: { hmr: true },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
    },
  ],
];

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/login',
          component: '../layouts/UserLayout',
          routes: [
            {
              name: 'login',
              icon: 'smile',
              path: '/login',
              component: './login',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/b1',
              name: 'BARX One',
              icon: 'dashboard',
              routes: [
                {
                  name: 'Summary Statistics',
                  icon: 'smile',
                  path: '/b1/ss',
                  component: './b1/ss',
                },
                {
                  name: 'Single Order Forensics',
                  icon: 'smile',
                  path: '/b1/sof',
                  component: './b1/sof',
                  routes: [
                    {
                      path: '/b1/sof',
                      redirect: '/b1/sof/ep',
                    },
                    {
                      name: 'Execution Progress',
                      icon: 'smile',
                      path: '/b1/sof/ep',
                      component: './b1/sof/ep',
                    },
                    {
                      name: 'Venue Stats',
                      icon: 'smile',
                      path: '/b1/sof/vs',
                      component: './b1/sof/vs',
                    },
                  ],
                },
              ],
            },
            {
              path: '/',
              redirect: '/b1/ss',
              authority: ['admin', 'user'],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  }, // chainWebpack: webpackPlugin,
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
} as IConfig;
