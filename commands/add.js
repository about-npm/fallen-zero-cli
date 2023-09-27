#!/usr/bin/env node

import { Chalk } from 'chalk';
import { exec } from 'child_process';
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
    name: 'name', // 问题对应的属性
    type: 'input', // 问题类型为填空题
    message: '请输入模板名称', // 问题描述
    validate: function (value) {
      if (!value) {
        return chalk.red('模板名称不可为空!');
      } else if (templateList[value]) {
        return '模板已存在!';
      } else {
        return true;
      }
    },
  },
  {
    name: 'url',
    type: 'input',
    message: '请输入模板地址',
    validate: function (value) {
      if (!value) {
        return chalk.red('模板地址不可为空!');
      } else {
        return true;
      }
    },
  },
];

// 执行命令
inquirer.prompt(question).then((answers) => {
  const { name, url } = answers;
  // 打印在控制台上
  templateList[name] = url.replace(/[\u0000-\u0019]/g, ''); // 去掉 unicode 字符
  fs.writeFile(
    resolve(__dirname, '../template.json'),
    JSON.stringify(templateList),
    'utf-8',
    (err) => {
      if (err) console.log(chalk.red(symbols.error), chalk.red(err));
      console.log('\n');
      console.log(chalk.green(symbols.success), chalk.green('模板添加成功!\n'));
      console.log(chalk.green('当前模板列表:\n'));
      showTable(templateList);
      process.exit();
    }
  );
  // 从 git 下载到本地指定路径
  exec(
    `git clone ${url} ${resolve(__dirname, `../templates/${name}`)}`,
    (err, stdout, stderr) => {
      // 当有错误时打印出错误并退出操作
      console.log(err ? chalk.red(err) : chalk.green('初始化完成'));
      process.exit(); // 退出这次命令行操作
    }
  );
});
