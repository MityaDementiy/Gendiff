import renderDefaultDiff from './renderNested';
import renderPlainDiff from './renderPlain';
import renderJsonDiff from './renderJson';

const mapping = {
  default: renderDefaultDiff,
  plain: renderPlainDiff,
  json: renderJsonDiff,
};

const render = (ast, format = 'default') => mapping[format](ast);

export default render;
