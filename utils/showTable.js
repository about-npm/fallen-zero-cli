/*
 * @Author       : fallen_zero
 * @Date         : 2023-09-26 14:18:16
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-09-26 15:35:28
 * @FilePath     : /zero-cli/utils/showTable.js
 * @FileName     :
 */

import Table from 'cli-table';

export function showTable(tempList) {
  const list = Object.entries(tempList);

  const table = new Table({
    head: ['name', 'url'],
    style: {
      head: ['green'],
    },
  });

  if (list.length > 0) {
    list.forEach(([name, url]) => {
      table.push([name, url]);
    });
  }
  console.log(table.toString());
}

export function showNameTable(tempList) {
  const list = Object.entries(tempList);

  const table = new Table({
    head: ['name'],
    style: {
      head: ['green'],
    },
  });

  if (list.length > 0) {
    list.forEach(([name]) => {
      table.push([name]);
    });
  }
  console.log(table.toString());
}
