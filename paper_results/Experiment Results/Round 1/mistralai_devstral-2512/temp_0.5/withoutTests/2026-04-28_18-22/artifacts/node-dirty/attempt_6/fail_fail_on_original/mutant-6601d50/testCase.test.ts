import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close method', () => {
  it('should properly handle close with pending operations', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const dirty = new Dirty(dbPath);
    let drainEventFired = false;

    dirty.on('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' }, () => {
        dirty.set('key2', { value: 'test2' }, () => {
          // Track drain event
          dirty.on('drain', () => {
            drainEventFired = true;
          });

          // Call close while there are pending operations
          dirty.close();

          // Check after a short delay
          setTimeout(() => {
            // In original code, drain should fire and streams should be closed
            // In mutated code, empty string event won't fire, so drain won't be triggered
            expect(drainEventFired).toBe(true);
            expect(dirty._readStream).toBeNull();
            expect(dirty._writeStream).toBeNull();

            // Clean up
            fs.rmSync(testDir, { recursive: true });
            done();
          }, 100);
        });
      });
    });

    dirty.on('error', (err) => {
      fs.rmSync(testDir, { recursive: true });
      done(err);
    });
  });
});