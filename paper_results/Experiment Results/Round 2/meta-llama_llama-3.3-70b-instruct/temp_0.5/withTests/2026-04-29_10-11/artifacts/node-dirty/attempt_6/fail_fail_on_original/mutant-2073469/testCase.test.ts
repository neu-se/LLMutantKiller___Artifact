import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('test-drain-event', function () {
  it('should fire drain event with the correct name', function (done) {
    const db = new Dirty();
    db.set('key', 'value');
    db.on('drain', () => {
      db.listeners('drain').forEach((listener) => {
        listener();
      });
      const events = db.eventNames();
      if (events.includes('')) {
        done(new Error('Empty string event was registered'));
      } else {
        done();
      }
    });
  });
});