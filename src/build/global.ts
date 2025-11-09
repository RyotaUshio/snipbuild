import { build, type OutputChunk } from 'rolldown';
import type { Language } from '../language';

export async function buildGlobal(language: Language): Promise<string> {
    if (!language.globalPath) return '';

    const bundle = await bundleGlobal(language);
    return `global\nconst _exports={};(exports=>{${bundle.code}})(_exports);const{${bundle.exports.join(',')}}=_exports;\nendglobal\n\n`;
}

async function bundleGlobal(language: Language): Promise<OutputChunk> {
    const output = await build({
        input: language.globalPath,
        output: {
            minify: true,
            format: 'cjs',
        },
        experimental: {
            attachDebugInfo: 'none',
        },
        write: false,
    });

    console.assert(output.output.length === 1);
    return output.output[0];
}
