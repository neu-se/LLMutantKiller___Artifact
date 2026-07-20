import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close method stream destruction', () => {
  it('should emit write_close event only after stream is fully destroyed', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up and create test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let writeCloseCount = 0;
    let errorEmitted = false;

    db.on('load', () => {
      db.set('key1', { data: 'value1' }, () => {
        // Override the write stream's destroy method to track calls
        const originalDestroy = db._writeStream?.destroy;
        if (originalDestroy) {
          db._writeStream.destroy = function(...args) {
            writeCloseCount++;
            return originalDestroy.apply(this, args);
          };
        }
        db.close();
      });
    });

    db.on('write_close', () => {
      // In original code, destroy is called before write_close
      // In mutated code, destroy is not called, so writeCloseCount remains 0
      if (writeCloseCount === 0) {
        done(new Error('Stream destroy was not called before write_close event'));
      } else {
        done();
      }
    });

    db.on('error', (err) => {
      errorEmitted = true;
      done(err);
    });

    // Set a timeout to fail the test if it takes too long
    setTimeout(() => {
      if (writeCloseCount === 0 && !errorEmitted) {
        done(new Error('Test timed out - stream destroy was never called'));
      }
    }, 500);
  });
});