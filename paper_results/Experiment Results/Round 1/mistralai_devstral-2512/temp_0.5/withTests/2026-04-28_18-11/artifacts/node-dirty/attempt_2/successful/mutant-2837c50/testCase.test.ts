import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method behavior with pending writes', () => {
  it('should properly close streams when called with pending writes', (done) => {
    const testFile = path.join(__dirname, 'test-close-pending.dirty');
    rimraf.sync(testFile);

    const db = new Dirty(testFile);
    db.on('load', () => {
      // Add multiple writes to ensure we have pending operations
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Force a situation where close is called before all writes complete
      setImmediate(() => {
        db.close();
      });
    });

    let writeCloseEmitted = false;
    db.on('write_close', () => {
      writeCloseEmitted = true;
    });

    // Check after a reasonable time if write_close was emitted
    setTimeout(() => {
      if (!writeCloseEmitted) {
        done(new Error('write_close event was not emitted - streams were not properly closed'));
      } else {
        done();
      }
    }, 100);
  });
});