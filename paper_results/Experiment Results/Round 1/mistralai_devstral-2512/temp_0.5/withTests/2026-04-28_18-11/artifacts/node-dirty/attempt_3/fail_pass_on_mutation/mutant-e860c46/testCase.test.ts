import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close with pending callbacks', () => {
  const testFile = path.join(__dirname, 'test-close-callbacks.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should wait for pending callbacks before closing', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let callbackCount = 0;
      const expectedCallbacks = 3;

      // Set values with callbacks that will be pending
      db.set('key1', 'value1', () => {
        callbackCount++;
      });
      db.set('key2', 'value2', () => {
        callbackCount++;
      });
      db.set('key3', 'value3', () => {
        callbackCount++;
      });

      // Try to close immediately
      db.close();

      // Verify all callbacks were executed before close completes
      db.on('write_close', () => {
        expect(callbackCount).toBe(expectedCallbacks);
        done();
      });
    });
  });
});