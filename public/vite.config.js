import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import banner from 'vite-plugin-banner';

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
    plugins: [react(), banner(bannerText)],
    build: {
        rollupOptions: {
            input: {
                // add more below for future
                example: "pages/example/index.html",
            },
        }
    },
});