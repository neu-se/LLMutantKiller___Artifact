import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should emit an error event when a write operation fails', (done) => {
    const db = new Dirty('test.dirty');
    db.on('load', () => {
      db.set('key', 'value', () => {
        db.set('key2', 'value2', () => {
          db.on('error', (err) => {
            expect(err).not.toBeNull();
            done();
          });
          // Simulate a write error
          if (db._writeStream) {
            db._writeStream.destroy();
          }
          db.set('key3', 'value3', (err) => {
            if (err) {
              done.fail('Error not emitted');
            }
          });
        });
      });
    });
    setTimeout(() => {
      done.fail('Timeout');
    }, 5000);
  });
});