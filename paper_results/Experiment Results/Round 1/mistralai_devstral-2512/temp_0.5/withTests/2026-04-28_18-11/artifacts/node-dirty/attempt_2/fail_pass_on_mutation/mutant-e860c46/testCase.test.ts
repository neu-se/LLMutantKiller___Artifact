import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close behavior with in-flight writes', () => {
  const testFile = path.join(__dirname, 'test-close-inflight.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should delay close when there are in-flight writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to ensure we have in-flight writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Immediately try to close
      const closeStart = Date.now();
      db.close();

      // Verify that close is delayed until drain
      db.on('drain', () => {
        const drainTime = Date.now();
        expect(drainTime).toBeGreaterThanOrEqual(closeStart);

        // Verify write_close happens after drain
        db.on('write_close', () => {
          const closeTime = Date.now();
          expect(closeTime).toBeGreaterThanOrEqual(drainTime);

          // Verify all writes completed
          const contents = fs.readFileSync(testFile, 'utf-8');
          const lines = contents.trim().split('\n');
          expect(lines.length).toBe(3);

          done();
        });
      });
    });
  });
});