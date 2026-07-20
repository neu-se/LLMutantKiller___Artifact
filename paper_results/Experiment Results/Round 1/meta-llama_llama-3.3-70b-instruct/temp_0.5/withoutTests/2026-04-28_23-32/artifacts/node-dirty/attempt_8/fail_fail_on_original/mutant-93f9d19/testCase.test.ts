import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should emit an error event with the correct event name when a corrupted row is found at the end of the db', (done) => {
    const dirty = new Dirty('test.db');
    const errorSpy = jest.fn();
    dirty.on('error', (err: any) => {
      expect(err).toBeInstanceOf(Error);
      expect(typeof dirty.emit).toBe('function');
      done();
    });
    dirty._readStream.emit('end');
  });
});