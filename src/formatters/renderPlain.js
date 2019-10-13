import _ from 'lodash';

const makeCorrectValue = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (typeof val === 'boolean') {
    return val;
  }
  if (typeof val === 'number') {
    return val;
  }
  return `'${val}'`;
};

const renderPlainDiff = (ast, path = '') => {
  const mappedAst = ast
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const nestedPath = `${path}.${node.key}`;
      if (node.type === 'deleted') {
        return `Property '${_.trim(nestedPath, '.')}' was removed`;
      }
      if (node.type === 'added') {
        return `Property '${_.trim(nestedPath, '.')}' was added with value: ${makeCorrectValue(node.newValue)}`;
      }
      if (node.type === 'changed') {
        return `Property '${_.trim(nestedPath, '.')}' was updated. From ${makeCorrectValue(node.oldValue)} to ${makeCorrectValue(node.newValue)}`;
      }
      if (node.type === 'parent') {
        return renderPlainDiff(node.children, nestedPath);
      }
      return null;
    });
  return mappedAst.join('\n');
};

export default renderPlainDiff;
