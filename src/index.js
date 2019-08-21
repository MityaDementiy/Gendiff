import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const testDir = '../__tests__/__fixtures__';
const beforeJson = path.join(testDir, 'before.json');
const afterJson = path.join(testDir, 'after.json');

const getDiff = (firstFileContent, secondFileContent) => {
  const firstKeys = Object.keys(firstFileContent);
  const secondKeys = Object.keys(secondFileContent);
  const sharedKeys = firstKeys.filter((key) => _.has(secondFileContent, key));
  const beforeOnlyKeys = firstKeys.filter((key) => !_.has(secondFileContent, key));
  const afterOnlyKeys = secondKeys.filter((key) => !_.has(firstFileContent, key));
  const sharedEqualKeys = sharedKeys.filter((key) => firstFileContent[key] === secondFileContent[key]);
  const sharedChangedKeys = sharedKeys.filter((key) => firstFileContent[key] !== secondFileContent[key]);
  const str = '';
  const whiteSpace = ' ';
  const tab = ' ';
  const beforeOnlyToString = beforeOnlyKeys.reduce(
    (acc, key) => `${acc} ${tab}- ${key}: ${firstFileContent[key]}\n`, str
  );
  const afterOnlyToString = afterOnlyKeys.reduce(
    (acc, key) => `${acc} ${tab}+ ${key}: ${secondFileContent[key]}\n`, str
  );
  const sharedEqualKeysToString = sharedEqualKeys.reduce(
    (acc, key) => `${acc} ${tab}${whiteSpace} ${key}: ${secondFileContent[key]}\n`, str);
  
  const sharedChangedKeysToString = sharedChangedKeys.reduce(
    (acc, key) => `${acc} ${tab}+ ${key}: ${secondFileContent[key]}\n ${tab}- ${key}: ${firstFileContent[key]}\n`, str);
  const result = `
    {
    ${sharedEqualKeysToString}
    ${sharedChangedKeysToString}
    ${beforeOnlyToString}
    ${afterOnlyToString}
    }
  `;
  return result;
};

export default (pathTofirstFile = beforeJson, pathToSecondFile = afterJson) => {
  const beforeFileContent = JSON.parse(fs.readFileSync(pathTofirstFile, 'utf-8'));
  const afterFileContent = JSON.parse(fs.readFileSync(pathToSecondFile, 'utf-8'));
  return getDiff(beforeFileContent, afterFileContent);
};
