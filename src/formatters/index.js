import renderNestedDiff from './renderNested';
import renderPlainDiff from './renderPlain';
import renderJsonDiff from './renderJson';

const mapping = {
  nested: renderNestedDiff,
  plain: renderPlainDiff,
  json: renderJsonDiff,
};

const render = (ast, format = 'nested') => mapping[format](ast);

export default render;
