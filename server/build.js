/* todo: add obfuscation because 
can u obfuscate html code?!?!?!?!? if ya then ya do that
*/

const Console = require("./util/logging.js")

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
    }).then(() => {
        Console.default.log("Successfully built server.");
    }).catch((error) => {
        Console.default.error("Error while building server!", error);
        process.exit(1);
    });