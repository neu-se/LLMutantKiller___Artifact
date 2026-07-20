import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty db', function () {
  it('should close correctly', function (done) {
    const db = new Dirty();
    db.on('load', () => {
      db.set('key', 'value');
      db.close();
      db.on('write_close', () => {
        db.once('drain', () => {
          done();
        });
        setTimeout(() => {
          done.fail('Drain event not emitted');
        }, 100);
      });
    });
  });
});