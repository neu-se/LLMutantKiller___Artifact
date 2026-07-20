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
    let writeCloseEventFired = false;

    dirty.on('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' }, () => {
        dirty.set('key2', { value: 'test2' }, () => {
          // Track events
          dirty.on('drain', () => {
            drainEventFired = true;
          });

          dirty.on('write_close', () => {
            writeCloseEventFired = true;
          });

          // Call close while there are pending operations
          dirty.close();

          // Check after a short delay
          setTimeout(() => {
            // In original code, drain should fire and write_close should follow
            // In mutated code, empty string event won't fire, so drain won't trigger
            expect(drainEventFired).toBe(true);
            expect(writeCloseEventFired).toBe(true);

            // Clean up
            fs.rmSync(testDir, { recursive: true });
            done();
          }, 200);
        });
      });
    });

    dirty.on('error', (err) => {
      fs.rmSync(testDir, { recursive: true });
      done(err);
    });
  });
});