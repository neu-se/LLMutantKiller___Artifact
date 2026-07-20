import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should emit an error event with the correct event name when a corrupted row is found at the end of the db', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('error', (err) => {
      expect(err.message).toBe('Corrupted row at the end of the db: ');
      done();
    });
    dirty._readStream.emit('end');
  });
});