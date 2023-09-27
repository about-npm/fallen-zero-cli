#!/usr/bin/env node

// 声明全局对象 program 变量(Commander 提供了一个全局对象)
import { program } from 'commander';
// 引入 package
import pkg, { getJson } from '../utils/getPackage.js';
import { showNameTable } from '../utils/showTable.js';
import { Chalk } from 'chalk';

const chalk = new Chalk({ level: 1 });

// 定义脚手架的用户, 在 program.help 方法中会显示
program.usage('<command>');

// 获取 package.json 中的 version 来作为项目的版本号
program.version(pkg.version);

// add 新增一个项目模板
program
  .command('add')
  .description('add a new template')
  .action(() => {
    import('../commands/add.js');
  });

// delete 删除项目模板
program
  .command('delete')
  .description('delete a template')
  .action(() => {
    console.log(chalk.cyan('当前模板列表:'));
    showNameTable(getJson('../template.json'));
    console.log('\n');
    import('../commands/delete.js');
  });

// list 列举所有项目模板
program
  .command('list')
  .description('list all templates')
  .action(() => {
    import('../commands/list.js');
  });

// init 初始化一个项目模板
program
  .command('init')
  .description('init a template')
  .action(() => {
    import('../commands/init.js');
  });

// 处理参数, 没有被使用的选项会被存放在 program.args 数组中
program.parse(process.argv);

// 如果有选项被放在 program.args, 即没有被 program.parse 处理, 则默认使用 program.help() 将 npm 包可以执行的命令打印出来
// 可以通过 program.on('--help', function() {}) 来定义 help
// if (program.args.length) {
//   program.help();
// }

/*
command 为执行的命令
description 为命令的描述
alias 为简写
action 为命令相应的操作
*/
