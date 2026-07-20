import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty close', function () {
  it('should close the db file streams', function (done) {
    const db = new Dirty('tmp.dirty');
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          done();
        });
      });
    });
  });
});