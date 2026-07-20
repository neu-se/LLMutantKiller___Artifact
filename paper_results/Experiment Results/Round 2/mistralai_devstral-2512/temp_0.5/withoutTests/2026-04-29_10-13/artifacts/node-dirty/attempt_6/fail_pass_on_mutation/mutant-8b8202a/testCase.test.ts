import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event mutation test', () => {
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

  it('should emit drain only when inFlightWrites <= 0 and not waiting for drain', (done) => {
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

      // Perform writes
      db.set('key1', { value: 'test1' }, () => {});
      db.set('key2', { value: 'test2' }, () => {});

      // Force a drain check while writes are still in progress
      setImmediate(() => {
        if (drainCount > 0 && writesInProgress > 0) {
          done(new Error('drain emitted while writes still in progress'));
        }
      });
    });

    db.on('drain', () => {
      drainCount++;
      // In the mutated version, this will fire immediately when drain is called
      // regardless of inFlightWrites value
      if (writesInProgress > 0) {
        done(new Error('drain emitted while writes still in progress'));
      } else if (drainCount > 1) {
        done(new Error('drain emitted multiple times'));
      } else {
        done();
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});