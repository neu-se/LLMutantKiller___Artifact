import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('emits an error event with a correct event name when a corrupted row is found at the end of the database', (done) => {
    const dirty = new Dirty('test.db');
    let eventName: string | null = null;
    dirty.on('error', (err) => {
      eventName = 'error';
    });
    dirty.on('load', () => {
      dirty._readStream?.emit('end');
      setTimeout(() => {
        expect(eventName).toBe('error');
        done();
      }, 100);
    });
  });
});