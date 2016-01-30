import { component, inject, State } from '../../src/index.js';


@component()
class ConnectionState extends State {

  constructor() {
    super();
    this.update((state) =>
      state.merge({
        user: {
          42: {
            name: 'Arthur Dent',
            email: 'arthur@earth.com',
          },
        },
      })
    );
  }

}


@component()
export class DatabaseSystem {

  @inject(ConnectionState)
  connectionState;


  getById(collection, id) {
    return this.connectionState.get().getIn([collection, id]).toJS();
  }

  setById(collection, id, data) {
    this.connectionState.update((db) => db.mergeDeepIn([collection, id], data));
  }
}
