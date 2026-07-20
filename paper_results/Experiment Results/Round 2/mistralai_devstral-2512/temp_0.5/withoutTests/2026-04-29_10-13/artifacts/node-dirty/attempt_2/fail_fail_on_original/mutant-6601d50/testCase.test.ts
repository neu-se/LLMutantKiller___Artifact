import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close behavior', () => {
  it('should emit drain event when closing with pending writes', (done) => {
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

      // Listen for drain event
      db.once('drain', () => {
        // Verify streams are closed after drain
        expect(db._readStream).toBeNull();
        expect(db._writeStream).toBeNull();
        done();

        // Clean up
        fs.rmSync(testDir, { recursive: true });
      });

      // Call close which should trigger drain event
      db.close();
    });
  });
});