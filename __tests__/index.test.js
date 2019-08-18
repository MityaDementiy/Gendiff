import path from 'path';
import genDiff from '../src';

const testDir = './__tests__/__fixtures__';
const beforeJson = path.join(testDir, 'before.json');
const afterJson = path.join(testDir, 'after.json');
const expectedResultFlat = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
- follow: false
}`;

test('genDiff', () => {
  expect(genDiff(beforeJson, afterJson)).toEqual(expectedResultFlat);
});
