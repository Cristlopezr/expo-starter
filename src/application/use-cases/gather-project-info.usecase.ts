import { Choice, PromptService } from '../../domain/services/prompt.service.js';

export class GatherProjectInfoUseCase {
    constructor(private promptService: PromptService) {}

    async execute(templateChoices: Choice[]) {
        const projectName = await this.promptService.askProjectName('Enter the name of your app', { required: true });
        const selectedTemplate = await this.promptService.selectTemplate('Select a template', templateChoices);

        return {
            projectName,
            selectedTemplate,
        };
    }
}
