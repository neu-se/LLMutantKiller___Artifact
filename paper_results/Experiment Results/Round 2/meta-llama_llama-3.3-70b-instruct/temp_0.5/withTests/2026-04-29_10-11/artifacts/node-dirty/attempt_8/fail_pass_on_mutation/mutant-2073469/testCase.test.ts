import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('test-drain-event', function () {
  it('should fire drain event with the correct name', function (done) {
    const db = new Dirty();
    db.set('key', 'value');
    db.on('drain', () => {
      db.eventNames().forEach(eventName => {
        if (eventName !== 'drain' && eventName !== 'load' && eventName !== 'error' && eventName !== 'read_close' && eventName !== 'write_close') {
          done(new Error('Unexpected event name: ' + eventName));
        }
      });
      done();
    });
  });
});