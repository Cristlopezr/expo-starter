import { LoggerService } from '../../domain/services/logger.service.js';
import chalk from 'chalk';

export class LoggerServiceImplementation implements LoggerService {
    error(...args: unknown[]) {
        console.log(chalk.red(...args));
    }
    warn(...args: unknown[]) {
        console.log(chalk.yellow(...args));
    }
    info(...args: unknown[]) {
        console.log(chalk.cyan(...args));
    }
    success(...args: unknown[]) {
        console.log(chalk.green(...args));
    }
}
