import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close method', () => {
  it('should emit drain event when closing with pending operations', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const dirty = new Dirty(dbPath);
    let drainEmitted = false;

    dirty.on('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' }, () => {
        dirty.set('key2', { value: 'test2' }, () => {
          // Call close while there might be pending operations
          dirty.close();
        });
      });
    });

    dirty.on('drain', () => {
      drainEmitted = true;
    });

    // Check after a short delay if drain was emitted
    setTimeout(() => {
      expect(drainEmitted).toBe(true);

      // Clean up
      fs.rmSync(testDir, { recursive: true });
      done();
    }, 100);
  });
});