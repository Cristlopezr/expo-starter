import chalk from 'chalk';

export class ChalkLogger {
    static error(...args: unknown[]) {
        console.log(chalk.red(...args));
    }
    static warn(...args: unknown[]) {
        console.log(chalk.yellow(...args));
    }
    static info(...args: unknown[]) {
        console.log(chalk.cyan(...args));
    }
    static success(...args: unknown[]) {
        console.log(chalk.green(...args));
    }
}
