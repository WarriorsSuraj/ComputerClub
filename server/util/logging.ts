import chalk from "chalk";

// biome-ignore lint/complexity/noStaticOnlyClass: 
export default class Console {
    // biome-ignore lint/suspicious/noExplicitAny: can be any
    static log(...msgs: any[]) {
        console.log(`[${chalk.greenBright("*")}]`, ...msgs);
    }

    // biome-ignore lint/suspicious/noExplicitAny: can be any
    static warn(...msgs: any[]) {
        console.log(`[${chalk.yellowBright("?")}]`, ...msgs);
    }

    // biome-ignore lint/suspicious/noExplicitAny: can be any
    static error(...msgs: any[]) {
        console.log(`[${chalk.redBright("!")}]`, ...msgs);
    }
}