import { execa } from 'execa';
import { CommandExecutorService } from '../../domain/services/command-executor.service.js';

export class CommandExecutorServiceImplementation implements CommandExecutorService {
    async runNpmInstall(projectPath: string): Promise<void> {
        await execa('npm', ['install'], { cwd: projectPath, stdio: 'inherit' });
    }
}
