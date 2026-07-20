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

  it('should emit drain event when write stream drains with empty queue', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      // Write enough data to potentially fill the buffer
      for (let i = 0; i < 50; i++) {
        db.set(`key${i}`, { value: Array(1000).fill('x').join('') }, () => {});
      }

      // After writes complete, check if drain was emitted
      setTimeout(() => {
        if (!drainEmitted) {
          done(new Error('Drain event was not emitted when write stream drained'));
        } else {
          done();
        }
      }, 500);
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