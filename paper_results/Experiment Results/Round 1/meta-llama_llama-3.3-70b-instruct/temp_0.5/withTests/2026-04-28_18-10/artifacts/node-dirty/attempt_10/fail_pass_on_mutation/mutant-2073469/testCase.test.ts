import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', function () {
  it('should emit "drain" event after write and verify no empty string event is emitted', function (done) {
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
      if (emptyStringEmitted) {
        throw new Error('Unexpected empty string event emitted');
      }
      if (!drainEmitted) {
        throw new Error('Expected "drain" event to be emitted');
      }
      db.close();
      done();
    }, 100);
  });
});