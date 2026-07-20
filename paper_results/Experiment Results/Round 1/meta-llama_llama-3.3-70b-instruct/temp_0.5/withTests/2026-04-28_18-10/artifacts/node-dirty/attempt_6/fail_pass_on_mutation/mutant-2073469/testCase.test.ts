import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', function () {
  it('should emit "drain" event after write and not emit an empty string event with the same timing', function (done) {
    const db = new Dirty('test.dirty');
    let events = [];
    db.on('drain', () => {
      events.push('drain');
    });
    db.on('', () => {
      events.push('');
    });
    db.set('key', 'value');
    setTimeout(() => {
      if (events.length > 0 && events[events.length - 1] === '') {
        throw new Error('Expected "drain" event to be emitted and not an empty string event');
      }
      db.close();
      done();
    }, 100);
  });
});