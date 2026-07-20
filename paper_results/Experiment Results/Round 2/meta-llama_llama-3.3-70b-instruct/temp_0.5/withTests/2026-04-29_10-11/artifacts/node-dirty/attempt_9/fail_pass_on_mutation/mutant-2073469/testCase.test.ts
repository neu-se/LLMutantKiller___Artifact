import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('test-drain-event', function () {
  it('should not fire empty string event', function (done) {
    const db = new Dirty();
    db.on('', () => {
      done(new Error('Empty string event was fired'));
    });
    db.set('key', 'value');
    db.on('drain', () => {
      done();
    });
  });
});