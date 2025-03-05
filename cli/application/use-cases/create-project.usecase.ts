import path from 'path';
import { FileSystemService } from '../../domain/services/file-system.service.js';
import { CommandExecutorService } from '../../domain/services/command-executor.service.js';
import { LoggerService } from '../../domain/services/logger.service.js';

export class CreateProjectUseCase {
    constructor(private fileSystemService: FileSystemService, private commandExecutorService: CommandExecutorService, private logger: LoggerService) {}

    async execute(projectName: string, selectedTemplate: string) {
        try {
            const templatePath = path.join(import.meta.dirname, '..', '..', '..', 'templates', selectedTemplate);
            const projectPath = path.join(process.cwd(), projectName);
            const assetsFolderPath = path.join(import.meta.dirname, '..', '..', '..', 'templates', '_shared');

            this.logger.info(`Creating project directory.`);

            await this.fileSystemService.createProjectDirectory(projectPath);

            this.logger.info(`Creating project ${projectName} from template ${selectedTemplate}.`);
            await this.fileSystemService.copyAssetsFolder(assetsFolderPath, projectPath);
            await this.fileSystemService.replicateTemplate(templatePath, projectPath);
            await this.fileSystemService.editJSONFile(projectPath, 'package.json', projectName, ['name']);
            await this.fileSystemService.editJSONFile(projectPath, 'app.json', projectName, ['expo.name', 'expo.slug']);
            await this.fileSystemService.createTypeDeclarationFile(
                projectPath,
                'expo-env.d.ts',
                `/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore`
            );

            await this.installDependencies(projectPath);
            this.logger.success(`Project ${projectName} created succesfully.`);
            this.logger.info(`Navigate to the ${projectName} directory and run \`npx expo start\` to get started.`);
        } catch (error) {
            this.logger.error(`Failed to create the project: ${error}`);
            process.exit(1);
        }
    }

    private async installDependencies(projectPath: string) {
        try {
            this.logger.info('Installing dependencies...');
            await this.commandExecutorService.runNpmInstall(projectPath);
        } catch (error: any) {
            if (error.isGracefullyCanceled) {
                this.logger.info('\nnpm install process was cancelled by user.');
                process.exit(0);
            } else {
                this.logger.error(`Error in CommandExecutorService: ${error}`);
                process.exit(1);
            }
        }
    }
}
