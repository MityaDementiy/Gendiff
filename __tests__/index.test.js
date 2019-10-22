import fs from 'fs';
import genDiff from '../src';

const testDir = './__tests__/__fixtures__';
const getDataFromFile = (fileName) => fs.readFileSync(`${testDir}/${fileName}`, 'utf-8');
const dataFormats = ['json', 'yml', 'ini'];

test.each(dataFormats)('test genDiff with default output', (dataFormat) => {
  const expected = getDataFromFile('expectedNested');
  expect(genDiff(`${testDir}/beforeNested.${dataFormat}`, `${testDir}/afterNested.${dataFormat}`)).toEqual(expected);
});

test.each(dataFormats)('test genDiff with plain output', (dataFormat) => {
  const expected = getDataFromFile('expectedPlain');
  expect(genDiff(`${testDir}/beforeNested.${dataFormat}`, `${testDir}/afterNested.${dataFormat}`, 'plain')).toEqual(expected);
});

test.each(dataFormats)('test genDiff with json output', (dataFormat) => {
  const expected = getDataFromFile('expectedJson');
  expect(genDiff(`${testDir}/beforeNested.${dataFormat}`, `${testDir}/afterNested.${dataFormat}`, 'json')).toEqual(expected);
});
