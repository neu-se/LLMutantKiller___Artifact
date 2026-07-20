import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty close method stream destruction', () => {
  it('should emit write_close event after stream is destroyed', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up and create test directory
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let writeCloseEmitted = false;
    let errorEmitted = false;

    db.on('load', () => {
      db.set('key1', { data: 'value1' }, () => {
        // Force close while there's an active write stream
        db.close();
      });
    });

    db.on('write_close', () => {
      writeCloseEmitted = true;
      // Give a small delay to ensure no error is emitted after write_close
      setTimeout(() => {
        if (!errorEmitted) {
          done();
        }
      }, 100);
    });

    db.on('error', (err) => {
      errorEmitted = true;
      done(err);
    });

    // Set a timeout to fail the test if neither event occurs
    setTimeout(() => {
      if (!writeCloseEmitted && !errorEmitted) {
        done(new Error('Test timed out - neither write_close nor error was emitted'));
      }
    }, 500);
  });
});