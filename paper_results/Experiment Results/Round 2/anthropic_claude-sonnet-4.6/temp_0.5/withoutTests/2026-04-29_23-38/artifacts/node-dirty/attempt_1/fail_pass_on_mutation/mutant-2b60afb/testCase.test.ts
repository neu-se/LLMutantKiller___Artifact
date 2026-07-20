import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event with file-backed database', () => {
  it('should emit drain event after writing data when write stream drains', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.db`);

    // Clean up any existing file
    try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let drainCount = 0;

      db.on('drain', () => {
        drainCount++;
        if (drainCount >= 1) {
          // Drain was emitted - test passes
          try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
          done();
        }
      });

      // Write a key - this should eventually trigger drain
      db.set('testKey', { value: 'testValue' });
    });

    // Set a timeout to fail if drain never fires
    const timeout = setTimeout(() => {
      try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
      done(new Error('drain event was never emitted'));
    }, 5000);

    // Clear timeout if done is called
    const originalDone = done;
    // Override done to clear timeout
    (done as any) = (err?: any) => {
      clearTimeout(timeout);
      originalDone(err);
    };
  });
});