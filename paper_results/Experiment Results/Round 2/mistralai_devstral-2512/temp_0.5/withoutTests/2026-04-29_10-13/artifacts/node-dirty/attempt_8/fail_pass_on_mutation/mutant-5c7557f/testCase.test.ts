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
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      // Perform a write operation
      db.set('testKey', { data: 'testValue' }, () => {
        // After callback, queue should be empty and writes complete
        // The drain event should fire immediately in original code
        // but won't in mutated code due to empty if block
        setImmediate(() => {
          if (drainCount > 0) {
            done();
          } else {
            done(new Error('Drain event was not emitted when queue was empty and writes completed'));
          }
        });
      });
    });
  });
});