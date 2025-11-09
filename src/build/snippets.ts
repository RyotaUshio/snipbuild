import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Language } from '../language';

export async function buildSnippets(language: Language): Promise<string> {
    const snippets = fs.readFileSync(language.snippetPath, 'utf-8');
    return snippets
        .split('\n')
        .map(line => {
            const included = getIncludeTarget(line);
            if (!included) return line;
            return includeSnippets(language.snippetPath, included);
        })
        .join('\n');
}

function getIncludeTarget(line: string): string | null {
    const match = line.match(/^#include "(.*)"\s*$/);
    return match ? match[1] : null;
}

/**
 * @param source Path of the file including the target
 * @param target Path of the file included by the source
 */
function includeSnippets(source: string, target: string) {
    const includedPath = path.join(path.dirname(source), target);
    const includedSnippets = fs.readFileSync(includedPath, 'utf-8');
    return includedSnippets;
}
