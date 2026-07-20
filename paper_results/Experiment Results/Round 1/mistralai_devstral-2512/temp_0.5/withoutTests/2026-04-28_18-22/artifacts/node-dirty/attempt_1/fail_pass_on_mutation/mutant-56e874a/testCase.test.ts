import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database flush behavior', () => {
  it('should not write to disk when queue is empty and waitForDrain is false', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    // Wait for initial load
    dirty.on('load', () => {
      // Set a value to ensure the file exists
      dirty.set('key1', 'value1', () => {
        // Clear the queue by removing the key
        dirty._queue.clear();
        dirty._waitForDrain = false;

        // Spy on the write method to verify it's not called
        const originalWrite = dirty._writeStream.write;
        let writeCalled = false;
        dirty._writeStream.write = function(...args) {
          writeCalled = true;
          return originalWrite.apply(this, args);
        };

        // Force a flush - should not write anything since queue is empty
        dirty._flush();

        setImmediate(() => {
          // Restore original write method
          dirty._writeStream.write = originalWrite;

          expect(writeCalled).toBe(false);
          dirty.close();
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        });
      });
    });
  });
});