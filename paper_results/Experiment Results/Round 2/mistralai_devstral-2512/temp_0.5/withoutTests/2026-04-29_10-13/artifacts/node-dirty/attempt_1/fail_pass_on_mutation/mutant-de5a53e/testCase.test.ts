import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty close method', () => {
  it('should properly destroy the write stream after closing', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Ensure clean state
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let writeClosed = false;
    let readClosed = false;
    let drainEmitted = false;

    db.on('load', () => {
      db.set('test', { value: 'data' }, () => {
        db.close();
      });
    });

    db.on('write_close', () => {
      writeClosed = true;
      checkCompletion();
    });

    db.on('read_close', () => {
      readClosed = true;
      checkCompletion();
    });

    db.on('drain', () => {
      drainEmitted = true;
      checkCompletion();
    });

    function checkCompletion() {
      if (writeClosed && readClosed && drainEmitted) {
        // Verify the write stream is actually destroyed by attempting to write
        // This should fail if the stream is properly destroyed
        try {
          if (db._writeStream) {
            db._writeStream.write('test', () => {
              // If we get here, the stream wasn't properly destroyed
              done(new Error('Write stream was not properly destroyed'));
            });
          } else {
            // Stream is null/undefined, which is correct
            done();
          }
        } catch (err) {
          // Expected behavior - stream should be destroyed
          done();
        }
      }
    }
  });
});