export interface CommandExecutorService {
    runNpmInstall(projectPath: string): Promise<void>;
}
