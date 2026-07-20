import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should not emit write_close event when close is called twice', (done) => {
    const db = new Dirty('test.dirty');
    let writeCloseEmitted = 0;

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          writeCloseEmitted++;
        });
        db.close();
        setTimeout(() => {
          if (writeCloseEmitted > 1) {
            done(new Error('write_close event emitted twice'));
          } else {
            done();
          }
        }, 100);
      });
    });
  });
});