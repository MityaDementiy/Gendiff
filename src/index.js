import fs from 'fs';
import _ from 'lodash';

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
  const beforeOnlyToStr = beforeOnlyArray.join('\n');
  const afterOnlyToStr = afterOnlyArray.join('\n');
  const sharedEqualKeysToStr = sharedEqualArray.join('\n');
  const sharedChangedKeysToStr = sharedChangedArray.join('\n');
  const dataToStr = [beforeOnlyToStr, afterOnlyToStr, sharedChangedKeysToStr, sharedEqualKeysToStr];
  const stringifyedFilteredResult = dataToStr.filter((el) => el.length >= 1);
  const result = `{\n${stringifyedFilteredResult.join('\n')}\n}`;
  return result;
};

export default (firstConfig, secondConfig) => {
  const beforeFileContent = JSON.parse(fs.readFileSync(firstConfig, 'utf-8'));
  const afterFileContent = JSON.parse(fs.readFileSync(secondConfig, 'utf-8'));
  return getDiff(beforeFileContent, afterFileContent);
};
