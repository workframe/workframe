/* @flow */
/* eslint-disable */

import { Data } from '../../../../../index';

import { Iterable, List, Map } from 'immutable';

function toMap(v) {
  if (v instanceof Iterable) {
    return v.map(toMap);
  }

  if (v instanceof Data.Base) {
    return v.toMap();
  }

  return v;
}

/*::`*/@Data('accountAuthentication')
/*::`;*/class AccountAuthenticationView extends Data.Base {
  data: Map<string, any>;

  constructor(init: AccountAuthenticationViewInit) {
    super();

    if (init) {
      this.data = Map({
        id: init.id,
        accountId: init.accountId,
        passwordHash: init.passwordHash
      });
    }
  }

  get id(): string {
    return this.data.get('id');
  }

  get accountId(): string {
    return this.data.get('accountId');
  }

  get passwordHash(): string {
    return this.data.get('passwordHash');
  }

  update(update: AccountAuthenticationViewUpdate): AccountAuthenticationView {
    const updated = Object.create(AccountAuthenticationView.prototype);
    updated.data = this.data.merge(update);
    return updated;
  }

  toMap(): Map<string, any> {
    return toMap(this.data);
  }

}

type AccountAuthenticationViewUpdate = { id?: string;
  accountId?: string;
  passwordHash?: string;
  [key: string]: void;
};
type AccountAuthenticationViewInit = { id: string;
  accountId: string;
  passwordHash: string;
  [key: string]: void;
};
export default AccountAuthenticationView;