import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close behavior', () => {
  it('should properly close streams when called with pending writes', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const dirty = new Dirty(dbPath);

    dirty.once('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' });
      dirty.set('key2', { value: 'test2' });

      // Track when streams are closed
      let readClosed = false;
      let writeClosed = false;

      dirty.once('read_close', () => {
        readClosed = true;
        checkCompletion();
      });

      dirty.once('write_close', () => {
        writeClosed = true;
        checkCompletion();
      });

      // Call close which should wait for drain
      dirty.close();

      function checkCompletion() {
        if (readClosed && writeClosed) {
          // Verify streams are null after close completes
          expect(dirty._readStream).toBeNull();
          expect(dirty._writeStream).toBeNull();

          // Clean up
          fs.rmSync(testDir, { recursive: true });
          done();
        }
      }
    });

    dirty.once('error', (err) => {
      fs.rmSync(testDir, { recursive: true });
      done(err);
    });
  });
});