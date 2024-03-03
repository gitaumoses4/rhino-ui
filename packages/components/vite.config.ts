import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { glob } from 'glob';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const COMPONENT_ENTRIES = glob.globSync(path.join('src', 'components', '*', 'index.{ts,tsx}')).reduce((acc, file) => {
  let outputName = file.replace(/src\/components\/(.*?)\/index\.(ts|tsx)/, '$1');
  if (file === 'src/components/index.ts') outputName = 'index';

  return { ...acc, [outputName]: path.join(__dirname, file) };
}, {});

export default defineConfig({
  root: __dirname,
  cacheDir: './node_modules/.vite',
  plugins: [
    libInjectCss(),
    react(),
    dts({
      entryRoot: 'src',
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'],
      exclude: ['src/**/*.stories.ts', 'src/**/*.stories.tsx'],
      rollupTypes: true,
      beforeWriteFile: (filePath) => {
        if (filePath.includes('/css/')) {
          return { filePath, content: 'export {}' };
        }
      },
    }),
  ],
  build: {
    outDir: './dist',
    modulePreload: true,
    minify: true,
    reportCompressedSize: true,
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      entry: {
        index: path.join(__dirname, 'src/index.ts'),
        'css/utilities': path.join(__dirname, 'src/styles/utilities.scss'),
        'css/fonts': path.join(__dirname, 'src/styles/fonts.scss'),
        'css/variables': path.join(__dirname, 'src/styles/variables/index.scss'),
        'css/reset': path.join(__dirname, 'src/styles/reset.scss'),
        ...COMPONENT_ENTRIES,
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', /@rhino-ui\/*/],
      output: {
        exports: 'named',
      },
    },
  },
});
