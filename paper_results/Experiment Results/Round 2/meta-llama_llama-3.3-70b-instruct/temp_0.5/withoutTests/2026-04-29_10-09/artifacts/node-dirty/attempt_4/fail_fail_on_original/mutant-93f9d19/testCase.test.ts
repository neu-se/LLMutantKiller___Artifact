import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('emits an error event with a valid event name when a corrupted row is found at the end of the database', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(dirty.listeners('error').length).toBe(1);
      done();
    });
    dirty.on('load', () => {
      dirty._readStream.emit('end');
    });
  });
});