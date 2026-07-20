import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should close the write stream after close is called', (done) => {
    const db = new Dirty('test.dirty');

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        setTimeout(() => {
          try {
            db.set('key2', 'value2');
            done(new Error('Write stream is still open'));
          } catch (err) {
            done();
          }
        }, 100);
      });
    });
  });
});