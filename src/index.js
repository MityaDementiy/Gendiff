import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseFile from './parsers';
import render from './formatters/renderers';

const getType = (key, firstObj, secondObj) => {
  if (_.isObject(firstObj[key]) && _.isObject(secondObj[key])) {
    return 'parent';
  }
  if (_.has(firstObj, key) && !_.has(secondObj, key)) {
    return 'deleted';
  }
  if (!_.has(firstObj, key) && _.has(secondObj, key)) {
    return 'added';
  }
  if (_.has(firstObj, key) && _.has(secondObj, key) && firstObj[key] === secondObj[key]) {
    return 'unchanged';
  }
  if (_.has(firstObj, key) && _.has(secondObj, key) && firstObj[key] !== secondObj[key]) {
    return 'changed';
  }
  return null;
};

const buildNode = (type, key, oldValue, newValue, getDiffFunc) => {
  if (type === 'parent') {
    const children = getDiffFunc(oldValue, newValue);
    return {
      key,
      type,
      children,
    };
  }
  return {
    key,
    type,
    oldValue,
    newValue,
  };
};

const getDiff = (firstConfig, secondConfig) => {
  const firstKeys = Object.keys(firstConfig);
  const secondKeys = Object.keys(secondConfig);
  const unitedKeys = _.union(firstKeys, secondKeys);
  const innerStructure = unitedKeys.map((key) => {
    const type = getType(key, firstConfig, secondConfig);
    const oldValue = firstConfig[key];
    const newValue = secondConfig[key];
    const node = buildNode(type, key, oldValue, newValue, getDiff);
    return node;
  });
  return innerStructure;
};

export default (firstConfig, secondConfig, format) => {
  const firstExtName = path.extname(firstConfig);
  const secondExtName = path.extname(secondConfig);
  const beforeFileContent = parseFile(fs.readFileSync(firstConfig, 'utf-8'), firstExtName);
  const afterFileContent = parseFile(fs.readFileSync(secondConfig, 'utf-8'), secondExtName);
  const result = render(getDiff(beforeFileContent, afterFileContent), format);
  return result;
};
