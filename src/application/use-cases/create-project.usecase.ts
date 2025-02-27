import path from 'path';
import { FileSystemService } from '../../domain/services/file-system.service.js';
import { CommandExecutorService } from '../../domain/services/command-executor.service.js';
import { ChalkLogger } from '../../plugins/chalk-logger.plugin.js';

export class CreateProjectUseCase {
    constructor(private fileSystemService: FileSystemService, private commandExecutorService: CommandExecutorService) {}

    async execute(projectName: string, selectedTemplate: string) {
        try {
            const templatePath = path.join(import.meta.dirname, '..', '..', '..', 'templates', selectedTemplate);
            const projectPath = path.join(process.cwd(), projectName);

            ChalkLogger.info(`Creating project directory.`);

            await this.fileSystemService.createProjectDirectory(projectPath);

            ChalkLogger.info(`Creating project ${projectName} from template ${selectedTemplate}.`);

            await this.fileSystemService.replicateTemplate(templatePath, projectPath);
            await this.fileSystemService.editJSONFile(projectPath, 'package.json', projectName, ['name']);
            await this.fileSystemService.editJSONFile(projectPath, 'app.json', projectName, ['expo.name', 'expo.slug']);
            await this.fileSystemService.createTypeDeclarationFile(
                projectPath,
                'expo-env.d.ts',
                `/// <reference types="expo/types" />
            // NOTE: This file should not be edited and should be in your git ignore`
            );
            await this.fileSystemService.createTypeDeclarationFile(projectPath, 'nativewind-env.d.ts', `/// <reference types="nativewind/types" />`);

            ChalkLogger.info('Installing dependencies...');
            await this.commandExecutorService.runNpmInstall(projectPath);
            ChalkLogger.success(`Project ${projectName} created succesfully.`);
        } catch (error) {
            ChalkLogger.error(error);
        }
    }
}
