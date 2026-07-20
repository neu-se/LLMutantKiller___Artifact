import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should not emit write_close event twice after close is called', (done) => {
    const db = new Dirty('test.dirty');
    let writeCloseCount = 0;

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          writeCloseCount++;
          if (writeCloseCount > 1) {
            done(new Error('write_close event emitted twice'));
          }
        });
        db.once('write_close', () => {
          db.close();
        });
      });
    });

    setTimeout(() => {
      done();
    }, 100);
  });
});