import AccessorComponentType from './accessor';
import AggregateComponentType from './aggregate';
// import AggregateRootComponentType from './aggregateRoot';
import AggregatorComponentType from './aggregator';
// import BehaviorComponentType from './behavior';
import CommandComponentType from './command';
import ControllerComponentType from './controller';
import EventComponentType from './event';
import FilterComponentType from './filter';
import ProcessorComponentType from './processor';
import ProjectorComponentType from './projector';
// import QueryComponentType from './query';
import RouterComponentType from './router';
// import { StateComponentType } from './state';
// import SystemComponentType from './system';
import TypeIdentifier from './identifier';
import ViewComponentType from './view';


const types = [
  new AccessorComponentType(),
  new AggregateComponentType(),
  // AggregateRootComponentType,
  new AggregatorComponentType(),
  // BehaviorComponentType,
  new ControllerComponentType(),
  new CommandComponentType(),
  new EventComponentType(),
  new FilterComponentType(),
  new ProcessorComponentType(),
  new ProjectorComponentType(),
  // QueryComponentType,
  new RouterComponentType(),
  // StateComponentType,
  // SystemComponentType,
  new ViewComponentType(),
];


export {
  types,
  TypeIdentifier,
};
