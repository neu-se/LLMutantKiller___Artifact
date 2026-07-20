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

  it('should write all queued items in a single flush when buffer is available', (done) => {
    const db = new Dirty(dbPath);
    let flushCompleted = false;
    let writeCount = 0;

    // Track write operations
    const originalWrite = db._writeStream.write.bind(db._writeStream);
    db._writeStream.write = function(data, cb) {
      writeCount++;
      const result = originalWrite(data, cb);
      if (writeCount === 3 && !flushCompleted) {
        flushCompleted = true;
        expect(db.size()).toBe(3);
        done();
      }
      return result;
    };

    // Queue multiple items
    db.set('key1', { value: 1 }, () => {});
    db.set('key2', { value: 2 }, () => {});
    db.set('key3', { value: 3 }, () => {});

    // Force immediate flush
    db._flush();
  });
});