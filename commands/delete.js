#!/usr/bin/env node

import { Chalk } from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import symbols from 'log-symbols';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { getJson } from '../utils/getPackage.js';
import { showTable } from '../utils/showTable.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const chalk = new Chalk({ level: 1 });

// 模板目录
const templateList = getJson('../template.json');

// 问题
const question = [
  {
    name: 'name',
    message: '请输入要删除的模块名称',
    validate: function (value) {
      if (!value) {
        return chalk.red('name is required!');
      }
      if (!templateList[value]) {
        return chalk.red('Template does not exist!');
      }
      return true;
    },
  },
];

// 删除
inquirer.prompt(question).then((answers) => {
  const { name } = answers;
  delete templateList[name];
  fs.writeFile(
    resolve(__dirname, '../template.json'),
    JSON.stringify(templateList),
    'utf-8',
    (err) => {
      if (err) console.log(chalk.red(symbols.error), chalk.red(err));
      console.log('\n');
      console.log(
        chalk.green(symbols.success),
        chalk.green('Deleted successfully!\n')
      );
      console.log(chalk.green('The latest templateList is:\n'));
      showTable(templateList);
      process.exit();
    }
  );
});
