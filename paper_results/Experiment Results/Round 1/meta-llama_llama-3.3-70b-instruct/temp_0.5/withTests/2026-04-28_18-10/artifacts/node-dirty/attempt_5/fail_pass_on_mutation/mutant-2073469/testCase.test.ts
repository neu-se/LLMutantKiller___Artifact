import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', function () {
  it('should emit "drain" event with the correct event name after write and not emit an empty string event', function (done) {
    const db = new Dirty('test.dirty');
    let drainEmitted = false;
    let emptyStringEmitted = false;
    db.on('drain', () => {
      drainEmitted = true;
    });
    db.on('', () => {
      emptyStringEmitted = true;
    });
    db.set('key', 'value');
    setTimeout(() => {
      if (!drainEmitted || emptyStringEmitted) {
        throw new Error('Expected "drain" event to be emitted and not an empty string event');
      }
      db.close();
      done();
    }, 100);
  });
});