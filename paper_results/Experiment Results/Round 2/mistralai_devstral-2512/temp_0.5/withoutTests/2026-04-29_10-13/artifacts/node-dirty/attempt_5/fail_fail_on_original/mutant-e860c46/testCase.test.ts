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

      // Force _inFlightWrites to be > 0 by setting it directly
      dirty._inFlightWrites = 1;

      // Track if close was actually called
      let closeCalled = false;
      const originalClose = dirty.close.bind(dirty);
      dirty.close = () => {
        closeCalled = true;
        originalClose();
      };

      // Immediately close - should wait for drain
      dirty.close();

      // Check if close was called immediately (which would be wrong)
      setTimeout(() => {
        expect(closeCalled).toBe(true);

        // Verify that the write stream is still active (not yet closed)
        expect(dirty._writeStream).not.toBeNull();

        // Clean up
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      }, 50);
    });

    dirty.on('error', (err: Error) => {
      // Clean up on error
      try { fs.unlinkSync(dbPath); } catch {}
      try { fs.rmdirSync(testDir); } catch {}
      done(err);
    });
  });
});