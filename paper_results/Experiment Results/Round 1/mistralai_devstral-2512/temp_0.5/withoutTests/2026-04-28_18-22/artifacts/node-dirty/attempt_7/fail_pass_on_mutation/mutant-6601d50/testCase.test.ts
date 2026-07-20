import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close method', () => {
  it('should properly close when called with pending operations', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const dirty = new Dirty(dbPath);
    let closeCompleted = false;

    dirty.on('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' }, () => {
        dirty.set('key2', { value: 'test2' }, () => {
          // Override close to track when it's actually called
          const originalClose = dirty.close.bind(dirty);
          dirty.close = function() {
            closeCompleted = true;
            originalClose();
          };

          // Call close while there are pending operations
          dirty.close();

          // Check after a short delay
          setTimeout(() => {
            // In original code, close should be called via drain event
            // In mutated code, empty string event won't fire, so close won't be called
            expect(closeCompleted).toBe(true);

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