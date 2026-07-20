import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior with in-flight writes', () => {
  it('should properly wait for in-flight writes before closing', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Set a value to create an in-flight write
      dirty.set('testKey', { value: 'testValue' });

      // Force _inFlightWrites to be > 0
      dirty._inFlightWrites = 1;

      // Track if close actually waits for drain
      let closeCompleted = false;
      dirty.on('write_close', () => {
        closeCompleted = true;
      });

      // Immediately close - should wait for drain
      dirty.close();

      // Check if close completed immediately (which would be wrong)
      setTimeout(() => {
        expect(closeCompleted).toBe(false);

        // Manually trigger drain to complete close
        dirty._inFlightWrites = 0;
        dirty.emit('drain');

        // Now close should complete
        setTimeout(() => {
          expect(closeCompleted).toBe(true);

          // Clean up
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        }, 50);
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