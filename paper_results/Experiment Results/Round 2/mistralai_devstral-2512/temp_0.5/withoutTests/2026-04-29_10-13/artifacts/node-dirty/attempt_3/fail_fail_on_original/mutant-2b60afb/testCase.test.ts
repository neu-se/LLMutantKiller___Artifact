import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database write queue processing', () => {
  const testDir = path.join(__dirname, 'test-db');
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

  it('should emit drain event when queue is empty after writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      db.set('key1', { value: 'data1' }, () => {
        // Queue should be empty now, drain should be emitted
        setImmediate(() => {
          if (drainEmitted) {
            done();
          } else {
            done(new Error('drain event was not emitted when queue became empty'));
          }
        });
      });

      db.on('drain', () => {
        drainEmitted = true;
      });
    });

    db.on('error', (err) => {
      done(err);
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      done(new Error('Test timed out - drain event was not emitted'));
    }, 1000);
  });
});