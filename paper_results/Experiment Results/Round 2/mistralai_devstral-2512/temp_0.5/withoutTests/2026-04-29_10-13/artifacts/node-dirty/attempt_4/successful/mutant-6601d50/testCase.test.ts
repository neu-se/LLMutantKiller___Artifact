import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close behavior', () => {
  it('should properly close streams when called with pending writes', (done) => {
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

      // Track if write_close event was emitted (indicates proper close)
      let writeCloseEmitted = false;
      db.once('write_close', () => {
        writeCloseEmitted = true;
      });

      // Call close which should trigger drain then close
      db.close();

      // Give time for operations to complete
      setTimeout(() => {
        // In original code: close() is called after drain, streams are properly closed
        // In mutated code: close() is never called (empty event name), streams remain open
        expect(writeCloseEmitted).toBe(true);
        done();

        // Clean up
        fs.rmSync(testDir, { recursive: true });
      }, 200);
    });
  });
});