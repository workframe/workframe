import util from 'util';

import Component from './component';


function findDecorations(type, factory) {
  return (Reflect.getMetadata('decorated', factory) || [])
    .reduce(((acc, decorated) =>
      acc.concat(Reflect.getMetadata('decorator', factory, decorated.name)
        .map((decorator) =>
          Object.assign(
            {},
            decorator,
            { target: decorated },
          )
        ))
      ), []
    );
}


class ComponentFactory {

  constructor(schema, idGenerator) {
    this.schema = schema;
    this.idGenerator = idGenerator;
  }

  create(factory) {
    if (!util.isFunction(factory)) {
      throw new Error(`'${factory}' is not a function`);
    }

    const type = this.schema.typeOf(factory);
    if (!type) {
      throw new Error(`'${factory.name}' can not be identified as any known component type`);
    }

    const componentId = this.idGenerator.next();
    const decorations = findDecorations(type, factory);
    return new Component(componentId, type, factory, decorations);
  }
}


export default ComponentFactory;
