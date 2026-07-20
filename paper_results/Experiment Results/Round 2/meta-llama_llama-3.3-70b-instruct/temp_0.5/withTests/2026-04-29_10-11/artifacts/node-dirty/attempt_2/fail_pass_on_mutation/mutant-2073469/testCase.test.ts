import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('test-drain-event', function () {
  it('should fire drain event with correct event name', function (done) {
    const db = new Dirty();
    db.on('drain', (event) => {
      if (event !== undefined) {
        throw new Error('Expected event to be undefined');
      }
      done();
    });
    db.on('', () => {
      throw new Error('Unexpected event fired');
    });
    db.set('key', 'value');
  });
});