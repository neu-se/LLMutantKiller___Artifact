import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty db', () => {
  it('should not emit an empty string event when read stream is closed', (done) => {
    const db = new Dirty();

    db.on('', () => {
      done.fail('Should not emit an empty string event');
    });

    db.on('close', () => {
      db.close();
    });

    setTimeout(() => {
      done();
    }, 100);
  });
});