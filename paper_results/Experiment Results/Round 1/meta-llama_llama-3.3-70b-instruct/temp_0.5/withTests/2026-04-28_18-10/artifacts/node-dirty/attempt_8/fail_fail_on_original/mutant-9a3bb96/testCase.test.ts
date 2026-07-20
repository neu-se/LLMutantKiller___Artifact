import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should throw an error when close is called twice', (done) => {
    const db = new Dirty('test.dirty');

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.once('write_close', () => {
          try {
            db.close();
            done(new Error('Close method should throw an error when called twice'));
          } catch (err) {
            done();
          }
        });
      });
    });
  });
});