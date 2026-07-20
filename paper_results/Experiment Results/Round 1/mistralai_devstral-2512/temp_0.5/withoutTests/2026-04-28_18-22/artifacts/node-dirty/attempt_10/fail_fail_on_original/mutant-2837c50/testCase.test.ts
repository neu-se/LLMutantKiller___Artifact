import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior', () => {
  it('should properly wait for drain before closing when there are pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.once('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' });
      dirty.set('key2', { value: 'test2' });

      // Track the order of operations
      const operations: string[] = [];
      const originalClose = dirty.close.bind(dirty);

      // Override close to track when it's called
      dirty.close = function() {
        operations.push('close-called');
        if (dirty._queue.size > 0 || dirty._inFlightWrites > 0) {
          operations.push('has-pending-writes');
        }
        return originalClose();
      };

      // Listen for drain event
      dirty.once('drain', () => {
        operations.push('drain-emitted');
      });

      // Force close while there are pending writes
      dirty.close();

      // Check the order of operations
      setImmediate(() => {
        try {
          // In original code, drain should be emitted before streams are closed
          // In mutated code, drain won't trigger proper close
          const hasPending = operations.includes('has-pending-writes');
          const drainEmitted = operations.includes('drain-emitted');

          if (hasPending && !drainEmitted) {
            throw new Error('Drain event should be emitted when there are pending writes');
          }

          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        } catch (err) {
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done(err);
        }
      });
    });

    dirty.on('error', (err) => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  });
});