import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty', () => {
  it('should not emit drain event when queue is not empty', (done) => {
    const db = new Dirty();
    db.set('key', 'value');
    db.set('key2', 'value2', () => {
      db.on('drain', () => {
        throw new Error('Drain event should not be emitted');
      });
      done();
    });
  });
});