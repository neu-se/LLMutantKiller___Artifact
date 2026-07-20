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

  it('should emit drain event when write stream drains and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // First drain after initial write
          // Now manually trigger the drain event path by writing enough data to fill buffer
          const largeData = { large: 'x'.repeat(10000) };
          db.set('largeKey', largeData, () => {
            // After this large write completes, the drain handler should fire
            // The mutation would prevent this second drain
          });
        } else if (drainCount === 2) {
          // This should only happen in original code
          done();
        }
      });

      // Add initial small item
      db.set('key1', { value: 1 }, () => {});
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      done(new Error('Test timed out - second drain event not emitted'));
    }, 2000);
  });
});