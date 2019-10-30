import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters/index';

const typeActions = [
  {
    type: 'parent',
    check: (key, objBefore, objAfter) => _.isObject(objBefore[key]) && _.isObject(objAfter[key]),
    process: (oldValue, newValue, getDiffFunc) => ({ children: getDiffFunc(oldValue, newValue) }),
  },
  {
    type: 'deleted',
    check: (key, objBefore, objAfter) => _.has(objBefore, key) && !_.has(objAfter, key),
    process: (oldValue, newValue) => ({ oldValue, newValue }),
  },
  {
    type: 'added',
    check: (key, objBefore, objAfter) => !_.has(objBefore, key) && _.has(objAfter, key),
    process: (oldValue, newValue) => ({ oldValue, newValue }),
  },
  {
    type: 'unchanged',
    check: (key, objBefore, objAfter) => objBefore[key] === objAfter[key],
    process: (oldValue, newValue) => ({ oldValue, newValue }),
  },
  {
    type: 'changed',
    check: (key, objBefore, objAfter) => objBefore[key] !== objAfter[key],
    process: (oldValue, newValue) => ({ oldValue, newValue }),
  },
];

const getTypeActions = (key, objBefore, objAfter) => typeActions
  .find(({ check }) => check(key, objBefore, objAfter));

const getDiff = (beforeConfig, afterConfig) => {
  const beforeConfigKeys = Object.keys(beforeConfig);
  const afterConfigKeys = Object.keys(afterConfig);
  const unitedKeys = _.union(beforeConfigKeys, afterConfigKeys);
  const diffStructure = unitedKeys.map((key) => {
    const { type, process } = getTypeActions(key, beforeConfig, afterConfig);
    const oldValue = beforeConfig[key];
    const newValue = afterConfig[key];
    const node = { key, type, ...process(oldValue, newValue, getDiff) };
    return node;
  });
  return diffStructure;
};

const getDataType = (config) => {
  const type = path.extname(config);
  switch (type) {
    case '.yml':
      return 'yml';
    case '.ini':
      return 'ini';
    case '.json':
      return 'json';
    default:
      throw new Error('Error! Can not process this data type or this data type is invalid');
  }
};

export default (beforeConfig, afterConfig, format) => {
  const beforeDataType = getDataType(beforeConfig);
  const afterDataType = getDataType(afterConfig);
  const beforeFileContent = parse(fs.readFileSync(beforeConfig, 'utf-8'), beforeDataType);
  const afterFileContent = parse(fs.readFileSync(afterConfig, 'utf-8'), afterDataType);
  const result = render(getDiff(beforeFileContent, afterFileContent), format);
  return result;
};
