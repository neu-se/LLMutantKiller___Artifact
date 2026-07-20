import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', function () {
  it('should emit "drain" event after write and verify event name', function (done) {
    const db = new Dirty('test.dirty');
    let eventName = '';
    db.on('drain', () => {
      eventName = 'drain';
    });
    db.set('key', 'value');
    setTimeout(() => {
      if (eventName !== 'drain') {
        throw new Error('Expected "drain" event to be emitted');
      }
      db.close();
      done();
    }, 100);
    db.on('', () => {
      throw new Error('Unexpected empty string event emitted');
    });
  });
});