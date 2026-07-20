import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit error event with correct event name when loading corrupted row', (done) => {
    const dirty = new Dirty('test.db');
    let errorEventName = '';

    dirty.on('error', (err) => {
      errorEventName = 'error';
      expect(errorEventName).toBe('error');
      done();
    });

    dirty.on('load', () => {
      dirty._load();
      if (dirty._readStream) {
        dirty._readStream.emit('data', '{"key":"test"}\n');
      }
    });

    dirty.on('read_close', () => {
      fs.unlink('test.db', () => {});
    });

    fs.writeFileSync('test.db', '{"key":"test"}');
  });
});