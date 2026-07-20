import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database flush behavior', () => {
  it('should flush pending writes when queue has items and waitForDrain is false', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Add items to queue
      dirty.set('key1', 'value1', () => {});
      dirty.set('key2', 'value2', () => {});

      // Verify queue has items
      expect(dirty._queue.size).toBe(2);
      expect(dirty._waitForDrain).toBe(false);

      // Track writes
      let writeCount = 0;
      const originalWrite = dirty._writeStream.write;
      dirty._writeStream.write = function(...args) {
        writeCount++;
        return originalWrite.apply(this, args);
      };

      // Force flush
      dirty._flush();

      setImmediate(() => {
        // Restore original write
        dirty._writeStream.write = originalWrite;

        // Verify writes occurred
        expect(writeCount).toBeGreaterThan(0);

        // Verify file was updated
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