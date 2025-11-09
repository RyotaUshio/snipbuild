import { build } from 'rolldown';
import type { Language } from '../language';

export async function buildGlobal(language: Language): Promise<string> {
    if (!language.globalPath) return '';

    let code = await bundleGlobal(language);
    code = stripeExport(code);

    return 'global\n' + code.trim() + '\nendglobal\n\n';
}

async function bundleGlobal(language: Language): Promise<string> {
    const output = await build({
        input: language.globalPath,
        output: {
            // minify: true,
        },
        experimental: {
            attachDebugInfo: 'none',
        },
        write: false,
    });

    console.assert(output.output.length === 1);
    const { code } = output.output[0];

    return code;
}

function stripeExport(code: string): string {
    return code.replace(/export\s*\{.*\};?$/, '');
}
