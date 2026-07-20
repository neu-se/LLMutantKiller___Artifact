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

  it('should process all queued items in a single flush cycle when buffer is available', (done) => {
    const db = new Dirty(dbPath);
    let writeOperations = 0;
    const originalWrite = db._writeStream.write.bind(db._writeStream);

    // Intercept write operations to count them
    db._writeStream.write = function(data, cb) {
      writeOperations++;
      return originalWrite(data, cb);
    };

    // Queue multiple items
    db.set('key1', { value: 1 }, () => {});
    db.set('key2', { value: 2 }, () => {});
    db.set('key3', { value: 3 }, () => {});

    // Force flush and verify all items were written
    setTimeout(() => {
      expect(writeOperations).toBe(3);
      expect(db.size()).toBe(3);
      done();
    }, 100);
  });
});