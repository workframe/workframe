import assert from 'assert';

import Transitioner from './transitioner';
import { OnStart, OnStop } from '../lifecycle/decorators';


let transitioner;

describe('Transitioner', () => {
  beforeEach(() => {
    const network = {};
    const factory = {
      create: (type) => new type(),
    };
    transitioner = new Transitioner(network, factory);
  });

  it('should transition components to "started"', async () => {
    const started = [];
    class A { async start() { started.push(A); } }
    class B { async start() { started.push(B); } }
    class C { async start() { started.push(C); } }
    class D { async start() { started.push(D); } }
    const component = { decorations: [{ type: OnStart, target: { name: 'start', kind: 'method' } }] };

    transitioner.network.nodes = [D, C, A, B];
    transitioner.network.propsByValue = {
      [A]: { component },
      [B]: { component },
      [C]: { component },
      [D]: { component },
    };
    transitioner.network.connectionsFrom = (value) => {
      if (value === A) {
        return [{ from: A, to: B }];
      } else if (value === B) {
        return [{ from: B, to: C }];
      } else if (value === C) {
        return [];
      } else if (value === D) {
        return [{ from: D, to: C }];
      }
      return null;
    };

    await transitioner.start(OnStart);

    assert.deepEqual(started, [C, D, B, A]);
  });

  it('should transition components to "stopped"', async () => {
    const stopped = [];
    class A { async stop() { stopped.push(A); } }
    class B { async stop() { stopped.push(B); } }
    class C { async stop() { stopped.push(C); } }
    class D { async stop() { stopped.push(D); } }
    const component = { decorations: [{ type: OnStop, target: { name: 'stop', kind: 'method' } }] };

    transitioner.network.nodes = [D, C, A, B];
    transitioner.network.propsByValue = {
      [A]: { component },
      [B]: { component },
      [C]: { component },
      [D]: { component },
    };
    transitioner.network.connectionsTo = (value) => {
      if (value === A) {
        return [];
      } else if (value === B) {
        return [{ from: A, to: B }];
      } else if (value === C) {
        return [{ from: B, to: C }, { from: D, to: C }];
      } else if (value === D) {
        return [];
      }
      return null;
    };

    await transitioner.stop(OnStop);

    assert.deepEqual(stopped, [D, A, B, C]);
  });
});
