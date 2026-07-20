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

      // Immediately close - should wait for drain
      dirty.close();

      // Track if drain event was fired
      let drainFired = false;
      dirty.on('drain', () => {
        drainFired = true;
      });

      // Check after a short delay if drain was fired
      setTimeout(() => {
        expect(drainFired).toBe(true);

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