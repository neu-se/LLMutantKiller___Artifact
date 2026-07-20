import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty db', function () {
  it('should close correctly', function (done) {
    const db = new Dirty();
    db.on('load', () => {
      db.set('key', 'value', () => {
        db.close();
        db.on('drain', () => {
          done.fail('Unexpected drain event');
        });
        db.on('error', (err) => {
          if (err) {
            done.fail('Error occurred');
          }
        });
        setTimeout(() => {
          done();
        }, 100);
      });
    });
  });
});