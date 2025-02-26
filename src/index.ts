#!/usr/bin/env node
import { input, select } from '@inquirer/prompts';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs/promises';
import { execa } from 'execa';

(async () => {
    await main();
})();

//TODO:Refactor code

async function replicateTemplate(templatePath: string, projectPath: string) {
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
                await replicateTemplate(originPath, destinationPath);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function main() {
    try {
        const projectName = await input({
            message: 'Enter the name of your app',
            required: true,
        });

        const selectedTemplate = await select({
            message: 'Select a template',
            choices: [
                {
                    name: 'nativewind',
                    value: 'nativewind',
                    description: 'Expo with nativewind configured with dark and light theme',
                },
            ],
        });

        //TODO: Cambiar esto a un proyecto de git?

        const templatePath = path.join(import.meta.dirname, '..', 'templates', selectedTemplate);

        const projectPath = path.join(process.cwd(), projectName);
        try {
            await fs.mkdir(projectPath);
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
                console.log(chalk.red(`The project directory already exists`));
            } else {
                console.log(chalk.red(`Error creating project directory ${error}`));
            }
        }
        console.log(chalk.green(`Creating project ${projectName} from template ${selectedTemplate}`));
        await replicateTemplate(templatePath, projectPath);

        const packageJSON = await fs.readFile(path.join(projectPath, 'package.json'), 'utf-8');
        const packageJSONToJSON = JSON.parse(packageJSON);
        packageJSONToJSON.name = projectName.toLowerCase().replace(/\s+/g, '-');

        await fs.writeFile(path.join(projectPath, 'package.json'), JSON.stringify(packageJSONToJSON, null, 2));

        const appJSON = await fs.readFile(path.join(projectPath, 'app.json'), 'utf-8');
        const appJSONToJSON = JSON.parse(appJSON);
        appJSONToJSON.expo.name = projectName.toLowerCase().replace(/\s+/g, '-');
        appJSONToJSON.expo.slug = projectName.toLowerCase().replace(/\s+/g, '-');

        await fs.writeFile(path.join(projectPath, 'app.json'), JSON.stringify(appJSONToJSON, null, 2));

        await fs.writeFile(
            path.join(projectPath, 'expo-env.d.ts'),
            `/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore`
        );

        await fs.writeFile(path.join(projectPath, 'nativewind-env.d.ts'), `/// <reference types="nativewind/types" />`);

        console.log(chalk.green(`Installing dependencies...`));
        await execa('npm', ['install'], { cwd: projectPath, stdio: 'inherit' });

        console.log(chalk.green(`Project ${projectName} created succesfully.`));
    } catch (error) {
        console.log('Error: ', error);
    }
}
