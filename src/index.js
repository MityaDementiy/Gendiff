import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const testDir = '../__tests__/__fixtures__';
const beforeJson = path.resolve(testDir, 'before.json');
const afterJson = path.resolve(testDir, 'after.json');

const getDiff = (firstFileContent, secondFileContent) => {
  const firstKeys = Object.keys(firstFileContent);
  const secondKeys = Object.keys(secondFileContent);
  const sharedKeys = firstKeys.filter((key) => _.has(secondFileContent, key));
  const beforeOnlyKeys = firstKeys.filter((key) => !_.has(secondFileContent, key));
  const afterOnlyKeys = secondKeys.filter((key) => !_.has(firstFileContent, key));
  const sharedEqualKeys = sharedKeys.filter(
    (key) => firstFileContent[key] === secondFileContent[key],
  );
  const sharedChangedKeys = sharedKeys.filter(
    (key) => firstFileContent[key] !== secondFileContent[key],
  );
  const beforeOnlyArray = beforeOnlyKeys.map((key) => `  - ${key}: ${firstFileContent[key]}`);
  const afterOnlyArray = afterOnlyKeys.map((key) => `  + ${key}: ${secondFileContent[key]}`);
  const sharedEqualArray = sharedEqualKeys.map((key) => `    ${key}: ${firstFileContent[key]}`);
  const sharedChangedArray = sharedChangedKeys.map((key) => `  + ${key}: ${secondFileContent[key]}\n  - ${key}: ${firstFileContent[key]}`);
  const beforeOnlyToString = beforeOnlyArray.join('\n');
  const afterOnlyToString = afterOnlyArray.join('\n');
  const sharedEqualKeysToString = sharedEqualArray.join('\n');
  const sharedChangedKeysToString = sharedChangedArray.join('\n');
  const stringifyedResult = [sharedEqualKeysToString, sharedChangedKeysToString, beforeOnlyToString, afterOnlyToString].join('\n');
  const result = `{\n${stringifyedResult}\n}`;
  return result;
};

export default (firstConfig = beforeJson, secondConfig = afterJson) => {
  const beforeFileContent = JSON.parse(fs.readFileSync(firstConfig, 'utf-8'));
  const afterFileContent = JSON.parse(fs.readFileSync(secondConfig, 'utf-8'));
  return getDiff(beforeFileContent, afterFileContent);
};
