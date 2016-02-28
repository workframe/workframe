'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let dispatcher;
let collector;

describe('Dispatcher', () => {
  beforeEach(() => {
    collector = {
      add: _sinon2.default.spy()
    };

    const nextId = _sinon2.default.stub();
    nextId.onFirstCall().returns(1);
    nextId.onSecondCall().returns(2);
    const idGenerator = {
      next: nextId
    };

    const clock = {
      now: _sinon2.default.stub().returns(1234567890)
    };

    dispatcher = new _dispatcher2.default(null, collector, idGenerator, clock);
  });

  describe('should invoke', () => {
    it('method', () => {
      let called;
      let Component = class Component {
        doSomething() {
          called = true;
        }
      };


      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, []);

      _assert2.default.ok(called);
    });

    it('method with for of dispatcher as first argument', () => {
      let args;
      let Component = class Component {
        doSomething() {
          args = arguments;
        }
      };


      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, []);

      _assert2.default.equal(args[0].id, 2);
      _assert2.default.equal(args[0].parentId, 1);
    });

    it('method and return its value', () => {
      let Component = class Component {
        doSomething() {
          return 42;
        }
      };


      const comp = new Component();
      const ret = dispatcher.invoke({}, comp, comp.doSomething, []);

      _assert2.default.equal(ret, 42);
    });

    it('method and yield thrown exception', () => {
      let Component = class Component {
        doSomething() {
          throw new Error('oops');
        }
      };


      const comp = new Component();
      _assert2.default.throws(() => dispatcher.invoke({}, comp, comp.doSomething, []), Error);
    });
  });

  describe('should track', () => {
    it('invocation call', () => {
      let Component = class Component {
        doSomething() {
          return 42;
        }
      };


      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, []);

      _assert2.default.deepEqual(collector.add.firstCall.args, [{
        id: 1,
        parentId: null,
        component: 'Component',
        method: 'doSomething',
        arguments: [],
        time: 1234567890
      }]);
    });

    it('invocation call with arguments', () => {
      let Component = class Component {
        doSomething() {
          return 42;
        }
      };


      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, ['arg1', 'arg2']);

      _assert2.default.deepEqual(collector.add.firstCall.args, [{
        id: 1,
        parentId: null,
        component: 'Component',
        method: 'doSomething',
        arguments: ['arg1', 'arg2'],
        time: 1234567890
      }]);
    });

    it('invocation result', () => {
      let Component = class Component {
        doSomething() {
          return 42;
        }
      };


      const comp = new Component();
      dispatcher.invoke({}, comp, comp.doSomething, []);

      _assert2.default.deepEqual(collector.add.secondCall.args, [{
        id: 1,
        result: 42,
        time: 1234567890
      }]);
    });

    it('invocation exception', () => {
      let Component = class Component {
        doSomething() {
          throw new Error('oops');
        }
      };


      const comp = new Component();
      try {
        dispatcher.invoke({}, comp, comp.doSomething, []);
      } catch (err) {
        // ignore
      }

      _assert2.default.deepEqual(collector.add.secondCall.args, [{
        id: 1,
        error: new Error('oops'),
        time: 1234567890
      }]);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVybmFsL2Rpc3BhdGNoZXIuc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsSUFBSSxVQUFKO0FBQ0EsSUFBSSxTQUFKOztBQUVBLFNBQVMsWUFBVCxFQUF1QixNQUFNO0FBQzNCLGFBQVcsTUFBTTtBQUNmLGdCQUFZO0FBQ1YsV0FBSyxnQkFBTSxHQUFOLEVBQUw7S0FERixDQURlOztBQUtmLFVBQU0sU0FBUyxnQkFBTSxJQUFOLEVBQVQsQ0FMUztBQU1mLFdBQU8sV0FBUCxHQUFxQixPQUFyQixDQUE2QixDQUE3QixFQU5lO0FBT2YsV0FBTyxZQUFQLEdBQXNCLE9BQXRCLENBQThCLENBQTlCLEVBUGU7QUFRZixVQUFNLGNBQWM7QUFDbEIsWUFBTSxNQUFOO0tBREksQ0FSUzs7QUFZZixVQUFNLFFBQVE7QUFDWixXQUFLLGdCQUFNLElBQU4sR0FBYSxPQUFiLENBQXFCLFVBQXJCLENBQUw7S0FESSxDQVpTOztBQWdCZixpQkFBYSx5QkFBZSxJQUFmLEVBQXFCLFNBQXJCLEVBQWdDLFdBQWhDLEVBQTZDLEtBQTdDLENBQWIsQ0FoQmU7R0FBTixDQUFYLENBRDJCOztBQW9CM0IsV0FBUyxlQUFULEVBQTBCLE1BQU07QUFDOUIsT0FBRyxRQUFILEVBQWEsTUFBTTtBQUNqQixVQUFJLE1BQUosQ0FEaUI7VUFFWCxZQUFOLE1BQU0sU0FBTixDQUFnQjtBQUNkLHNCQUFjO0FBQ1osbUJBQVMsSUFBVCxDQURZO1NBQWQ7T0FERixDQUZpQjs7O0FBUWpCLFlBQU0sT0FBTyxJQUFJLFNBQUosRUFBUCxDQVJXO0FBU2pCLGlCQUFXLE1BQVgsQ0FBa0IsRUFBbEIsRUFBc0IsSUFBdEIsRUFBNEIsS0FBSyxXQUFMLEVBQWtCLEVBQTlDLEVBVGlCOztBQVdqQix1QkFBTyxFQUFQLENBQVUsTUFBVixFQVhpQjtLQUFOLENBQWIsQ0FEOEI7O0FBZTlCLE9BQUcsaURBQUgsRUFBc0QsTUFBTTtBQUMxRCxVQUFJLElBQUos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bmFsL2Rpc3BhdGNoZXIuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5cbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJy4vZGlzcGF0Y2hlcic7XG5cblxubGV0IGRpc3BhdGNoZXI7XG5sZXQgY29sbGVjdG9yO1xuXG5kZXNjcmliZSgnRGlzcGF0Y2hlcicsICgpID0+IHtcbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgY29sbGVjdG9yID0ge1xuICAgICAgYWRkOiBzaW5vbi5zcHkoKSxcbiAgICB9O1xuXG4gICAgY29uc3QgbmV4dElkID0gc2lub24uc3R1YigpO1xuICAgIG5leHRJZC5vbkZpcnN0Q2FsbCgpLnJldHVybnMoMSk7XG4gICAgbmV4dElkLm9uU2Vjb25kQ2FsbCgpLnJldHVybnMoMik7XG4gICAgY29uc3QgaWRHZW5lcmF0b3IgPSB7XG4gICAgICBuZXh0OiBuZXh0SWQsXG4gICAgfTtcblxuICAgIGNvbnN0IGNsb2NrID0ge1xuICAgICAgbm93OiBzaW5vbi5zdHViKCkucmV0dXJucygxMjM0NTY3ODkwKSxcbiAgICB9O1xuXG4gICAgZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKG51bGwsIGNvbGxlY3RvciwgaWRHZW5lcmF0b3IsIGNsb2NrKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3Nob3VsZCBpbnZva2UnLCAoKSA9PiB7XG4gICAgaXQoJ21ldGhvZCcsICgpID0+IHtcbiAgICAgIGxldCBjYWxsZWQ7XG4gICAgICBjbGFzcyBDb21wb25lbnQge1xuICAgICAgICBkb1NvbWV0aGluZygpIHtcbiAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbXAgPSBuZXcgQ29tcG9uZW50KCk7XG4gICAgICBkaXNwYXRjaGVyLmludm9rZSh7fSwgY29tcCwgY29tcC5kb1NvbWV0aGluZywgW10pO1xuXG4gICAgICBhc3NlcnQub2soY2FsbGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdtZXRob2Qgd2l0aCBmb3Igb2YgZGlzcGF0Y2hlciBhcyBmaXJzdCBhcmd1bWVudCcsICgpID0+IHtcbiAgICAgIGxldCBhcmdzO1xuICAgICAgY2xhc3MgQ29tcG9uZW50IHtcbiAgICAgICAgZG9Tb21ldGhpbmcoKSB7XG4gICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb21wID0gbmV3IENvbXBvbmVudCgpO1xuICAgICAgZGlzcGF0Y2hlci5pbnZva2Uoe30sIGNvbXAsIGNvbXAuZG9Tb21ldGhpbmcsIFtdKTtcblxuICAgICAgYXNzZXJ0LmVxdWFsKGFyZ3NbMF0uaWQsIDIpO1xuICAgICAgYXNzZXJ0LmVxdWFsKGFyZ3NbMF0ucGFyZW50SWQsIDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ21ldGhvZCBhbmQgcmV0dXJuIGl0cyB2YWx1ZScsICgpID0+IHtcbiAgICAgIGNsYXNzIENvbXBvbmVudCB7XG4gICAgICAgIGRvU29tZXRoaW5nKCkge1xuICAgICAgICAgIHJldHVybiA0MjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb21wID0gbmV3IENvbXBvbmVudCgpO1xuICAgICAgY29uc3QgcmV0ID0gZGlzcGF0Y2hlci5pbnZva2Uoe30sIGNvbXAsIGNvbXAuZG9Tb21ldGhpbmcsIFtdKTtcblxuICAgICAgYXNzZXJ0LmVxdWFsKHJldCwgNDIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ21ldGhvZCBhbmQgeWllbGQgdGhyb3duIGV4Y2VwdGlvbicsICgpID0+IHtcbiAgICAgIGNsYXNzIENvbXBvbmVudCB7XG4gICAgICAgIGRvU29tZXRoaW5nKCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignb29wcycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbXAgPSBuZXcgQ29tcG9uZW50KCk7XG4gICAgICBhc3NlcnQudGhyb3dzKCgpID0+IGRpc3BhdGNoZXIuaW52b2tlKHt9LCBjb21wLCBjb21wLmRvU29tZXRoaW5nLCBbXSksIEVycm9yKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3Nob3VsZCB0cmFjaycsICgpID0+IHtcbiAgICBpdCgnaW52b2NhdGlvbiBjYWxsJywgKCkgPT4ge1xuICAgICAgY2xhc3MgQ29tcG9uZW50IHtcbiAgICAgICAgZG9Tb21ldGhpbmcoKSB7XG4gICAgICAgICAgcmV0dXJuIDQyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbXAgPSBuZXcgQ29tcG9uZW50KCk7XG4gICAgICBkaXNwYXRjaGVyLmludm9rZSh7fSwgY29tcCwgY29tcC5kb1NvbWV0aGluZywgW10pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGNvbGxlY3Rvci5hZGQuZmlyc3RDYWxsLmFyZ3MsIFt7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICBwYXJlbnRJZDogbnVsbCxcbiAgICAgICAgY29tcG9uZW50OiAnQ29tcG9uZW50JyxcbiAgICAgICAgbWV0aG9kOiAnZG9Tb21ldGhpbmcnLFxuICAgICAgICBhcmd1bWVudHM6IFtdLFxuICAgICAgICB0aW1lOiAxMjM0NTY3ODkwLFxuICAgICAgfV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ludm9jYXRpb24gY2FsbCB3aXRoIGFyZ3VtZW50cycsICgpID0+IHtcbiAgICAgIGNsYXNzIENvbXBvbmVudCB7XG4gICAgICAgIGRvU29tZXRoaW5nKCkge1xuICAgICAgICAgIHJldHVybiA0MjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb21wID0gbmV3IENvbXBvbmVudCgpO1xuICAgICAgZGlzcGF0Y2hlci5pbnZva2Uoe30sIGNvbXAsIGNvbXAuZG9Tb21ldGhpbmcsIFsnYXJnMScsICdhcmcyJ10pO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGNvbGxlY3Rvci5hZGQuZmlyc3RDYWxsLmFyZ3MsIFt7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICBwYXJlbnRJZDogbnVsbCxcbiAgICAgICAgY29tcG9uZW50OiAnQ29tcG9uZW50JyxcbiAgICAgICAgbWV0aG9kOiAnZG9Tb21ldGhpbmcnLFxuICAgICAgICBhcmd1bWVudHM6IFsnYXJnMScsICdhcmcyJ10sXG4gICAgICAgIHRpbWU6IDEyMzQ1Njc4OTAsXG4gICAgICB9XSk7XG4gICAgfSk7XG5cbiAgICBpdCgnaW52b2NhdGlvbiByZXN1bHQnLCAoKSA9PiB7XG4gICAgICBjbGFzcyBDb21wb25lbnQge1xuICAgICAgICBkb1NvbWV0aGluZygpIHtcbiAgICAgICAgICByZXR1cm4gNDI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY29tcCA9IG5ldyBDb21wb25lbnQoKTtcbiAgICAgIGRpc3BhdGNoZXIuaW52b2tlKHt9LCBjb21wLCBjb21wLmRvU29tZXRoaW5nLCBbXSk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoY29sbGVjdG9yLmFkZC5zZWNvbmRDYWxsLmFyZ3MsIFt7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICByZXN1bHQ6IDQyLFxuICAgICAgICB0aW1lOiAxMjM0NTY3ODkwLFxuICAgICAgfV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ludm9jYXRpb24gZXhjZXB0aW9uJywgKCkgPT4ge1xuICAgICAgY2xhc3MgQ29tcG9uZW50IHtcbiAgICAgICAgZG9Tb21ldGhpbmcoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvb3BzJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY29tcCA9IG5ldyBDb21wb25lbnQoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRpc3BhdGNoZXIuaW52b2tlKHt9LCBjb21wLCBjb21wLmRvU29tZXRoaW5nLCBbXSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gaWdub3JlXG4gICAgICB9XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoY29sbGVjdG9yLmFkZC5zZWNvbmRDYWxsLmFyZ3MsIFt7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICBlcnJvcjogbmV3IEVycm9yKCdvb3BzJyksXG4gICAgICAgIHRpbWU6IDEyMzQ1Njc4OTAsXG4gICAgICB9XSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
