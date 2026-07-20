import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should emit an error event with the correct event name when a corrupted row is found at the end of the db', (done) => {
    const dirty = new Dirty('test.db');
    const errorSpy = jest.fn();
    dirty.on('error', errorSpy);
    dirty._readStream.emit('end');
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy.mock.calls[0][0] instanceof Error).toBe(true);
    expect(dirty.listeners('error').length).toBe(1);
    done();
  });
});