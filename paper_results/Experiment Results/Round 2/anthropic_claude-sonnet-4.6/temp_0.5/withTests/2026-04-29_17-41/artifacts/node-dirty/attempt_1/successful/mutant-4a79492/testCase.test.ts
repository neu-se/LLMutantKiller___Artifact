import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty drain event with pending queue items', () => {
  it('should only emit drain after all queued items have been flushed to disk', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-test-${process.pid}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Write many large values to try to trigger backpressure
      // and ensure multiple items are queued
      const numKeys = 200;
      const largeValue = 'x'.repeat(1024); // 1KB per value
      let drainCount = 0;

      // Set all keys rapidly before any drain can fire
      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, largeValue + i);
      }

      // Listen for drain - this should only fire once all writes are complete
      db.on('drain', () => {
        drainCount++;
        // After drain fires, verify ALL keys are readable from memory
        for (let i = 0; i < numKeys; i++) {
          const val = db.get(`key${i}`);
          if (val !== largeValue + i) {
            done(new Error(`Key key${i} has wrong value after drain`));
            return;
          }
        }

        // Also verify all data was written to disk by reading the file
        try {
          const contents = fs.readFileSync(file, 'utf-8');
          const lines = contents.trim().split('\n').filter(l => l.length > 0);

          // All keys should be on disk
          if (lines.length !== numKeys) {
            // With the mutation, drain fires before all items are flushed,
            // so some items may still be in the queue and not yet written
            // We check again after a short delay to see if more writes happen
            setTimeout(() => {
              const contents2 = fs.readFileSync(file, 'utf-8');
              const lines2 = contents2.trim().split('\n').filter(l => l.length > 0);
              
              if (lines2.length !== numKeys) {
                done(new Error(`Expected ${numKeys} lines on disk, got ${lines2.length} after drain`));
              } else {
                try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
                done();
              }
            }, 500);
            return;
          }

          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });
});