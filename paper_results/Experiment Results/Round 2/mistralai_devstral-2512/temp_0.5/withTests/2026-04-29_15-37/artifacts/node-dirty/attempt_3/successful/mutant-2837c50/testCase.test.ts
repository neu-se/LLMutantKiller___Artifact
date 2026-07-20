import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close-behavior.dirty');
  let db: Dirty;
  let writeCloseCalled = false;

  beforeEach(() => {
    rimraf.sync(testFile);
    writeCloseCalled = false;
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit write_close event when closing with pending writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Add multiple writes to create pending operations
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Track write_close event
      db.on('write_close', () => {
        writeCloseCalled = true;
      });

      // Call close immediately (before drain)
      db.close();

      // In original code: close() waits for drain, then closes streams (write_close fires)
      // In mutated code: close() doesn't wait, streams remain open (write_close never fires)
      setTimeout(() => {
        expect(writeCloseCalled).toBe(true);
        done();
      }, 200);
    });
  });
});