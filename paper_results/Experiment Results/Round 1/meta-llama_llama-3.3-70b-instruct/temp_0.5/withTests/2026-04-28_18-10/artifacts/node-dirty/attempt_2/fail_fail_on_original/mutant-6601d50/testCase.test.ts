import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty db', function () {
  it('should close correctly', function (done) {
    const db = new Dirty();
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('error', (err) => {
          if (err.message.includes('write_close')) {
            done();
          }
        });
      });
    });
  });
});