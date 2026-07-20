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
      // Set initial value to create the file
      dirty.set('key1', 'value1', () => {
        // Clear the queue and ensure waitForDrain is false
        dirty._queue.clear();
        dirty._waitForDrain = false;

        // Track if write was called
        let writeCalled = false;
        const originalWrite = dirty._writeStream.write;
        dirty._writeStream.write = function(...args) {
          writeCalled = true;
          return originalWrite.apply(this, args);
        };

        // Force flush - should not write anything
        dirty._flush();

        setImmediate(() => {
          // Restore original write
          dirty._writeStream.write = originalWrite;

          // Verify no write occurred
          expect(writeCalled).toBe(false);

          // Verify file wasn't modified
          const stats = fs.statSync(dbPath);
          const content = fs.readFileSync(dbPath, 'utf-8');
          const lines = content.trim().split('\n');
          expect(lines.length).toBe(1);

          dirty.close();
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        });
      });
    });
  });
});