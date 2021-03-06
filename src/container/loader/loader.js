import path from 'path';

import { ComponentFactory } from '../component2';
import { IdGenerator } from '../../util';
import Scanner from './scanner';


async function loadChildren(container) {
  await Promise.all(container.children.map((c) => c.load()));
}

function createScanner(componentSchema) {
  const isComponent = (obj) => componentSchema.isComponent(obj);
  const excludeFiles = (filePath, rootDir) => {
    if (/.\.spec.js$/.test(filePath)) {
      return true;
    }

    if (/^__tests/.test(path.relative(rootDir, filePath))) {
      return true;
    }

    // TODO: make configurable

    return false;
  };
  return new Scanner(isComponent, excludeFiles);
}

function loadComponents(container) {
  const schema = container.componentSchema;
  const componentFactory = new ComponentFactory(schema, IdGenerator);
  const scanner = createScanner(schema);

  const components =
    scanner.scan(container.rootDir)
      .map((obj) => componentFactory.create(obj));
  components.forEach((comp) => container.registry.add(comp));

  // TODO: validate registry (e.g. no cycles)
}


class Loader {

  async load(container) {
    // children must be initilises BEFORE parent
    await loadChildren(container);
    loadComponents(container);
  }
}


export default Loader;
