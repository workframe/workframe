import assert from 'assert';
import sinon from 'sinon';
import Chance from 'chance';

import ComponentFactory from './factory';


let factory;
let addToRegistry;
const chance = new Chance();
const randomId = () => chance.word({syllables: 5});

describe('Factory', () => {
  beforeEach(() => {
    addToRegistry = sinon.spy();
    factory = new ComponentFactory({
      add: addToRegistry,
    });
  });

  it('should fail if suffix is missing', () => {
    class Invalid {
    }

    assert.throws(
      () => factory.build(Invalid, {
        namespace: 'namespace',
        type: 'Component',
        id: randomId(),
      }), (err) => err.message === `class must have suffix 'Component'`);
  });

  it('should fail if "id" property exists already', () => {
    class Component {

      static get id() {
        return 'my-id';
      }

      process(signal) {
        this.signal = signal;
      }
    }

    assert.throws(
      () => factory.build(Component, {
        namespace: 'namespace', type: 'Component', id: randomId(),
      }), (err) => err.message === `getter/property 'id' must not be defined`);
  });

  it('should add method that returns its "id"', () => {
    class Component {
    }

    const id = randomId();
    factory.build(Component, {
      namespace: 'namespace', type: 'Component', id: id,
    });
    assert.equal(Component.id, id);
  });

  it('should fail if "namespace" property exists already', () => {
    class Component {

      static get namespace() {
        return 'my-namspace';
      }

      process(signal) {
        this.signal = signal;
      }
    }

    assert.throws(
      () => factory.build(Component, {
        namespace: 'namespace', type: 'Component', id: randomId(),
      }, (err) => err.message === `getter/property 'namespace' must not be defined`));
  });

  it('should add method that returns its "namespace"', () => {
    class Component {
    }

    factory.build(Component, {
      namespace: 'namespace', type: 'Component', id: randomId(),
    });
    assert.equal(Component.namespace, 'namespace');
  });

  it('should add method that returns a default "namespace" if none was specified', () => {
    class Component {
    }

    factory.build(Component, {
      namespace: randomId(), type: 'Component', id: undefined,
    });
    assert.equal(Component.namespace, 'default');
  });

  it('should fail if "type" property exists already', () => {
    class Component {

      static get type() {
        return 'my-type';
      }
    }

    assert.throws(
      () => factory.build(Component, {
        namespace: 'namespace', type: 'Component', id: randomId(),
      }), (err) => err.message === `getter/property 'type' must not be defined`);
  });

  it('should add method that returns its "type"', () => {
    class Component {
    }

    factory.build(Component, {
      namespace: 'namespace', type: 'Component', id: randomId(),
    });
    assert.equal(Component.type, 'Component');
  });
});
