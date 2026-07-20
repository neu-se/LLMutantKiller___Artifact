import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should emit drain event when write stream drains and queue becomes empty', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      // First write to fill the buffer
      for (let i = 0; i < 10; i++) {
        db.set(`key${i}`, { value: i }, () => {});
      }

      // Wait for writes to complete
      setTimeout(() => {
        // Clear the queue by setting all keys to undefined
        for (let i = 0; i < 10; i++) {
          db.set(`key${i}`, undefined, () => {});
        }

        // The drain event should be emitted when the queue is empty
        setTimeout(() => {
          if (!drainEmitted) {
            done(new Error('Drain event was not emitted when queue became empty'));
          } else {
            done();
          }
        }, 100);
      }, 100);
    });

    db.on('drain', () => {
      drainEmitted = true;
    });

    // Safety timeout
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 2000);
  });
});