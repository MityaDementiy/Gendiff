import yaml from 'js-yaml';
import ini from 'ini';

const mapping = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (configName, extension) => mapping[extension](configName);

export default parse;
