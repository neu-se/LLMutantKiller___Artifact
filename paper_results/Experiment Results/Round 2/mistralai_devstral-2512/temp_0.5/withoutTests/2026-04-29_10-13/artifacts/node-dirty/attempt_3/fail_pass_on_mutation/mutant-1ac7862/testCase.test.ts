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
    let writesProcessed = 0;
    const expectedWrites = 3;

    // Track when all writes complete
    const checkCompletion = () => {
      writesProcessed++;
      if (writesProcessed === expectedWrites) {
        expect(db.size()).toBe(expectedWrites);
        done();
      }
    };

    // Queue multiple writes
    db.set('key1', { value: 1 }, checkCompletion);
    db.set('key2', { value: 2 }, checkCompletion);
    db.set('key3', { value: 3 }, checkCompletion);

    // Force flush by directly calling _flush
    db._flush();
  });
});