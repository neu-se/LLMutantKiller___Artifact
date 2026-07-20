import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event behavior', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain event after write stream drains', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Write enough data to potentially trigger backpressure
      const largeValue = 'x'.repeat(10000);
      db.set('key1', largeValue);
      db.set('key2', largeValue);
      db.set('key3', largeValue);

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify the data was written correctly
          const contents = fs.readFileSync(testFile, 'utf-8');
          const lines = contents.trim().split('\n');
          expect(lines.length).toBe(3);
          done();
        }
      });
    });
  });
});