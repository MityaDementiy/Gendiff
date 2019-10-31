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

const renderNestedDiff = (ast, nesting = 2) => {
  const mappedAst = ast.map((node) => {
    switch (node.type) {
      case 'parent':
        return `${makeTab(nesting)}${node.key}: ${stringify(renderNestedDiff(node.children, nesting + 2))}`;
      case 'added':
        return `${makeTab(nesting - 1)}+ ${node.key}: ${stringify(node.newValue, nesting)}`;
      case 'deleted':
        return `${makeTab(nesting - 1)}- ${node.key}: ${stringify(node.oldValue, nesting)}`;
      case 'unchanged':
        return `${makeTab(nesting)}${node.key}: ${stringify(node.oldValue, nesting)}`;
      case 'changed':
        return `${makeTab(nesting - 1)}- ${node.key}: ${stringify(node.oldValue, nesting)}\n${makeTab(nesting - 1)}+ ${node.key}: ${stringify(node.newValue, nesting)}`;
      default:
        throw new Error(`Error! '${node.type}' is invalid node type`);
    }
  });
  const result = `{\n${mappedAst.join('\n')}\n${makeTab(nesting - 2)}}`;
  return result;
};
export default renderNestedDiff;
