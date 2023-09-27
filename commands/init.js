#!/usr/bin/env node

import { Chalk } from 'chalk';
import { exec } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';
import symbols from 'log-symbols';
import ora from 'ora';
import { resolve } from 'path';
import { getJson } from '../utils/getPackage.js';

const chalk = new Chalk({ level: 1 });

const cwd = process.cwd();

// 出现加载图标
const spinner = ora('Downloading...');

// 模板目录
const templateList = getJson('../template.json');

const question = [
  {
    name: 'projectTemplate',
    message: '请选择项目模板:',
    type: 'list',
    choices: Object.keys(templateList),
  },
  {
    name: 'projectName',
    message: '请输入项目名称:',
    type: 'input',
    validate(val) {
      if (!val) {
        return chalk.red('projectName is required!');
      }
      return true;
    },
  },
];

inquirer.prompt(question).then((answers) => {
  const { projectTemplate, projectName } = answers;
  const targetDir = resolve(cwd, projectName);
  if (fs.existsSync(targetDir)) {
    console.log(chalk.bgRed('当前路径已存在同名目录，请确定后再试'));
    process.exit();
  }

  spinner.start();

  // 从 git 下载到本地指定路径
  exec(
    `git clone ${templateList[projectTemplate]} ${projectName}`,
    (err, stdout, stderr) => {
      if (err) {
        spinner.fail();
        console.log(
          chalk.red(symbols.error),
          chalk.red(`Generating failed! ${err}`)
        );
        return;
      }
      fs.rm(resolve(targetDir, '.git'), { recursive: true }, () => {
        // 结束加载图标
        spinner.succeed();
        console.log(
          chalk.green(symbols.success),
          chalk.green('Generating completed!')
        );
        console.log('\n To get started');
        console.log(`\n  cd ${projectName}`);
        console.log(`  pnpm install \n`);
      });
    }
  );
});
