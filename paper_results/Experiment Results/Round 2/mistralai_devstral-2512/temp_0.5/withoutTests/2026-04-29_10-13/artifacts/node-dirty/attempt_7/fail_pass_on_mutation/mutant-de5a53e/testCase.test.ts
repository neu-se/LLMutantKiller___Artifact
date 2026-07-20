import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close method stream destruction', () => {
  it('should properly destroy the write stream when closing', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up and create test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let writeCloseEmitted = false;
    let errorEmitted = false;

    db.on('load', () => {
      db.set('key1', { data: 'value1' }, () => {
        db.close();
      });
    });

    db.on('write_close', () => {
      writeCloseEmitted = true;
      // Check if the write stream is actually destroyed
      if (db._writeStream) {
        try {
          db._writeStream.write('test', () => {
            // If we can write, the stream wasn't properly destroyed
            done(new Error('Write stream was not properly destroyed'));
          });
        } catch (err) {
          // Expected behavior - stream should be destroyed
          done();
        }
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
      if (!writeCloseEmitted && !errorEmitted) {
        done(new Error('Test timed out - neither write_close nor error was emitted'));
      }
    }, 500);
  });
});