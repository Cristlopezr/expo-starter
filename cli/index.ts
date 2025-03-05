#!/usr/bin/env node

import { CreateProjectUseCase } from './application/use-cases/create-project.usecase.js';
import { GatherProjectInfoUseCase } from './application/use-cases/gather-project-info.usecase.js';
import { CommandExecutorServiceImplementation } from './infrastructure/services/command-executor.impl.service.js';
import { FileSystemServiceImplementation } from './infrastructure/services/file-system.impl.service.js';
import { PromptServiceImplementation } from './infrastructure/services/prompt-inquirer.service.js';
import { App } from './presentation/app.js';

const promptService = new PromptServiceImplementation();
const gatherProjectInfoUseCase = new GatherProjectInfoUseCase(promptService);
const fileSystemService = new FileSystemServiceImplementation();
const commandExecutorService = new CommandExecutorServiceImplementation();
const createProjectUseCase = new CreateProjectUseCase(fileSystemService, commandExecutorService);
const app = new App(gatherProjectInfoUseCase, createProjectUseCase);

async function main() {
    app.start();
}

(async () => {
    await main();
})();
