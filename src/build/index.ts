import type { Language } from '../language';
import { buildGlobal } from './global';
import { buildSnippets } from './snippets';

export async function buildLanguage(language: Language): Promise<string> {
    const [global, snippets] = await Promise.all([
        buildGlobal(language),
        buildSnippets(language),
    ]);
    return global + snippets;
}
