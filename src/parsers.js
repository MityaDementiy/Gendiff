import yaml from 'js-yaml';
import ini from 'ini';

const mapping = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = (data, dataType) => mapping[dataType](data);

export default parse;
