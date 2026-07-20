import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('test-drain-event', function () {
  it('should fire drain event and not any other event', function (done) {
    const db = new Dirty();
    let drainFired = false;
    db.on('drain', () => {
      drainFired = true;
    });
    db.set('key', 'value');
    setTimeout(() => {
      if (drainFired) {
        const events = db.eventNames();
        if (events.length === 1 && events[0] === 'drain') {
          done();
        } else {
          done(new Error('Other events were fired'));
        }
      } else {
        done(new Error('Drain event was not fired'));
      }
    }, 100);
  });
});