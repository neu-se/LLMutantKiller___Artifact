import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('test-drain-event', function () {
  it('should fire drain event when no writes are pending', function (done) {
    const db = new Dirty();
    db.on('drain', () => {
      done();
    });
    db.set('key', 'value');
  });
});