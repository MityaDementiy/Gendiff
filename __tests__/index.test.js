import path from 'path';
import fs from 'fs';
import genDiff from '../src';


const testDir = './__tests__/__fixtures__';
const beforeJson = path.resolve(testDir, 'before.json');
const afterJson = path.resolve(testDir, 'after.json');
const beforeYml = path.resolve(testDir, 'before.yml');
const afterYml = path.resolve(testDir, 'after.yml');
const expectedResultFlatJsonAndYml = fs.readFileSync(path.resolve(testDir, 'expectedFlatJson'), 'utf-8');

test('genDiff with flat Json', () => {
  expect(genDiff(beforeJson, afterJson)).toEqual(expectedResultFlatJsonAndYml);
});

test('genDiff with flat Yaml', () => {
  expect(genDiff(beforeYml, afterYml)).toEqual(expectedResultFlatJsonAndYml);
});
