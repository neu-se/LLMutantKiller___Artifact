import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty close behavior', () => {
  it('should close the db file streams after drain event', (done) => {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.set('key', 'value');
    db.on('drain', () => {
      db.close();
      db.on('write_close', () => {
        db.set('key2', 'value2', (err) => {
          if (err) {
            throw err;
          }
          done();
        });
      });
    });
  });
});