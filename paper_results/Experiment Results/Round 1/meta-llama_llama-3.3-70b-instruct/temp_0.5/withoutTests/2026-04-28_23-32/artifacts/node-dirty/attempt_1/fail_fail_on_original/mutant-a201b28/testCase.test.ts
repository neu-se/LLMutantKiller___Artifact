import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rmSync } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should emit error event with a valid error message when a corrupted row is encountered', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('error', (err) => {
      expect(err.message).toBe('Could not load corrupted row: {"key":"test"}');
      rmSync('test.db');
      done();
    });

    const writeStream = dirty._writeStream;
    writeStream.write(JSON.stringify({ key: 'test' }) + '\n', () => {
      dirty._readStream.emit('data', JSON.stringify({ key: 'test' }) + '\n');
    });
  });
});