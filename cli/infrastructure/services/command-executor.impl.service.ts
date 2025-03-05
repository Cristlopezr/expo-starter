import { execa } from 'execa';
import { CommandExecutorService } from '../../domain/services/command-executor.service.js';

export class CommandExecutorServiceImplementation implements CommandExecutorService {
    private controller: AbortController;
    private abortSignal: AbortSignal;

    constructor() {
        this.controller = new AbortController();
        this.abortSignal = this.controller.signal;
        this.setupSignalHandler();
    }
    async runNpmInstall(projectPath: string): Promise<void> {
        try {
            await execa({
                cwd: projectPath,
                cancelSignal: this.abortSignal,
                gracefulCancel: true,
                stdio: 'inherit',
            })`npm install`;
        } catch (error) {
            throw error;
        }
    }

    private setupSignalHandler() {
        process.on('SIGINT', () => {
            this.controller.abort();
        });
    }
}
