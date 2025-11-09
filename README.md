# snipbuild - HyperSnips snippets bundler

**snipbuild** is a build tool that provides an easier way to develop [HyperSnips](https://github.com/draivin/hsnips) snippets.

- You can develop Global block JavaScript using TypeScript.
    - Each `src/globals/[LANGUAGE].ts` exports what will be included in the global block of the corresponding snippet file.
    - Because snipbuild uses a bundler ([Rolldown](https://rolldown.rs/)) under the hood, you can split your source code in several files.
    - You can use your favorite tools for normal JS/TS development, for example, [Vitest](https://vitest.dev/) for unit-testing. It makes maintainance far easier.
- The snippet blocks for each language is located at `src/snippets/[LANGUAGE].hsnips`. It is in the exact same format as normal `.hsnips` files except:
  - It does not have the `global ... endglobal` block at the top.
  - It allows you to include common snippets shared by several (but not necessarily all) languages using `#include "..."`.
- When running `npx snipbuild`, [Rolldown](https://rolldown.rs/) generates the global JavaScript from `src/globals[LANGUAGE.ts]`, and the output is concatenated with the snippet blocks from `src/snippets/[LANGUAGE].hsnips`.

## How to use

1. Install Node.js
2. Run `npx snipbuild` to generate snippet files under the `dist/` directory
3. Install the generated snippet files. For example, you can use the following script on macOS (assuming you've installed both VSCode and Cursor):

   ```bash
   #!/usr/bin/env bash
   set -euo pipefail

   for app in Code Cursor; do
   dir="$HOME/Library/Application Support/$app/User/globalStorage/draivin.hsnips"
   mkdir -p "$dir"
   ln -sf $(realpath dist) "$dir/hsnips"
   done
   ```

4. Make sure you execute the `HyperSnips: Reload Snippets` command after updating the snippet files.

Once you install the snippets using symbolic links (as shown above), all you have to do after making edit to the source code is `npx snipbuild` & `HyperSnips: Reload Snippets`.
