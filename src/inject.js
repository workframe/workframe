import {isFunction} from 'lodash';


function isComponent(target) {
  return target.namespace && target.id && target.type;
}

function inject(reference) {
  return (target, key) => {
    if (!isComponent(target)) {
      throw new Error(`unable to inject into any property of '${target.name}': not a component`);
    }
    if (!isFunction(reference)) {
      throw new Error(`unable to inject '${reference}' into '${key}' of '${target.id}': not a function`);
    }
    if (!isComponent(reference)) {
      throw new Error(`unable to inject '${reference.name}' into '${key}' of '${target.name}': not a component`);
    }

    const proto = target.prototype;
    proto.dependencies = proto.dependencies || {};
    if (proto.dependencies[key]) {
      throw new Error(`unable to inject into '${target.name}': conflicting dependency`);
    }
    proto.dependencies[key] = {
      id: reference.id,
      type: reference.type,
      namespace: reference.namespace,
    };
  };
}


export default inject;
