// import Component from '../component/component';
// import Collector from './collector';
// import Dispatcher from './dispatcher';

// import { Clock, IdGenerator } from '../../util';
//
//
// class Result {
//
//   constructor(result, collector) {
//     this.result = result;
//     this.collector = collector;
//   }
// }

class Router {

  // constructor() {
  //   this.dispatcher = new Dispatcher();
  // }

  async dispatch() {
//     const component = new Component(this.registry.getConnection('handles', signal.constructor));
//     if (!component) {
//       throw new Error(`unable to handle signal: no matching handler found for '${signal.constructor.name}'`);
//     }
//
//     const collector = new Collector();
//     const dispatcher = new Dispatcher(null, collector, IdGenerator, Clock);
//     const handler = this.registry.get(component);
//     const handleFn = (aggregate, command) => handler.process(dispatcher, aggregate, command);
//
//     let result;
//     const type = component.type.typeName;
//     if (type === 'Accessor') {
//       result = await this.queryHandler.handle(handleFn, signal);
//     } else if (type === 'Processor') {
//       result = await this.commandHandler.handle(handleFn, signal);
//     } else {
//       throw new Error(`unable to handle signal: Component must be 'Accessor' or 'Processor' but is '${type}'`);
//     }
//
//     return new Result(result, collector);
  }
}


export default Router;
