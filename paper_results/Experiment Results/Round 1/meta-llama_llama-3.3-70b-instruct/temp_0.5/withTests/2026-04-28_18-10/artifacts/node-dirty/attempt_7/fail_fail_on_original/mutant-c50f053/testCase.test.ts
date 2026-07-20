import { Dirty } from "../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should emit an error event when a write operation fails', (done) => {
    const db = new Dirty('test.dirty');
    db.on('load', () => {
      db.set('key', 'value', (err: any) => {
        if (err) {
          throw err;
        }
        db.set('key2', 'value2', (err: any) => {
          if (err) {
            throw err;
          }
          db.on('error', (err: any) => {
            expect(err).not.toBeNull();
            done();
          });
          db.set('key3', 'value3', (err: any) => {
            if (err) {
              throw err;
            }
          });
        });
      });
    });
  });
});