import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty db', function () {
  it('should close correctly', function (done) {
    const db = new Dirty();
    db.on('load', () => {
      db.set('key', 'value', () => {
        db.close();
        setTimeout(() => {
          if (db._writeStream !== null) {
            done.fail('Write stream is not null after close');
          } else {
            done();
          }
        }, 100);
      });
    });
  });
});