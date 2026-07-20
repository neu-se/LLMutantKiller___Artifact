import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain behavior', () => {
  it('should invoke all write callbacks even when backpressure occurs during flush', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Write many large entries rapidly to trigger backpressure (write stream returns false)
      // When backpressure occurs, _waitForDrain is set to true and remaining queue items
      // are held. On drain event, original code checks if queue is non-empty and calls _flush().
      // Mutated code always emits 'drain' without calling _flush(), so queued callbacks never fire.
      const totalWrites = 200;
      const largeValue = 'x'.repeat(65536); // 64KB per entry to trigger backpressure
      let completedCallbacks = 0;

      const timeout = setTimeout(() => {
        cleanup();
        done(new Error(`Only ${completedCallbacks}/${totalWrites} callbacks were called - remaining items were not flushed after drain`));
      }, 10000);

      const cleanup = () => {
        clearTimeout(timeout);
        try {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch (e) {
          // ignore cleanup errors
        }
      };

      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, largeValue, () => {
          completedCallbacks++;
          if (completedCallbacks === totalWrites) {
            cleanup();
            done();
          }
        });
      }
    });

    db.on('error', (_err: Error) => {
      // ignore load errors (e.g. ENOENT on first open)
    });
  }, 15000);
});