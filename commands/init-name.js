#!/usr/bin/env node

import { Chalk } from 'chalk';
import { exec } from 'child_process';
import { program } from 'commander';
import symbols from 'log-symbols';
import ora from 'ora';
import { getJson } from '../utils/getPackage.js';

const chalk = new Chalk({ level: 1 });

program.usage('<template-name> [project-name]');
program.parse(process.argv);

const initTemplate = () => {
  // 当没有输入参数的时候给个提示
  if (program.args.length < 2) {
    return program.help();
  }

  // 第一个参数 为模板名称, 第二个参数 为项目名称
  const templateName = program.args[1];
  const projectName = program.args[2];

  console.log(templateName, projectName);

  // 获取模板列表
  const templateList = getJson('../template.json');

  if (!templateList[templateName]) {
    console.log(chalk.red('\n Template does not exit! \n '));
    return;
  }

  if (!projectName) {
    console.log(chalk.red('\n Project should not be empty! \n '));
    return;
  }

  const url = templateList[templateName];
  console.log(url);

  console.log(chalk.green('\n Start generating... \n'));

  // 出现加载图标
  const spinner = ora('Downloading...');
  spinner.start();

  // 从 git 下载到本地指定路径
  exec(`git clone ${url} ${projectName}`, (err, stdout, stderr) => {
    if (err) {
      spinner.fail();
      console.log(
        chalk.red(symbols.error),
        chalk.red(`Generating failed! ${err}`)
      );
      return;
    }
    // 结束加载图标
    spinner.succeed();
    console.log(
      chalk.green(symbols.success),
      chalk.green('Generating completed!')
    );
    console.log('\n To get started');
    console.log(`\n  cd ${projectName} \n`);
  });

  // download(`direct:${url}`, `./${projectName}`, (err) => {
  //   if (err) {
  //     spinner.fail();
  //     console.log(
  //       chalk.red(symbols.error),
  //       chalk.red(`Generating failed! ${err}`)
  //     );
  //     return;
  //   }
  //   // 结束加载图标
  //   spinner.succeed();
  //   console.log(
  //     chalk.green(symbols.success),
  //     chalk.green('Generating completed!')
  //   );
  //   console.log('\n To get started');
  //   console.log(`\n  cd ${projectName} \n`);
  // });
};

initTemplate();
