/* @flow */

import { Component, Record } from 'workframe';


@Record()
@Component('accountCreated')
class AccountCreatedEvent {

  aggregateId: string;

  givenName: string;
  familyName: string;
  emailAddress: string;
}


export default AccountCreatedEvent;
