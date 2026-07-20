import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty read_close event', () => {
  it('should emit "read_close" event when read stream closes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    // Ensure the file exists by writing initial data
    db.set('testKey', 'testValue', () => {
      // Close the read stream to trigger the 'close' event
      if (db._readStream) {
        db._readStream.destroy();
      }
    });

    db.on('read_close', () => {
      try {
        expect(true).toBe(true); // This line will be reached only if 'read_close' is emitted
        done();
      } catch (error) {
        done(error);
      } finally {
        // Clean up
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
      }
    });

    // Set a timeout to fail the test if the event is not emitted
    setTimeout(() => {
      done(new Error('read_close event was not emitted'));
    }, 1000);
  });
});