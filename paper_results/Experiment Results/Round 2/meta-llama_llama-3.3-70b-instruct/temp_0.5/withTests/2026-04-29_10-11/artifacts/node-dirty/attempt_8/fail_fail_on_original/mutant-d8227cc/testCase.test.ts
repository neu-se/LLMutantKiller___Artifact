import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should load data correctly from file', (done) => {
    const db = new Dirty('test.dirty');

    db.on('load', () => {
      db.set('key', 'value\nwith newline');
      db.on('drain', () => {
        const data = db.get('key');
        expect(data).toBe('value\nwith newline');
        db.close();
        done();
      });
    });
  });
});