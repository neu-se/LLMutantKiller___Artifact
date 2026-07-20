import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database flush behavior', () => {
  it('should not flush when queue is empty and waitForDrain is false', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Clear the queue and ensure waitForDrain is false
      dirty._queue.clear();
      dirty._waitForDrain = false;

      // Get initial file size
      const initialStats = fs.statSync(dbPath);
      const initialSize = initialStats.size;

      // Force flush - should not write anything
      dirty._flush();

      setImmediate(() => {
        // Verify file size hasn't changed
        const finalStats = fs.statSync(dbPath);
        expect(finalStats.size).toBe(initialSize);

        dirty.close();
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      });
    });
  });
});