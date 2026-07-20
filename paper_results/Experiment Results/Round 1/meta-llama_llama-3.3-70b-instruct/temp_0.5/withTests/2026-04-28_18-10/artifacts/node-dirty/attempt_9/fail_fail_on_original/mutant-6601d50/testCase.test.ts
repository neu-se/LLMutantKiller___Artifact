import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty db', function () {
  it('should close correctly', function (done) {
    const db = new Dirty();
    db.on('load', () => {
      db.set('key', 'value', () => {
        db.close();
        db.on('write_close', () => {
          if (db.listeners('drain').length > 0) {
            done();
          } else {
            done(new Error('Drain event listener not registered'));
          }
        });
      });
    });
  });
});