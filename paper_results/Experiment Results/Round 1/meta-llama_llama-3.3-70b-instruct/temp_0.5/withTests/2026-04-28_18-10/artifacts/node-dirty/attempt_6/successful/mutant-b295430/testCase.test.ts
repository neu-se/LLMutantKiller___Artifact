import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty db', () => {
  it('should emit read_close event when file is provided', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('read_close', () => {
      done();
    });

    db.on('load', () => {
      db.close();
    });
  });
});