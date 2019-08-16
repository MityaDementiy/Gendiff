import genDiff from '../src';

const pathToBeforeJson = './__tests__/__fixtures__/before.json';
const pathToAfterJson = './__tests__/__fixtures__/after.json';
const expectedResult = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
}`;

test('genDiff', () => {
  expect(genDiff(pathToBeforeJson, pathToAfterJson)).toEqual(expectedResult);
});
