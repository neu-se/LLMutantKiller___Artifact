import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event behavior', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should emit drain event when writes complete and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let allWritesCompleted = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
        if (allWritesCompleted) {
          // This is the expected drain event
          if (drainCount === 1) {
            done();
          }
        } else {
          // In mutated code, this will trigger prematurely
          done(new Error('Drain event emitted while writes still in progress'));
        }
      });

      // Perform writes without callbacks to test drain behavior
      db.set('key1', { value: 1 });
      db.set('key2', { value: 2 });
      db.set('key3', { value: 3 });

      // All writes are complete immediately since no callbacks
      allWritesCompleted = true;

      // Force a flush to ensure all writes are processed
      db._flush();

      // Give time for drain event to fire
      setTimeout(() => {
        if (drainCount === 0) {
          done(new Error('Expected drain event was not emitted'));
        }
      }, 50);
    });
  });
});