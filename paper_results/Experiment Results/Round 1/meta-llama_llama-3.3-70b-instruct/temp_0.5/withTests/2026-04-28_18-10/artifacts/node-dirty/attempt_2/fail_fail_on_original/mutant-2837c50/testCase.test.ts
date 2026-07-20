import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty close behavior', () => {
  it('should close the db file streams after drain event', (done) => {
    const db = new Dirty();

    db.on('load', () => {
      db.set('key', 'value', () => {
        db.close();
      });
    });

    db.on('write_close', () => {
      done();
    });
  });
});