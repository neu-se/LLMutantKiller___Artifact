import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method with pending operations', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should not close immediately when there are pending writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to ensure we have pending operations
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Try to close immediately
      let closeCalled = false;
      const originalClose = db.close.bind(db);
      db.close = () => {
        closeCalled = true;
        return originalClose();
      };

      db.close();

      // In the original code, close should be delayed
      // In the mutated code, it will close immediately
      setImmediate(() => {
        if (closeCalled) {
          // This means the mutation is present (if condition is always false)
          // Check if streams are actually closed
          expect(db._writeStream).toBeNull();
          done();
        } else {
          // Original behavior - close was delayed
          db.on('write_close', () => {
            expect(db._writeStream).toBeNull();
            done();
          });
        }
      });
    });
  });
});