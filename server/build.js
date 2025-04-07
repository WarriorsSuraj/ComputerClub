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