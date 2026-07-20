import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should emit drain event when write stream drains and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      // Set a value to trigger a write
      db.set('testKey', { value: 'test' }, () => {
        // Force the write stream to be busy by writing a large amount of data
        const largeData = Array(1000).fill({ key: 'large', value: 'x'.repeat(1000) });
        for (const item of largeData) {
          db.set(item.key, item.value, () => {});
        }

        // After a delay, check if drain was emitted
        setTimeout(() => {
          if (drainCount === 0) {
            done(new Error('Drain event was not emitted when write stream drained'));
          } else {
            done();
          }
        }, 500);
      });
    });

    db.on('drain', () => {
      drainCount++;
    });

    // Safety timeout
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 2000);
  });
});