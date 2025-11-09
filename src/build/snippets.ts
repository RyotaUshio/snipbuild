import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Language } from '../language';

export async function buildSnippets(language: Language): Promise<string> {
    return recursivelyBuildSnippets(language.snippetPath);
}

function recursivelyBuildSnippets(snippetPath: string): string {
    const snippets = fs.readFileSync(snippetPath, 'utf-8');
    return snippets
        .split('\n')
        .map(line => {
            const includedSnippetPath = getIncludedPath(snippetPath, line);
            if (!includedSnippetPath) return line;
            return recursivelyBuildSnippets(includedSnippetPath);
        })
        .join('\n');
}

function getIncludedPath(snippetPath: string, line: string): string | null {
    const match = line.match(/^#include "(.*)"\s*$/);
    if (!match) return null;
    const includedSnippetPath = path.join(path.dirname(snippetPath), match[1]);
    return includedSnippetPath;
}
