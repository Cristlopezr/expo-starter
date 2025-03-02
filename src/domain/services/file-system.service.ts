export interface FileSystemService {
    createProjectDirectory(path: string): Promise<void>;
    replicateTemplate(templatePath: string, projectPath: string): Promise<void>;
    editJSONFile(projectPath: string, fileNameWithExtension: string, projectName: string, keysToEdit: string[]): Promise<void>;
    createTypeDeclarationFile(projectPath: string, fileName: string, fileContent: string): Promise<void>;
}
