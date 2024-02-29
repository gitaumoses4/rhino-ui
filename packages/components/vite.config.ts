import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { glob } from 'glob';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const COMPONENTS = glob.globSync(path.join('src', 'components', '**', 'index.{ts,tsx}')).reduce((acc, file) => {
  return {
    ...acc,
    [file.replace(/src\/components\/(.*?)\/index\.(ts|tsx)/, '$1/index')]: path.join(__dirname, file),
  };
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
      insertTypesEntry: true,
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
        ...COMPONENTS,
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
