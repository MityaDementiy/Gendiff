import fs from 'fs';
import genDiff from '../src';

const testDir = './__tests__/__fixtures__';
const getDataFromFile = (fileName) => fs.readFileSync(`${testDir}/${fileName}`, 'utf-8');
const expectedFlat = getDataFromFile('expectedFlat');
const expectedNested = getDataFromFile('expectedNested');
const expectedFlatPlain = getDataFromFile('expectedFlatPlain');
const expectedNestedPlain = getDataFromFile('expectedPlain');
const expectedNestedJson = getDataFromFile('expectedJson');
const flatJsonConfigs = [`${testDir}/before.json`, `${testDir}/after.json`];
const flatYmlConfigs = [`${testDir}/before.yml`, `${testDir}/after.yml`];
const flatIniConfigs = [`${testDir}/before.ini`, `${testDir}/after.ini`];
const nestedJsonConfigs = [`${testDir}/beforeNested.json`, `${testDir}/afterNested.json`];
const nestedYmlConfigs = [`${testDir}/beforeNested.yml`, `${testDir}/afterNested.yml`];
const nestedIniConfigs = [`${testDir}/beforeNested.ini`, `${testDir}/afterNested.ini`];

const configsToTest = [
  [...flatJsonConfigs, expectedFlat],
  [...flatYmlConfigs, expectedFlat],
  [...flatIniConfigs, expectedFlat],
  [...nestedJsonConfigs, expectedNested],
  [...nestedYmlConfigs, expectedNested],
  [...nestedIniConfigs, expectedNested],
  [...flatJsonConfigs, expectedFlatPlain, 'plain'],
  [...nestedJsonConfigs, expectedNestedPlain, 'plain'],
  [...nestedJsonConfigs, expectedNestedJson, 'json'],
];

test.each(configsToTest)('test genDiff', (beforeFileContent, afterFileContent, expected, format = 'default') => {
  expect(genDiff(beforeFileContent, afterFileContent, format)).toEqual(expected);
});
