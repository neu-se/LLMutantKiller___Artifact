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

  it('should flush all queued writes when _flush is called', (done) => {
    const db = new Dirty(dbPath);
    let flushCount = 0;

    // Override _flush to count calls and ensure it processes all items
    const originalFlush = db._flush.bind(db);
    db._flush = function() {
      flushCount++;
      originalFlush();
    };

    // Add multiple items to trigger flush
    db.set('key1', { value: 1 }, () => {});
    db.set('key2', { value: 2 }, () => {});
    db.set('key3', { value: 3 }, () => {});

    // Wait for writes to complete
    setTimeout(() => {
      expect(flushCount).toBeGreaterThan(0);
      expect(db.size()).toBe(3);
      done();
    }, 100);
  });
});