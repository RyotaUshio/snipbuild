import * as fs from 'node:fs';
import * as path from 'node:path';

export interface Language {
    name: string;
    snippetPath: string;
    globalPath?: string;
}

export function getLanguages(): Language[] {
    const snippetsDir = path.resolve('src/snippets');
    const globalsDir = path.resolve('src/globals');

    const languages = fs
        .readdirSync(snippetsDir)
        .map(filename => {
            const name = filename.match(/(^.*).hsnips$/)?.[1];
            if (!name) return null;

            const snippetPath = path.join(snippetsDir, filename);
            const globalPath = path.join(globalsDir, name + '.ts');

            return {
                name,
                snippetPath,
                ...(fs.existsSync(globalPath) ? { globalPath } : {}),
            };
        })
        .filter(lang => !!lang);
    return languages;
}
