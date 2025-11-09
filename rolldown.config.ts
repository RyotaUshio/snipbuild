import { defineConfig } from 'rolldown';

export default defineConfig({
    input: 'src/cli.ts',
    output: {
        file: 'dist/cli.mjs',
        minify: true,
    },
    platform: 'node',
    tsconfig: './tsconfig.json',
});
