import { input, select } from '@inquirer/prompts';
import { Choice, Options, PromptService } from '../../domain/services/prompt.service.js';

export class PromptServiceImplementation implements PromptService {
    async askProjectName(message: string, options: Options) {
        const { required } = options;
        return await input({
            message,
            required,
        });
    }
    async selectTemplate(message: string, choices: Choice[]) {
        return await select({
            message,
            choices,
        });
    }
}
