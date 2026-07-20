import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event condition', () => {
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

  it('should only emit drain when inFlightWrites is zero and not waiting for drain', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
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
        setImmediate(() => {
          if (drainCount === 0) {
            done(new Error('drain event was not emitted after all writes completed'));
          } else if (drainCount > 1) {
            done(new Error('drain event emitted multiple times'));
          } else {
            done();
          }
        });
      }
    }

    db.on('drain', () => {
      drainCount++;
      // In the mutated version, this will fire immediately when drain is called
      // regardless of inFlightWrites value, causing multiple drain events
      if (drainCount > 1) {
        done(new Error('drain event emitted multiple times'));
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});