import { transformWithOxc } from 'vite';

const apiRoot = process.env.REACT_APP_API_ROOT;

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
  plugins: [jsxInJs()],
  define: {
    global: 'globalThis',
    'process.env.REACT_APP_API_ROOT': JSON.stringify(apiRoot === undefined ? '' : apiRoot)
  },
  server: {
    port: 4100
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.js']
  }
};
