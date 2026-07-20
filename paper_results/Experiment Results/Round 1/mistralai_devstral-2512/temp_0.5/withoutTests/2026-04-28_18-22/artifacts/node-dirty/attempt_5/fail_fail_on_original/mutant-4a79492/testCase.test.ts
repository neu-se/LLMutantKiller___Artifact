import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain behavior', () => {
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

  it('should not emit drain when queue still has items', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      // Add multiple items to queue
      db.set('key1', { value: 1 });
      db.set('key2', { value: 2 });

      // Add a large item to trigger backpressure
      const largeData = { value: 'x'.repeat(100000) };
      db.set('key3', largeData);

      // Check if drain was emitted prematurely
      setImmediate(() => {
        if (drainEmitted) {
          done(new Error('Drain event was emitted while queue still had items'));
        } else {
          // Wait a bit more to ensure drain isn't emitted
          setTimeout(() => {
            if (drainEmitted) {
              done(new Error('Drain event was emitted while queue still had items'));
            } else {
              done();
            }
          }, 100);
        }
      });
    });

    db.on('drain', () => {
      drainEmitted = true;
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});