import yaml from 'js-yaml';

const mapping = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

const parseFile = (file, extension) => mapping[extension](file);

export default parseFile;
