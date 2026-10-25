import { transformWithOxc } from 'vite';

const apiRoot = process.env.REACT_APP_API_ROOT;

const warnMissingApiRoot = () => ({
  name: 'conduit-warn-missing-api-root',
  apply: 'build',
  buildStart() {
    if (apiRoot === undefined || apiRoot.trim() === '') {
      this.warn(
        'REACT_APP_API_ROOT is not set at build time. The served app must provide it at runtime through window.__APP_CONFIG__; scripts/serve.js refuses to start without it.'
      );
    }
  }
});

const jsxInJs = () => ({
  name: 'conduit-jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (!id.includes('/src/') || !id.endsWith('.js') || id.includes('/node_modules/')) {
      return null;
    }
    const result = await transformWithOxc(code, `${id}x`, {
      jsx: { runtime: 'classic' },
      sourcemap: true
    });
    return { code: result.code, map: result.map };
  }
});

export default {
  plugins: [warnMissingApiRoot(), jsxInJs()],
  define: {
    global: 'globalThis',
    'process.env.REACT_APP_API_ROOT': JSON.stringify(apiRoot === undefined ? '' : apiRoot)
  },
  server: {
    port: 4100
  },
  build: {
    outDir: 'build',
    emptyOutDir: true
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.js']
  }
};
