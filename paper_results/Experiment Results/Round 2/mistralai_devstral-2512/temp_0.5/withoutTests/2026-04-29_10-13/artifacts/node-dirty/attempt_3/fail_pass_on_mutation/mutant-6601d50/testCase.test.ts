import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close behavior', () => {
  it('should properly close when called with pending writes', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);

    db.once('load', () => {
      // Add data to create pending writes
      db.set('key1', { value: 'test1' });
      db.set('key2', { value: 'test2' });

      // Track if drain event was emitted
      let drainEmitted = false;
      db.once('drain', () => {
        drainEmitted = true;
      });

      // Call close which should trigger drain event and then close
      db.close();

      // Give some time for the close operation to complete
      setTimeout(() => {
        // In the original code, close() should have been called after drain
        // In the mutated code, close() won't be called (empty event name)
        expect(drainEmitted).toBe(true);
        done();

        // Clean up
        fs.rmSync(testDir, { recursive: true });
      }, 100);
    });
  });
});