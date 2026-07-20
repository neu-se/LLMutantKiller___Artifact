import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit error event with correct event name when loading corrupted row', (done) => {
    const dirty = new Dirty('test.db');
    const errorMessage = 'Could not load corrupted row: {"key":"test"}';
    const errorEventName = 'error';

    dirty.on('error', (err) => {
      expect(err.message).toBe(errorMessage);
      done();
    });

    dirty.on('load', () => {
      dirty._readStream.emit('data', '{"key":"test"}\n');
    });

    dirty.on('load', () => {
      dirty._readStream.emit('end');
    });

    dirty.on('read_close', () => {
      rimraf('test.db', () => {});
    });
  });
});