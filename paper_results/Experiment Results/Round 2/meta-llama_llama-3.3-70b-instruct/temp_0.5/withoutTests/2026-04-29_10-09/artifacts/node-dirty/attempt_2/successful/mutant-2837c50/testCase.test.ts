import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('Dirty', () => {
  it('should close the file streams when the queue is empty and there are no in-flight writes', (done) => {
    const tmpPath = join(tmpdir(), 'test-dirty-db.txt');
    const dirty = new Dirty(tmpPath);

    dirty.set('key', 'value', () => {
      dirty.set('key', undefined, () => {
        dirty.close();
        // Check if the file streams are closed
        dirty.on('write_close', () => {
          expect(dirty._writeStream).toBeNull();
          expect(dirty._readStream).toBeNull();
          done();
        });
      });
    });
  });
});