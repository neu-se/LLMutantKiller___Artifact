import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should emit an error event with the correct event name when a corrupted row is found at the end of the db', (done) => {
    const dirty = new Dirty('test.db');
    const originalEmit = dirty.emit;
    dirty.emit = (event: string) => {
      if (event !== 'error') {
        throw new Error('Error event emitted with incorrect event name');
      }
      return originalEmit.call(dirty, event);
    };
    dirty._readStream.emit('end');
    done();
  });
});