import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
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

  it('should emit drain event when queue becomes empty after writes complete', (done) => {
    const db = new Dirty(dbPath);
    let firstDrain = true;

    db.on('load', () => {
      db.on('drain', () => {
        if (firstDrain) {
          firstDrain = false;
          // After first drain, manually trigger a flush when queue is empty
          // This should emit another drain in original code but not in mutated code
          setImmediate(() => {
            db._flush();
            setTimeout(() => {
              // If we get here without another drain, the mutation is present
              done(new Error('Expected second drain event when queue is empty'));
            }, 100);
          });
        } else {
          // This should only be reached in original code
          done();
        }
      });

      // Add an item to trigger initial flush
      db.set('key1', { value: 1 }, () => {});
    });
  });
});