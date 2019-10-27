import _ from 'lodash';

const makeTab = (nestingLevel) => '  '.repeat(nestingLevel);

const stringify = (value, nesting) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => `${makeTab(nesting + 2)}${key}: ${value[key]}`).join('\n');
  return `{\n${result}\n${makeTab(nesting)}}`;
};

const renderDefaultDiff = (ast, nesting = 2) => {
  const mappedAst = ast.map((node) => {
    if (node.type === 'parent') {
      return `${makeTab(nesting)}${node.key}: ${stringify(renderDefaultDiff(node.children, nesting + 2))}`;
    }
    if (node.type === 'added') {
      return `${makeTab(nesting - 1)}+ ${node.key}: ${stringify(node.newValue, nesting)}`;
    }
    if (node.type === 'deleted') {
      return `${makeTab(nesting - 1)}- ${node.key}: ${stringify(node.oldValue, nesting)}`;
    }
    if (node.type === 'unchanged') {
      return `${makeTab(nesting)}${node.key}: ${stringify(node.oldValue, nesting)}`;
    }
    return `${makeTab(nesting - 1)}- ${node.key}: ${stringify(node.oldValue, nesting)}\n${makeTab(nesting - 1)}+ ${node.key}: ${stringify(node.newValue, nesting)}`;
  });
  const result = `{\n${mappedAst.join('\n')}\n${makeTab(nesting - 2)}}`;
  return result;
};
export default renderDefaultDiff;
