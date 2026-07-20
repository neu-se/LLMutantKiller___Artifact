import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', function () {
  it('should emit "drain" event after write and check event listener count', function (done) {
    const db = new Dirty('test.dirty');
    const originalListenerCount = EventEmitter.listenerCount(db, 'drain');
    db.set('key', 'value');
    db.on('drain', () => {
      const newListenerCount = EventEmitter.listenerCount(db, 'drain');
      if (newListenerCount !== originalListenerCount + 1) {
        throw new Error('Expected "drain" event listener count to increase by 1');
      }
      db.close();
      done();
    });
  });
});