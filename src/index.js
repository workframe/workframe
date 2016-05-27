import App from './app';
import { Component, Inject } from './container';
import { Record } from './util';


async function boot(opts) {
  const app = new App(opts);
  await app.start();
  return app;
}


export {
  boot,
  Component,
  Inject,
  Record,
};
