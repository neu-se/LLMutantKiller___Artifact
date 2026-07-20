import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event behavior', () => {
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

  it('should emit drain event only when in-flight writes reach zero', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let writesInProgress = 0;

    db.on('load', () => {
      // Track writes in progress
      const originalWrite = db._writeStream.write;
      db._writeStream.write = function(data, cb) {
        writesInProgress++;
        const result = originalWrite.call(this, data, (err) => {
          writesInProgress--;
          if (cb) cb(err);
        });
        return result;
      };

      // Perform writes that will complete asynchronously
      db.set('key1', { value: 'test1' }, () => {});
      db.set('key2', { value: 'test2' }, () => {});
      db.set('key3', { value: 'test3' }, () => {});

      // Check drain behavior
      setImmediate(() => {
        if (drainCount > 0 && writesInProgress > 0) {
          done(new Error('drain emitted while writes still in progress'));
        }
      });
    });

    db.on('drain', () => {
      drainCount++;
      if (writesInProgress === 0 && drainCount === 1) {
        done();
      } else if (writesInProgress > 0) {
        done(new Error('drain emitted while writes still in progress'));
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});