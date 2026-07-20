import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('emits an error event with a valid event name when a corrupted row is found at the end of the database', (done) => {
    const dirty = new Dirty('test.db');
    let errorEmitted = false;
    dirty.on('error', (err) => {
      expect(err.message).toContain('Corrupted row at the end of the db:');
      errorEmitted = true;
    });
    dirty.on('load', () => {
      dirty._readStream.emit('end');
      setTimeout(() => {
        expect(errorEmitted).toBe(true);
        done();
      }, 100);
    });
  });
});