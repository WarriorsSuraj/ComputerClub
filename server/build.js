/* todo: add obfuscation because 
can u obfuscate html code?!?!?!?!? if ya then ya do that
*/

require("esbuild")
    .build({
        entryPoints: ["src/index.ts"],
        bundle: true,
        treeShaking: true,
        //minify: true,
        sourcemap: true,
        target: "node20",
        platform: "node",
        outfile: "dist/index.js",
    })
    .catch(() => process.exit(1));