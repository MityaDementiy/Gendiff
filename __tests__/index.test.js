import fs from 'fs';
import genDiff from '../src';

const testDir = './__tests__/__fixtures__';
const expectedFlat = fs.readFileSync(`${testDir}/expectedFlat`, 'utf-8');
const expectedNested = fs.readFileSync(`${testDir}/expectedNested`, 'utf-8');
const flatJsonConfigs = [`${testDir}/before.json`, `${testDir}/after.json`];
const flatYmlConfigs = [`${testDir}/before.yml`, `${testDir}/after.yml`];
const flatIniConfigs = [`${testDir}/before.ini`, `${testDir}/after.ini`];
const nestedJsonConfigs = [`${testDir}/beforeNested.json`, `${testDir}/afterNested.json`];
const nestedYmlConfigs = [`${testDir}/beforeNested.yml`, `${testDir}/afterNested.yml`];
const nestedIniConfigs = [`${testDir}/beforeNested.ini`, `${testDir}/afterNested.ini`];

const configsToTestDefaultOutput = [
  [...flatJsonConfigs, expectedFlat],
  [...flatYmlConfigs, expectedFlat],
  [...flatIniConfigs, expectedFlat],
  [...nestedJsonConfigs, expectedNested],
  [...nestedYmlConfigs, expectedNested],
  [...nestedIniConfigs, expectedNested],
];

const configsToTestFormattedOutput = [
  [...flatJsonConfigs, fs.readFileSync(`${testDir}/expectedFlatPlain`, 'utf-8'), 'plain'],
  [...nestedJsonConfigs, fs.readFileSync(`${testDir}/expectedPlain`, 'utf-8'), 'plain'],
  [...nestedJsonConfigs, fs.readFileSync(`${testDir}/expectedJson`, 'utf-8'), 'json'],
];

test.each(configsToTestDefaultOutput)('test genDiff with default output', (beforeFileContent, afterFileContent, expected) => {
  expect(genDiff(beforeFileContent, afterFileContent)).toEqual(expected);
});

test.each(configsToTestFormattedOutput)('test genDiff with formatted output', (beforeFileContent, afterFileContent, expected, format) => {
  expect(genDiff(beforeFileContent, afterFileContent, format)).toEqual(expected);
});
