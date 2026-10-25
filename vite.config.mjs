import { transformWithOxc } from 'vite';

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
  server: {
    port: 4100
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.js']
  }
};
