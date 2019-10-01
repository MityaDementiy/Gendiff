import renderDefaultDiff from './renderNested';
import renderPlainDiff from './renderPlain';

const mapping = {
  default: renderDefaultDiff,
  plain: renderPlainDiff,
};

const render = (ast, format = 'default') => mapping[format](ast);

export default render;
