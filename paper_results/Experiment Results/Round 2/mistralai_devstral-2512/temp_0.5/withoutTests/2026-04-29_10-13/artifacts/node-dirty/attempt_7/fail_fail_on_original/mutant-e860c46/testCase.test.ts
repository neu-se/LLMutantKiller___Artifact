import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with in-flight writes', () => {
  it('should wait for in-flight writes before closing', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Set a value to create an in-flight write
      dirty.set('testKey', { value: 'testValue' });

      // Force _inFlightWrites to be > 0
      dirty._inFlightWrites = 1;

      // Track if close was called recursively
      let closeRecursionCount = 0;
      const originalClose = dirty.close.bind(dirty);
      dirty.close = () => {
        closeRecursionCount++;
        if (closeRecursionCount > 1) {
          // This should not happen in the original code
          expect(true).toBe(false);
        }
        originalClose();
      };

      // Immediately close - should wait for drain
      dirty.close();

      // Check after a short delay
      setTimeout(() => {
        expect(closeRecursionCount).toBe(1);

        // Clean up
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      }, 100);
    });

    dirty.on('error', (err: Error) => {
      // Clean up on error
      try { fs.unlinkSync(dbPath); } catch {}
      try { fs.rmdirSync(testDir); } catch {}
      done(err);
    });
  });
});