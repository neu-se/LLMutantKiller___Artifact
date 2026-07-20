import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('test-drain-event', function () {
  it('should fire drain event with the correct event name', function (done) {
    const db = new Dirty();
    db.set('key', 'value');
    db.on('drain', (eventName) => {
      if (eventName !== undefined) {
        done(new Error('Drain event should not have any arguments'));
      } else {
        done();
      }
    });
  });
});