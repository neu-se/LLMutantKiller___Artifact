import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database flush behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should process all queued writes in a single flush cycle', (done) => {
    const db = new Dirty(dbPath);
    let writeCount = 0;

    // Override write to count actual write operations
    const originalWrite = db._writeStream.write.bind(db._writeStream);
    db._writeStream.write = function(data, cb) {
      writeCount++;
      return originalWrite(data, cb);
    };

    // Add multiple items to queue
    db.set('key1', { value: 1 }, () => {});
    db.set('key2', { value: 2 }, () => {});
    db.set('key3', { value: 3 }, () => {});

    // Force immediate flush
    setTimeout(() => {
      expect(writeCount).toBe(3);
      done();
    }, 50);
  });
});