import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should not call the callback of the close method twice', (done) => {
    const db = new Dirty('test.dirty');
    let callbackCalled = 0;

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          callbackCalled++;
        });
        db.close();
        setTimeout(() => {
          if (callbackCalled > 1) {
            done(new Error('Callback called twice'));
          } else {
            done();
          }
        }, 100);
      });
    });
  });
});