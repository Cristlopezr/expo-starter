export interface Options {
    required: boolean;
}

export interface Choice {
    name: string;
    value: string;
    description: string;
}

export interface PromptService {
    askProjectName(message: string, options: Options): Promise<string>;

    selectTemplate(message: string, choices: Choice[]): Promise<string>;
}
