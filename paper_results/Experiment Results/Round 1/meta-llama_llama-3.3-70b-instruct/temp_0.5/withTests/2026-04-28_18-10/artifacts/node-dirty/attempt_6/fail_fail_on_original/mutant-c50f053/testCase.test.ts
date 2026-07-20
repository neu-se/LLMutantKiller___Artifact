import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should emit an error event when a write operation fails', (done) => {
    const db = new Dirty('test.dirty');
    db.set('key', 'value', () => {
      db.set('key2', 'value2', (err) => {
        if (err) {
          throw err;
        }
        db.on('error', () => {
          done.fail('No error emitted');
        });
        // Simulate a write error
        db._writeStream.destroy();
        db.set('key3', 'value3', () => {
          done();
        });
      });
    });
  });
});