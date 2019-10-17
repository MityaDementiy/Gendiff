import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const testDir = './__tests__/__fixtures__';

const flatConfigsToTest = [
  [path.resolve(testDir, 'before.json'), path.resolve(testDir, 'after.json')],
  [path.resolve(testDir, 'before.yml'), path.resolve(testDir, 'after.yml')],
  [path.resolve(testDir, 'before.ini'), path.resolve(testDir, 'after.ini')],
];

const nestedConfigsToTest = [
  [path.resolve(testDir, 'beforeNested.json'), path.resolve(testDir, 'afterNested.json')],
  [path.resolve(testDir, 'beforeNested.yml'), path.resolve(testDir, 'afterNested.yml')],
  [path.resolve(testDir, 'beforeNested.ini'), path.resolve(testDir, 'afterNested.ini')],
];

test.each(flatConfigsToTest)('test genDiff with flat configs', (beforeFileContent, afterFileContent) => {
  expect(genDiff(beforeFileContent, afterFileContent)).toEqual(fs.readFileSync(path.resolve(testDir, 'expectedFlatJson'), 'utf-8'));
});

test.each(nestedConfigsToTest)('test genDiff with nested configs and formatted output', (beforeFileContent, afterFileContent) => {
  expect(genDiff(beforeFileContent, afterFileContent)).toEqual(fs.readFileSync(path.resolve(testDir, 'expectedNested'), 'utf-8'));
  expect(genDiff(beforeFileContent, afterFileContent, 'plain')).toEqual(fs.readFileSync(path.resolve(testDir, 'expectedPlain'), 'utf-8'));
  expect(genDiff(beforeFileContent, afterFileContent, 'json')).toEqual(fs.readFileSync(path.resolve(testDir, 'expectedJson'), 'utf-8'));
});
