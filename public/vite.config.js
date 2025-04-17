import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import banner from 'vite-plugin-banner';
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

const bannerText = `
/*
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2025 GCVI Computer Club
 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
*/
`;

export default defineConfig({
    plugins: [react(), banner(bannerText), obfuscatorPlugin({
        options: {
            debugProtection: true,
            debugProtectionInterval: 2500,
            stringArray: true,
            stringArrayShuffle: true,
            splitStrings: true,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            stringArrayCallsTransform: true,
            deadCodeInjectionThreshold: 1,
            controlFlowFlatteningThreshold: 1,
            compact: true,
            disableConsoleOutput: true,
            selfDefending: true,
        }
    })],
    build: {
        rollupOptions: {
            input: {
                // add more below for future
                example: "pages/example/index.html",
                "game-engine": "pages/projects/game-engine/index.html",
                // "markov-chain": "pages/example/projects/markovchain/index.html"
            },
        }
    },
});