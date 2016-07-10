import { ApplicationContext } from '../app';
import { Component, Inject, OnStart } from '../container';

import FilterFactory from './filterFactory';
import Resource from './resource';
import ResourceFactory from './resourceFactory';

const FILTER_KEY = 'filters';


const getRouteTree = (appContext) => {
  const urlRouterComponent = appContext.getComponentByName('UrlRouter');
  if (!urlRouterComponent) {
    throw new Error('unable to find "UrlRouter"');
  }

  const urlRouter = appContext.createComponent(urlRouterComponent);
  if (!urlRouter) {
    throw new Error('unable to create "UrlRouter"');
  }
  return urlRouter.routes;
};


@Component()
class Router {

  resources: Array<Resource> = [];

  @Inject(ApplicationContext)
  appContext;

  @Inject(FilterFactory)
  filterFactory;

  @Inject(ResourceFactory)
  resourceFactory;


  @OnStart()
  async start() {
    const routeTree = getRouteTree(this.appContext);
    this.resources = this.createResources(routeTree);
  }

  createResources(routeTree, parentFilters = [], baseUrl = '') {
    const filterFactories = routeTree[FILTER_KEY] || [];
    const filters = this.filterFactory.create(filterFactories, parentFilters);

    const resources = [];
    Object.keys(routeTree).forEach((key) => {
      if (key === FILTER_KEY) {
        return;
      }

      if (!key.startsWith('/')) {
        throw new Error(`invalid URL route '${key}': must start with an '/'`);
      }

      const url = key === '/' ? baseUrl : baseUrl + key;
      const routeVal = routeTree[key];
      if (routeVal.name) {
        resources.push(...this.resourceFactory.create(url, filters, routeVal));
      } else {
        resources.push(...this.createResources(routeVal, filters, url));
      }
    });
    return resources;
  }
}


export default Router;
