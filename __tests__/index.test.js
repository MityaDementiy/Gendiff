import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const testDir = './__tests__/__fixtures__';

const configsToTest = [
  [path.resolve(testDir, 'before.json'), path.resolve(testDir, 'after.json'), fs.readFileSync(path.resolve(testDir, 'expectedFlat'), 'utf-8')],
  [path.resolve(testDir, 'before.yml'), path.resolve(testDir, 'after.yml'), fs.readFileSync(path.resolve(testDir, 'expectedFlat'), 'utf-8')],
  [path.resolve(testDir, 'before.ini'), path.resolve(testDir, 'after.ini'), fs.readFileSync(path.resolve(testDir, 'expectedFlat'), 'utf-8')],
  [path.resolve(testDir, 'beforeNested.json'), path.resolve(testDir, 'afterNested.json'), fs.readFileSync(path.resolve(testDir, 'expectedNested'), 'utf-8')],
  [path.resolve(testDir, 'beforeNested.yml'), path.resolve(testDir, 'afterNested.yml'), fs.readFileSync(path.resolve(testDir, 'expectedNested'), 'utf-8')],
  [path.resolve(testDir, 'beforeNested.ini'), path.resolve(testDir, 'afterNested.ini'), fs.readFileSync(path.resolve(testDir, 'expectedNested'), 'utf-8')],
];

test.each(configsToTest)('test genDiff', (beforeFileContent, afterFileContent, expected) => {
  expect(genDiff(beforeFileContent, afterFileContent)).toEqual(expected);
  expect(genDiff(path.resolve(testDir, 'before.json'), path.resolve(testDir, 'after.json'), 'plain')).toEqual(fs.readFileSync(path.resolve(testDir, 'expectedFlatPlain'), 'utf-8'));
  expect(genDiff(path.resolve(testDir, 'beforeNested.json'), path.resolve(testDir, 'afterNested.json'), 'plain')).toEqual(fs.readFileSync(path.resolve(testDir, 'expectedPlain'), 'utf-8'));
  expect(genDiff(path.resolve(testDir, 'beforeNested.json'), path.resolve(testDir, 'afterNested.json'), 'json')).toEqual(fs.readFileSync(path.resolve(testDir, 'expectedJson'), 'utf-8'));
});
