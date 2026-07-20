import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database queue processing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should not emit drain when queue still has items', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let writeComplete = false;

    db.on('load', () => {
      // Add items to queue
      db.set('key1', { value: 1 });
      db.set('key2', { value: 2 });

      // Add a large item to trigger backpressure
      const largeData = { value: 'x'.repeat(100000) };
      db.set('key3', largeData, () => {
        writeComplete = true;
      });

      // Check drain emissions
      setImmediate(() => {
        if (drainCount > 0 && !writeComplete) {
          done(new Error('Drain emitted before all writes completed'));
        }
      });
    });

    db.on('drain', () => {
      drainCount++;
      if (drainCount === 1 && db._queue.size > 0) {
        done(new Error('Drain emitted while queue still has items'));
      } else if (drainCount === 1 && writeComplete) {
        done();
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});