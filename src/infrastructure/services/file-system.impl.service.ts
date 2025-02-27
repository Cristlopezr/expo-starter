import { FileSystemService } from '../../domain/services/file-system.service.js';
import fs from 'fs/promises';
import path from 'path';

export class FileSystemServiceImplementation implements FileSystemService {
    async createProjectDirectory(path: string): Promise<void> {
        try {
            await fs.mkdir(path);
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
                throw new Error('The project directory already exists.');
            } else {
                throw new Error(`Error creating project directory: ${error}.`);
            }
        }
    }

    async replicateTemplate(templatePath: string, projectPath: string): Promise<void> {
        try {
            const templateContentNames = await fs.readdir(templatePath);

            for (const templateContentName of templateContentNames) {
                const originPath = path.join(templatePath, templateContentName);
                const destinationPath = path.join(projectPath, templateContentName);

                const isFile = (await fs.stat(originPath)).isFile();
                const isDirectory = (await fs.stat(originPath)).isDirectory();

                if (isFile) {
                    await fs.copyFile(originPath, destinationPath);
                }

                if (isDirectory) {
                    await fs.mkdir(destinationPath, { recursive: true });
                    await this.replicateTemplate(originPath, destinationPath);
                }
            }
        } catch (error) {
            throw new Error(`Error replicating template: ${error}.`);
        }
    }

    //TODO:Edit this function
    async editJSONFile(projectPath: string, fileNameWithExtention: string, projectName: string, propertiesToEdit: string[]): Promise<void> {
        try {
            const JSONFile = await fs.readFile(path.join(projectPath, fileNameWithExtention), 'utf-8');
            const JSONFileToJSON = JSON.parse(JSONFile);
            for (let i = 0; i < propertiesToEdit.length; i++) {
                if (propertiesToEdit[i].includes('expo')) {
                    JSONFileToJSON.expo[propertiesToEdit[i].split('.')[1]] = projectName.toLowerCase().replace(/\s+/g, '-');
                }
                JSONFileToJSON[propertiesToEdit[i]] = projectName.toLowerCase().replace(/\s+/g, '-');
            }

            await fs.writeFile(path.join(projectPath, fileNameWithExtention), JSON.stringify(JSONFileToJSON, null, 2));
        } catch (error) {
            throw new Error(`Error editing ${fileNameWithExtention}: ${error}.`);
        }
    }

    async createTypeDeclarationFile(projectPath: string, fileName: string, fileContent: string): Promise<void> {
        try {
            await fs.writeFile(path.join(projectPath, fileName), fileContent);
        } catch (error) {
            throw new Error(`Error creating ${fileName}: ${error}`);
        }
    }
}
