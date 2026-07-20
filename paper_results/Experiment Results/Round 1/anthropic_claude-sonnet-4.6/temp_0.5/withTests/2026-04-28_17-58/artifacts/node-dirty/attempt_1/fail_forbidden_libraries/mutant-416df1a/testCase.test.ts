import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty error emission when write fails with no callback', () => {
  it('should emit error event when write fails and no callback is provided', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbFile = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(dbFile);

    db.on('load', () => {
      // Set a value without a callback so cbs.length === 0
      db.set('testkey', 'testval');

      // Now destroy the write stream to simulate a write error
      // by making the underlying stream emit an error
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let errorInjected = false;

      db._writeStream.write = function(data: any, cb: any) {
        if (!errorInjected) {
          errorInjected = true;
          // Call the callback with an error to simulate write failure
          if (typeof cb === 'function') {
            process.nextTick(() => cb(new Error('Simulated write error')));
          }
          return true;
        }
        return originalWrite(data, cb);
      };

      db.on('error', (err: Error) => {
        // Original code: emits error when cbs.length === 0 and err != null
        expect(err).toBeDefined();
        expect(err.message).toBe('Simulated write error');
        
        // Cleanup
        try {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch (e) { /* ignore */ }
        
        done();
      });

      // Trigger another set to cause a flush with the mocked write
      db.set('anotherkey', 'anotherval');
    });
  });
});