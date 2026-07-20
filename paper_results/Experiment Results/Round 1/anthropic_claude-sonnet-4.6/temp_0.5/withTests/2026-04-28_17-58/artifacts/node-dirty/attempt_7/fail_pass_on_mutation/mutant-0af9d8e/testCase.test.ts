import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event correctness with backpressure', () => {
  it('should only emit drain after all data is fully written and readable from a new db instance', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-verify-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);

    db.on('load', () => {
      const timeout = setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done(new Error('timed out'));
      }, 8000);

      // Use large values to trigger backpressure
      const largeValue = 'x'.repeat(64 * 1024);
      const keys = ['key1', 'key2', 'key3'];

      db.once('drain', () => {
        // When drain fires, ALL data should be flushed to disk.
        // With the mutation, drain fires prematurely (while a write is still
        // in-flight), so the file may be incomplete.
        // Load a new db from the file and verify all keys are present.
        const db2 = new Dirty(file);
        db2.on('load', (size: number) => {
          clearTimeout(timeout);
          try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
          try {
            if (size !== keys.length) {
              done(new Error(`Expected ${keys.length} keys but got ${size}`));
            } else {
              done();
            }
          } catch (e) {
            done(e);
          }
        });
        db2.on('error', (err: Error) => {
          clearTimeout(timeout);
          try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
          done(err);
        });
      });

      keys.forEach(k => db.set(k, largeValue));
    });
  });
});