import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close with pending writes', () => {
  it('should close the database after drain when close is called with pending writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Set a value to create a pending write situation, then immediately call close
      // We need to call close while there are still pending writes or in-flight writes
      let drainFired = false;
      let writeCloseFired = false;

      db.on('drain', () => {
        drainFired = true;
      });

      db.on('write_close', () => {
        writeCloseFired = true;
        // Clean up
        try {
          fs.rmSync(tmpDir, { recursive: true });
        } catch (e) {
          // ignore cleanup errors
        }
        // write_close should fire, meaning close() was properly called after drain
        expect(drainFired).toBe(true);
        done();
      });

      // Set a value - this will queue a write
      db.set('key1', 'value1');
      
      // Call close immediately - there should be in-flight writes or pending queue
      // In original: this.once('drain', () => this.close()) - will close after drain
      // In mutated: this.once("", () => this.close()) - will never close
      db.close();

      // Set a timeout to fail if write_close never fires (mutant behavior)
      setTimeout(() => {
        if (!writeCloseFired) {
          try {
            fs.rmSync(tmpDir, { recursive: true });
          } catch (e) {
            // ignore
          }
          done(new Error('write_close event never fired - close() was not called after drain'));
        }
      }, 3000);
    });
  });
});