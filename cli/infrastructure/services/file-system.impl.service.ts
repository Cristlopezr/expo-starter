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

    async copyAssetsFolder(folderPath: string, projectPath: string): Promise<void> {
        await this.replicateTemplate(folderPath, projectPath);
    }

    async editJSONFile(projectPath: string, fileNameWithExtension: string, projectName: string, keysToEdit: string[]): Promise<void> {
        const filePath = path.join(projectPath, fileNameWithExtension);

        try {
            const JSONFile = await fs.readFile(filePath, 'utf-8');
            const JSONFileToJSON = JSON.parse(JSONFile);

            for (let i = 0; i < keysToEdit.length; i++) {
                this.changeValueOfKey(keysToEdit[i].split('.'), JSONFileToJSON, projectName);
            }

            await fs.writeFile(filePath, JSON.stringify(JSONFileToJSON, null, 2));
        } catch (error) {
            throw new Error(`Error editing ${fileNameWithExtension}: ${error}.`);
        }
    }

    async createTypeDeclarationFile(projectPath: string, fileName: string, fileContent: string): Promise<void> {
        try {
            await fs.writeFile(path.join(projectPath, fileName), fileContent);
        } catch (error) {
            throw new Error(`Error creating ${fileName}: ${error}`);
        }
    }

    private changeValueOfKey(keys: string[], obj: any, value: string) {
        if (!obj || typeof obj !== 'object') throw new Error(`Invalid object: ${JSON.stringify(obj, null, 2)}`);

        const key = keys[0];
        if (keys.length === 1) {
            obj[key] = value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            return;
        }

        if (!(key in obj)) {
            throw new Error(`Key '${key}' does not exist in ${JSON.stringify(obj)}`);
        }

        this.changeValueOfKey(keys.slice(1), obj[key!], value);
    }
}
