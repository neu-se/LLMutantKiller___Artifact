import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('test flush behavior with drain condition', () => {
  const testFile = path.join(__dirname, 'test-flush-drain.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain event after all writes complete', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Set multiple key-value pairs with callbacks
      let callbackCount = 0;
      const totalCallbacks = 3;

      db.set('key1', 'value1', () => {
        callbackCount++;
      });

      db.set('key2', 'value2', () => {
        callbackCount++;
      });

      db.set('key3', 'value3', () => {
        callbackCount++;
      });

      db.on('drain', () => {
        // All callbacks should have been executed
        expect(callbackCount).toBe(totalCallbacks);

        // Verify all items were written to disk
        const contents = fs.readFileSync(testFile, 'utf-8');
        const lines = contents.trim().split('\n');

        // Should have exactly 3 lines (one for each key-value pair)
        expect(lines.length).toBe(3);

        done();
      });
    });
  });
});