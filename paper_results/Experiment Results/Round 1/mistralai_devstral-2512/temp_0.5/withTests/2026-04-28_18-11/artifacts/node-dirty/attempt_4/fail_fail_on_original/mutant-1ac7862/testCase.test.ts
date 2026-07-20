import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('test flush behavior with drain condition', () => {
  const testFile = path.join(__dirname, 'test-flush-drain.dirty');

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should emit drain event after all writes complete', (done) => {
    const db = new Dirty(testFile);

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

      // Add a timeout to prevent hanging
      const timeout = setTimeout(() => {
        done.fail('Test timed out - drain event not emitted');
      }, 2000);

      db.on('drain', () => {
        clearTimeout(timeout);

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