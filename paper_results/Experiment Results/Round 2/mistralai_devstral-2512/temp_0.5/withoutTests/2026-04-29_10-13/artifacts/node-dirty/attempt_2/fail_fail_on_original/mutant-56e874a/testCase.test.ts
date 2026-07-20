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

  it('should not write to disk when queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let writeCount = 0;

    db.on('load', () => {
      // Override write to count writes
      const originalWrite = db._writeStream.write;
      db._writeStream.write = function(data, cb) {
        writeCount++;
        return originalWrite.call(this, data, cb);
      };

      // Set a value
      db.set('test-key', { value: 'test' }, () => {
        // Immediately remove it (queue should be empty after this)
        db.rm('test-key');

        // Force a flush attempt
        setImmediate(() => {
          // Check that no writes occurred
          expect(writeCount).toBe(0);
          done();
        });
      });
    });
  });
});