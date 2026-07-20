import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('test-drain-event', function () {
  it('should fire drain event and not empty string event', function (done) {
    const db = new Dirty();
    let drainFired = false;
    let emptyStringFired = false;
    db.on('drain', () => {
      drainFired = true;
    });
    db.on('', () => {
      emptyStringFired = true;
    });
    db.set('key', 'value');
    setTimeout(() => {
      if (drainFired && !emptyStringFired) {
        done();
      } else {
        done(new Error('Drain event was not fired or empty string event was fired'));
      }
    }, 100);
  });
});