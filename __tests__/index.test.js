import path from 'path';
import fs from 'fs';
import genDiff from '../src';


const testDir = './__tests__/__fixtures__';
const beforeJson = path.resolve(testDir, 'before.json');
const afterJson = path.resolve(testDir, 'after.json');
const beforeYml = path.resolve(testDir, 'before.yml');
const afterYml = path.resolve(testDir, 'after.yml');
const beforeIni = path.resolve(testDir, 'before.ini');
const afterIni = path.resolve(testDir, 'after.ini');
const beforeNestedJson = path.resolve(testDir, 'beforeNested.json');
const afterNestedJson = path.resolve(testDir, 'afterNested.json');
const beforeNestedYml = path.resolve(testDir, 'beforeNested.yml');
const afterNestedYml = path.resolve(testDir, 'afterNested.yml');
const beforeNestedIni = path.resolve(testDir, 'beforeNested.ini');
const afterNestedIni = path.resolve(testDir, 'afterNested.ini');

const expectedResult = fs.readFileSync(path.resolve(testDir, 'expectedFlatJson'), 'utf-8');
const expectedNested = fs.readFileSync(path.resolve(testDir, 'expectedNested'), 'utf-8');
const filesToTest = [[beforeJson, afterJson], [beforeYml, afterYml], [beforeIni, afterIni]];

test.each(filesToTest)('test genDiff', (firstFile, secondFile) => {
  expect(genDiff(firstFile, secondFile)).toEqual(expectedResult);
});

test('gendiff with nested json', () => {
  expect(genDiff(beforeNestedJson, afterNestedJson)).toEqual(expectedNested);
});

test('gendiff with nested yml', () => {
  expect(genDiff(beforeNestedYml, afterNestedYml)).toEqual(expectedNested);
});

test('gendiff with nested ini', () => {
  expect(genDiff(beforeNestedIni, afterNestedIni)).toEqual(expectedNested);
});
