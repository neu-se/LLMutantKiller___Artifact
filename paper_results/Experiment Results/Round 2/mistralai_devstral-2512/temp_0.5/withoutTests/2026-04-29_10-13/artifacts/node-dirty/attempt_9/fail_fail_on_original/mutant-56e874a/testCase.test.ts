import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
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

  it('should not write when queue is empty and waitForDrain is false', (done) => {
    const db = new Dirty(dbPath);
    let writeCount = 0;

    db.on('load', () => {
      // Intercept write operations
      const originalWrite = db._writeStream!.write;
      db._writeStream!.write = function(data: any, encoding?: any, cb?: any) {
        writeCount++;
        return originalWrite.call(this, data, encoding, cb);
      };

      // Set a value
      db.set('test-key', { value: 'test' }, () => {
        // Immediately remove it (queue should be empty after this)
        db.rm('test-key');

        // Ensure waitForDrain is false
        db._waitForDrain = false;

        // Force a flush attempt
        setImmediate(() => {
          // In original code, _flush should return early when queue is empty
          // In mutated code, it will proceed and call write
          expect(writeCount).toBe(0);
          done();
        });
      });
    });
  });
});