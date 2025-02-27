import { Choice, PromptService } from '../domain/services/prompt.service.js';
import { CreateProjectUseCase } from '../application/use-cases/create-project.usecase.js';
import { GatherProjectInfoUseCase } from '../application/use-cases/gather-project-info.usecase.js';

export class App {
    private templateChoices: Choice[] = [
        {
            name: 'nativewind',
            value: 'nativewind',
            description: 'Expo with nativewind configured with dark and light theme',
        },
    ];

    constructor(private gatherProjectInfoUseCase: GatherProjectInfoUseCase, private createProjectUseCase: CreateProjectUseCase) {}

    async start() {
        const { projectName, selectedTemplate } = await this.gatherProjectInfoUseCase.execute(this.templateChoices);
        await this.createProjectUseCase.execute(projectName, selectedTemplate);
    }
}
