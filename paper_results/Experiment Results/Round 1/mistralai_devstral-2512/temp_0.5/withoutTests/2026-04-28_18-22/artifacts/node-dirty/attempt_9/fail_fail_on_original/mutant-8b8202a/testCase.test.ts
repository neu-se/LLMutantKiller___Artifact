import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event behavior', () => {
  it('should emit drain event only when write queue is empty and no writes are in flight', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainEmittedDuringWrite = false;
    let writeInProgress = false;
    let writeCompleted = false;

    db.on('load', () => {
      // Start a write operation
      writeInProgress = true;
      db.set('key1', { value: 1 }, () => {
        writeInProgress = false;
        writeCompleted = true;
      });

      db.on('drain', () => {
        // In original code, drain should not be emitted while writes are in progress
        // In mutated code, drain will be emitted immediately (while write is still in progress)
        if (writeInProgress && !writeCompleted) {
          drainEmittedDuringWrite = true;
        }
      });

      // Check after a short delay
      setTimeout(() => {
        if (drainEmittedDuringWrite) {
          done(new Error('drain event emitted while write was still in progress'));
        } else if (writeCompleted) {
          done();
        } else {
          done(new Error('Test timed out'));
        }
      }, 100);
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});