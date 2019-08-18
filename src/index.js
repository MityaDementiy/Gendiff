import fs from 'fs';
import _ from 'lodash';

const getDiff = (beforeObj, afterObj) => {

};

export default (pathTofirstFile, pathToSecondFile) => {
  const firstFileContent = JSON.parse(fs.readFileSync(pathTofirstFile, 'utf-8'));
  const secondFileContent = JSON.parse(fs.readFileSync(pathToSecondFile, 'utf-8'));
  return getDiff(firstFileContent, secondFileContent);
};
