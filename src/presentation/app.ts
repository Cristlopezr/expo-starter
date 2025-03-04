import { Choice, PromptService } from '../domain/services/prompt.service.js';
import { CreateProjectUseCase } from '../application/use-cases/create-project.usecase.js';
import { GatherProjectInfoUseCase } from '../application/use-cases/gather-project-info.usecase.js';

export class App {
    private templateChoices: Choice[] = [
        {
            name: 'Nativewind',
            value: 'nativewind',
            description: 'Expo project preconfigured with NativeWind and support for dark and light themes.',
        },
        {
            name: 'React native paper',
            value: 'native-paper',
            description: 'Expo project preconfigured with React Native Paper and support for dark and light themes.',
        },
    ];

    constructor(private gatherProjectInfoUseCase: GatherProjectInfoUseCase, private createProjectUseCase: CreateProjectUseCase) {}

    async start() {
        const { projectName, selectedTemplate } = await this.gatherProjectInfoUseCase.execute(this.templateChoices);
        await this.createProjectUseCase.execute(projectName, selectedTemplate);
    }
}
