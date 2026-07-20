import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty error emission without callback', () => {
  it('should emit error when write fails and no callback was provided', (done) => {
    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, `test-mutant-${Date.now()}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }

    const db = new Dirty(filePath);

    db.on('load', () => {
      // Intercept the write stream to inject an error on next write
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      db._writeStream.write = (data: any, cb: (err: Error | null) => void) => {
        // Call callback with an error to simulate write failure
        setImmediate(() => cb(new Error('Simulated write error')));
        return true;
      };

      // Listen for error event - should be emitted in original code but not in mutated code
      db.on('error', (err: Error) => {
        expect(err.message).toBe('Simulated write error');
        // Clean up
        try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
        done();
      });

      // Set without callback - this means cbs.length === 0
      // In original: if (!cbs.length && err != null) this.emit('error', err) → emits error
      // In mutated: if (false) → never emits error
      db.set('testKey', 'testValue');
    });
  });
});