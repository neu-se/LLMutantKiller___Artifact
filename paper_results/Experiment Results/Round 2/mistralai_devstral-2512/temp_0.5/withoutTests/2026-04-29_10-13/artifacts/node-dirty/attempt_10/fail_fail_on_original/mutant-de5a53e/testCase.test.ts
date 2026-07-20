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
    let streamDestroyed = false;

    db.on('load', () => {
      db.set('key1', { data: 'value1' }, () => {
        // Track when the stream is actually destroyed
        const originalDestroy = db._writeStream?.destroy;
        if (originalDestroy) {
          db._writeStream.destroy = function(...args) {
            streamDestroyed = true;
            return originalDestroy.apply(this, args);
          };
        }
        db.close();
      });
    });

    db.on('write_close', () => {
      writeCloseEmitted = true;
      // In original code, stream should be destroyed before write_close
      // In mutated code, stream won't be destroyed
      if (!streamDestroyed) {
        done(new Error('Stream was not destroyed before write_close event'));
      }
    });

    db.on('drain', () => {
      // This should only be called after stream is properly destroyed
      if (writeCloseEmitted && streamDestroyed) {
        done();
      } else if (writeCloseEmitted && !streamDestroyed) {
        done(new Error('Stream was not destroyed before drain event'));
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