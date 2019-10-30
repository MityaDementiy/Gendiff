import _ from 'lodash';

const stringify = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (typeof val === 'boolean' || typeof val === 'number') {
    return val;
  }
  return `'${val}'`;
};

const renderPlainDiff = (ast, path = '') => {
  const mappedAst = ast
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const nestedPath = `${path}.${node.key}`;
      switch (node.type) {
        case 'deleted':
          return `Property '${_.trim(nestedPath, '.')}' was removed`;
        case 'added':
          return `Property '${_.trim(nestedPath, '.')}' was added with value: ${stringify(node.newValue)}`;
        case 'changed':
          return `Property '${_.trim(nestedPath, '.')}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
        default:
          return renderPlainDiff(node.children, nestedPath);
      }
    });
  return mappedAst.join('\n');
};
export default renderPlainDiff;
