import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty db', () => {
  it('should emit read_close event when read stream is closed', (done) => {
    const db = new Dirty();

    db.on('read_close', () => {
      done();
    });

    db.close();
  });
});