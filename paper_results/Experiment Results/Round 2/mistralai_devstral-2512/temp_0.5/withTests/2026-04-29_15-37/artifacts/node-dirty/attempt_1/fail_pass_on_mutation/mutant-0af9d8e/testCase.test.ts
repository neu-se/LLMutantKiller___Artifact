import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event emission', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain event when all writes are completed', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to ensure multiple writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify that drain was emitted when inFlightWrites reached 0
          // In the mutated version, drain would be emitted when inFlightWrites > 0
          // which would happen prematurely
          setImmediate(() => {
            // Check that the file was properly written
            const content = fs.readFileSync(testFile, 'utf-8');
            const lines = content.trim().split('\n');
            // Should have 3 lines (one for each key-value pair)
            if (lines.length === 3) {
              done();
            } else {
              done(new Error(`Expected 3 lines in file, got ${lines.length}`));
            }
          });
        }
      });
    });
  });
});