#!/usr/bin/env node

import { getJson } from '../utils/getPackage.js';
import { showTable } from '../utils/showTable.js';

showTable(getJson('../template.json'));
