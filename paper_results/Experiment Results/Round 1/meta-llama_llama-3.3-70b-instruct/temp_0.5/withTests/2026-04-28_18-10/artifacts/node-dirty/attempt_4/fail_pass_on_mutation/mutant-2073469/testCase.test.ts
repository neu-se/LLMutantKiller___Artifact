import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', function () {
  it('should emit "drain" event with the correct event name after write', function (done) {
    const db = new Dirty('test.dirty');
    let eventName = '';
    db.on('drain', () => {
      eventName = 'drain';
    });
    db.on('', () => {
      eventName = '';
    });
    db.set('key', 'value');
    setTimeout(() => {
      if (eventName!== 'drain') {
        throw new Error('Expected "drain" event to be emitted');
      }
      db.close();
      done();
    }, 100);
  });
});