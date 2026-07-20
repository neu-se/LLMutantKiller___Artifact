import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database write queue processing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should process multiple writes and emit drain when complete', (done) => {
    const db = new Dirty(dbPath);
    let writeCount = 0;
    let drainCount = 0;

    db.on('load', () => {
      // Write multiple values to create a queue
      db.set('key1', { value: 'data1' }, () => {
        writeCount++;
      });
      db.set('key2', { value: 'data2' }, () => {
        writeCount++;
      });
      db.set('key3', { value: 'data3' }, () => {
        writeCount++;
      });
    });

    db.on('drain', () => {
      drainCount++;
      // In the original code, drain should be emitted when queue is empty
      // In the mutated code (if (false)), drain will never be emitted from this path
      if (drainCount === 1 && writeCount === 3) {
        done();
      } else if (drainCount > 1) {
        done(new Error('drain emitted too many times'));
      }
    });

    db.on('error', (err) => {
      done(err);
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      done(new Error('Test timed out - drain event was not emitted'));
    }, 2000);
  });
});