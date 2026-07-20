import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event timing', () => {
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

  it('should emit drain event only after all writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writesCompleted = 0;
    const totalWrites = 3;

    db.on('load', () => {
      // Perform multiple writes
      db.set('key1', { value: 'test1' }, () => {
        writesCompleted++;
        checkCompletion();
      });
      db.set('key2', { value: 'test2' }, () => {
        writesCompleted++;
        checkCompletion();
      });
      db.set('key3', { value: 'test3' }, () => {
        writesCompleted++;
        checkCompletion();
      });
    });

    function checkCompletion() {
      if (writesCompleted === totalWrites) {
        // All writes completed, now check if drain was emitted
        setImmediate(() => {
          if (!drainEmitted) {
            done(new Error('drain event was not emitted after all writes completed'));
          } else {
            done();
          }
        });
      }
    }

    db.on('drain', () => {
      // In the original code, this should only fire once after all writes
      // In the mutated code, this will fire immediately (incorrectly)
      if (writesCompleted < totalWrites) {
        done(new Error('drain event emitted before all writes completed'));
      }
      drainEmitted = true;
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});