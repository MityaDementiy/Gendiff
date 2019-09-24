import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseFile from './parsers';

const getType = (key, firstObject, secondObject) => {
  if (_.isObject(firstObject[key]) && _.isObject(secondObject[key])) {
    return 'parent';
  }
  if (_.has(firstObject, key) && !_.has(secondObject, key)) {
    return 'deleted';
  }
  if (!_.has(firstObject, key) && _.has(secondObject, key)) {
    return 'added';
  }
  if (_.has(firstObject, key) && _.has(secondObject, key) && firstObject[key] === secondObject[key]) {
    return 'unchanged';
  }
  if (_.has(firstObject, key) && _.has(secondObject, key) && firstObject[key] !== secondObject[key]) {
    return 'changed';
  }
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

const stringify = (value) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const result = keys.map((key) => `    ${stringify(value[key])}`).join('\n');
    return `{\n  ${result}\n  }`;
  }
  return value;
};

const renderDiff = (ast) => {
  const result = ast.map((node) => {
    if (node.type === 'parent') {
      return `    ${node.key}: ${stringify(renderDiff(node.children))}`;
    }
    if (node.type === 'added') {
      return `  + ${node.key}: ${stringify(node.newValue)}`;
    }
    if (node.type === 'deleted') {
      return `  - ${node.key}: ${stringify(node.oldValue)}`;
    }
    if (node.type === 'unchanged') {
      return `    ${node.key}: ${stringify(node.oldValue)}`;
    }
    if (node.type === 'changed') {
      return `  - ${node.key}: ${stringify(node.oldValue)}\n  + ${node.key}: ${stringify(node.newValue)}`;
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

export default (firstConfig, secondConfig) => {
  const firstExtName = path.extname(firstConfig);
  const secondExtName = path.extname(secondConfig);
  const beforeFileContent = parseFile(fs.readFileSync(firstConfig, 'utf-8'), firstExtName);
  const afterFileContent = parseFile(fs.readFileSync(secondConfig, 'utf-8'), secondExtName);
  const result = renderDiff(getDiff(beforeFileContent, afterFileContent));
  return result;
};
