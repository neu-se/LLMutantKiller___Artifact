import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event emission', () => {
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

  it('should emit drain event when queue is empty and writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writeCallbackCalled = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainEmitted = true;
      });

      // Perform multiple writes to ensure queue processing
      db.set('key1', { data: 'value1' }, () => {
        writeCallbackCalled = true;
      });
      db.set('key2', { data: 'value2' }, () => {});

      // Wait for write to complete
      const checkConditions = () => {
        if (writeCallbackCalled) {
          if (drainEmitted) {
            done();
          } else {
            done(new Error('Drain event was not emitted when queue was empty and writes completed'));
          }
        } else {
          setImmediate(checkConditions);
        }
      };

      setImmediate(checkConditions);
    });
  });
});