import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database flush behavior', () => {
  it('should flush when queue has items and waitForDrain is false', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Add items to queue
      dirty.set('key1', 'value1', () => {});
      dirty.set('key2', 'value2', () => {});

      // Verify queue has items and waitForDrain is false
      expect(dirty._queue.size).toBeGreaterThan(0);
      expect(dirty._waitForDrain).toBe(false);

      // Get initial file size
      const initialStats = fs.statSync(dbPath);
      const initialSize = initialStats.size;

      // Force flush
      dirty._flush();

      setImmediate(() => {
        // Verify file size has increased
        const finalStats = fs.statSync(dbPath);
        expect(finalStats.size).toBeGreaterThan(initialSize);

        // Verify content was written
        const content = fs.readFileSync(dbPath, 'utf-8');
        const lines = content.trim().split('\n');
        expect(lines.length).toBeGreaterThanOrEqual(2);

        dirty.close();
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      });
    });
  });
});