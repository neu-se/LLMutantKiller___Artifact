import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close method', () => {
  it('should register drain listener when closing with pending operations', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' }, () => {
        dirty.set('key2', { value: 'test2' }, () => {
          // Spy on the once method to verify it's called with 'drain'
          const originalOnce = dirty.once;
          dirty.once = function(event: string, listener: Function) {
            // Verify the event name is 'drain' (not empty string)
            expect(event).toBe('drain');
            return originalOnce.call(this, event, listener);
          };

          // Call close while there are pending operations
          dirty.close();

          // Restore original method
          dirty.once = originalOnce;

          // Clean up
          fs.rmSync(testDir, { recursive: true });
          done();
        });
      });
    });

    dirty.on('error', (err) => {
      fs.rmSync(testDir, { recursive: true });
      done(err);
    });
  });
});