import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/client.ts',
    'src/config.ts',
    'src/utils.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  target: 'es2020',
  external: ['viem'],
})
