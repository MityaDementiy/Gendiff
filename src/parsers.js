import yaml from 'js-yaml';
import ini from 'ini';

const mapping = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (fileName, extension) => mapping[extension](fileName);

export default parse;
