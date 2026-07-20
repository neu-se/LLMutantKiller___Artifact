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

  afterEach((done) => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    done();
  });

  it('should emit drain event when write stream drains and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      // Write data to potentially fill the buffer
      for (let i = 0; i < 20; i++) {
        db.set(`key${i}`, { value: Array(100).fill('x').join('') }, () => {});
      }

      // After writes, clear all data to empty the queue
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          db.set(`key${i}`, undefined, () => {});
        }

        // Check if drain was emitted
        setTimeout(() => {
          if (drainCount === 0) {
            done(new Error('Drain event was not emitted when expected'));
          } else {
            done();
          }
        }, 200);
      }, 200);
    });

    db.on('drain', () => {
      drainCount++;
    });

    // Safety timeout
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 2000);
  });
});