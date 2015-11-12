import {isString} from 'lodash';


const idRegex = new RegExp('^([a-zA-Z])+$');
function isValidId(id) {
  return id !== undefined && isString(id) && idRegex.test(id);
}

const nsRegex = new RegExp('^([a-z])+$');
function isValidNamespace(ns) {
  return ns !== undefined && isString(ns) && nsRegex.test(ns);
}

const behavior = 'Behavior';
const command = 'Command';
const query = 'Query';
const shell = 'Shell';
const validTypes = [
  behavior, command, query, shell,
];
function isValidType(t) {
  return t !== undefined && validTypes.indexOf(t) !== -1;
}

export function isComponent(input) {
  return isValidId(input.id)
    && isValidType(input.type)
    && isValidNamespace(input.namespace);
}
