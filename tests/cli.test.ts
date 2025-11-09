import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { execa } from 'execa';

let workingDir: string;

beforeEach(() => {
    workingDir = fs.mkdtempSync(path.join(os.tmpdir(), 'snipbuild-'));
});

afterEach(() => {
    fs.rmSync(workingDir, {
        recursive: true,
    });
});

it('works', async () => {
    const fixture = path.resolve('./tests/fixtures/simple');
    fs.cpSync(fixture, workingDir, { recursive: true });

    const cliPath = path.resolve('./bin/cli.mjs');
    const { exitCode } = await execa({ cwd: workingDir })`${cliPath}`;
    expect(exitCode).toBe(0);

    const distDir = path.join(workingDir, 'dist');
    const outputPaths = fs
        .readdirSync(distDir)
        .map(file => path.join(distDir, file));

    for (const outputPath of outputPaths) {
        expect(outputPath).toMatch(/\.hsnips$/);
        const output = fs.readFileSync(outputPath, 'utf-8');
        const snapshotPath = path.resolve(
            './tests/snapshots/simple/',
            path.basename(outputPath),
        );
        await expect(output).toMatchFileSnapshot(snapshotPath);
    }
});
