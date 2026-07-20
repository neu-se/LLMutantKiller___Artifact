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
    let writeCalled = false;

    db.on('load', () => {
      // Override write to detect when it's called
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      db._writeStream.write = function(data, cb) {
        writeCalled = true;
        return originalWrite(data, cb);
      };

      // Set a value
      db.set('test-key', { value: 'test' }, () => {
        // Immediately remove it (queue should be empty after this)
        db.rm('test-key');

        // Force a flush attempt
        setImmediate(() => {
          // In original code, _flush should return early when queue is empty
          // In mutated code, it will proceed and call write
          expect(writeCalled).toBe(false);
          done();
        });
      });
    });
  });
});