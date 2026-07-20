import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should close the streams when close is called and there are no pending writes', (done) => {
    const db = new Dirty('test.dirty');

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.once('write_close', () => {
          try {
            db.set('key2', 'value2');
            done(new Error('Streams are still open'));
          } catch (err) {
            done();
          }
        });
      });
    });
  });
});