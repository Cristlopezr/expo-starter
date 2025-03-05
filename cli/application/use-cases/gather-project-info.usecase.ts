import { LoggerService } from '../../domain/services/logger.service.js';
import { Choice, PromptService } from '../../domain/services/prompt.service.js';

export class GatherProjectInfoUseCase {
    constructor(private promptService: PromptService, private logger: LoggerService) {}

    async execute(templateChoices: Choice[]) {
        try {
            const projectName = await this.promptService.askProjectName('Enter the name of your app', { required: true });
            const selectedTemplate = await this.promptService.selectTemplate('Select a template', templateChoices);

            return {
                projectName,
                selectedTemplate,
            };
        } catch (error: any) {
            if (error.isTtyError) {
                this.logger.error('Prompt could not be rendered in the current environment.');
                process.exit(1);
            } else if (error.message.includes('User force closed')) {
                this.logger.info("Prompt canceled. You can restart the process whenever you're ready.");
                process.exit(0);
            } else {
                this.logger.error(`An unexpected error occurred: ${error.message}`);
                process.exit(1);
            }
        }
    }
}
