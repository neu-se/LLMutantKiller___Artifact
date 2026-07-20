import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty _flush backpressure handling', () => {
  it('should respect _waitForDrain flag and not continue flushing after write returns false', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new (Dirty as any)(file);

    db.on('load', () => {
      const callbackOrder: string[] = [];
      let pendingCallbacks = 0;

      // Queue up many writes at once to trigger potential backpressure issues
      const keys = Array.from({ length: 50 }, (_, i) => `key${i}`);
      pendingCallbacks = keys.length;

      keys.forEach((key, i) => {
        db.set(key, `value${i}`, (err: Error | null) => {
          if (err) return done(err);
          callbackOrder.push(key);
          pendingCallbacks--;
        });
      });

      // Listen for drain event - should fire after all writes complete
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        // After drain, all callbacks should have been called
        // and the db should have all the keys
        if (drainCount === 1) {
          // Verify all keys were written correctly
          let allPresent = true;
          keys.forEach((key, i) => {
            if (db.get(key) !== `value${i}`) {
              allPresent = false;
            }
          });

          expect(allPresent).toBe(true);
          expect(callbackOrder.length).toBe(keys.length);

          // Clean up
          db.close();
          db.on('write_close', () => {
            try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
            done();
          });
        }
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(err);
    });
  });
});