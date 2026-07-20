import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty read_close event', () => {
  it('should emit "read_close" event when read stream closes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let readCloseEmitted = false;
    let errorEmitted = false;

    db.on('read_close', () => {
      readCloseEmitted = true;
    });

    db.on('error', () => {
      errorEmitted = true;
    });

    // Ensure the file exists by writing initial data
    db.set('testKey', 'testValue', () => {
      // Close the read stream to trigger the 'close' event
      if (db._readStream) {
        db._readStream.destroy();
      }
    });

    // Wait for events to be processed
    setTimeout(() => {
      try {
        expect(readCloseEmitted).toBe(true);
        expect(errorEmitted).toBe(false);
        done();
      } catch (error) {
        done(error);
      } finally {
        // Clean up
        if (fs.existsSync(dbPath)) {
          fs.unlinkSync(dbPath);
        }
        fs.rmdirSync(testDir);
        db.close();
      }
    }, 500);
  });
});