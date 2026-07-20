import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior', () => {
  it('should wait for in-flight writes to complete before closing', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    // Wait for initial load
    dirty.on('load', () => {
      // Set a value with a callback to ensure it's an in-flight write
      dirty.set('testKey', { value: 'testValue' }, (err) => {
        expect(err).toBeFalsy();

        // Immediately attempt to close - should wait for drain
        dirty.close();

        // Verify that the write stream is still active (not yet closed)
        expect(dirty._writeStream).not.toBeNull();

        // After drain event, streams should be closed
        dirty.on('drain', () => {
          expect(dirty._writeStream).toBeNull();
          expect(dirty._readStream).toBeNull();

          // Clean up
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        });
      });
    });

    dirty.on('error', (err) => {
      // Clean up on error
      try { fs.unlinkSync(dbPath); } catch {}
      try { fs.rmdirSync(testDir); } catch {}
      done(err);
    });
  });
});