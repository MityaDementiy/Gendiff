/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseFile from './parsers';

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

const makeTab = (nestingLevel) => '  '.repeat(nestingLevel);

const stringify = (value, nesting) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const result = keys.map((key) => `${makeTab(nesting + 2)}${key}: ${value[key]}`).join('\n');
    return `{\n${result}\n${makeTab(nesting)}}`;
  }
  return value;
};

const renderDiff = (ast, nesting = 2) => {
  const mappedAst = ast.map((node) => {
    if (node.type === 'parent') {
      return `${makeTab(nesting)}${node.key}: ${stringify(renderDiff(node.children, nesting + 2))}`;
    }
    if (node.type === 'added') {
      return `${makeTab(nesting - 1)}+ ${node.key}: ${stringify(node.newValue, nesting)}`;
    }
    if (node.type === 'deleted') {
      return `${makeTab(nesting - 1)}- ${node.key}: ${stringify(node.oldValue, nesting)}`;
    }
    if (node.type === 'unchanged') {
      return `${makeTab(nesting)}${node.key}: ${stringify(node.oldValue, nesting)}`;
    }
    if (node.type === 'changed') {
      return `${makeTab(nesting - 1)}- ${node.key}: ${stringify(node.oldValue, nesting)}\n${makeTab(nesting - 1)}+ ${node.key}: ${stringify(node.newValue, nesting)}`;
    }
  });
  const result = `{\n${mappedAst.join('\n')}\n${makeTab(nesting - 2)}}`;
  return result;
};

export default (firstConfig, secondConfig) => {
  const firstExtName = path.extname(firstConfig);
  const secondExtName = path.extname(secondConfig);
  const beforeFileContent = parseFile(fs.readFileSync(firstConfig, 'utf-8'), firstExtName);
  const afterFileContent = parseFile(fs.readFileSync(secondConfig, 'utf-8'), secondExtName);
  const result = renderDiff(getDiff(beforeFileContent, afterFileContent));
  return result;
};
