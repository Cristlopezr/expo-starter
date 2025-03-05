import { input, select } from '@inquirer/prompts';
import { Choice, Options, PromptService } from '../../domain/services/prompt.service.js';

export class PromptServiceImplementation implements PromptService {
    async askProjectName(message: string, options: Options) {
        try {
            const { required } = options;
            return await input({
                message,
                required,
            });
        } catch (error) {
            throw error;
        }
    }
    async selectTemplate(message: string, choices: Choice[]) {
        try {
            return await select({
                message,
                choices,
            });
        } catch (error) {
            throw error;
        }
    }
}
