/*
 * @Author       : fallen_zero
 * @Date         : 2023-09-26 14:53:49
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2023-09-26 15:22:12
 * @FilePath     : /zero-cli/utils/getPackage.js
 * @FileName     :
 */
import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getJson = (_url) => {
  try {
    const json = fs.readFileSync(resolve(__dirname, _url));
    const packageJson = JSON.parse(json);
    return packageJson || {};
  } catch (error) {
    return {};
  }
};

export default getJson('../package.json');
