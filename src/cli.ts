import * as fs from 'node:fs';
import { getLanguages } from './language';
import { buildLanguage } from './build';

const languages = getLanguages();

languages.forEach(async language => {
    const output = await buildLanguage(language);
    await fs.promises.mkdir('dist', { recursive: true });
    await fs.promises.writeFile(`dist/${language.name}.hsnips`, output);
});
