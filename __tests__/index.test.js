import path from 'path';
import fs from 'fs';
import genDiff from '../src';


const testDir = './__tests__/__fixtures__';
const beforeJson = path.resolve(testDir, 'before.json');
const afterJson = path.resolve(testDir, 'after.json');
const expectedResultFlatJson = fs.readFileSync(path.resolve(testDir, 'expectedFlatJson'), 'utf-8');

test('genDiff', () => {
  expect(genDiff(beforeJson, afterJson)).toEqual(expectedResultFlatJson);
});
