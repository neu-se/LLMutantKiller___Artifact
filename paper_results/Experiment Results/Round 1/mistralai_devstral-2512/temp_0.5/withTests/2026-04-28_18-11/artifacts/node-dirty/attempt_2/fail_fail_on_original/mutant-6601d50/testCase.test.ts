import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close-mutant.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should properly delay close when there are pending writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to ensure we have pending writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Try to close immediately
      const closeResult = db.close();

      // In original code, close() returns undefined and schedules close on 'drain'
      // In mutated code, close() returns undefined but doesn't schedule properly
      expect(closeResult).toBeUndefined();

      // Verify that streams are still open initially
      expect(db['_writeStream']).not.toBeNull();

      // Wait for drain and verify proper closure
      db.on('drain', () => {
        // After drain, streams should eventually close
        setImmediate(() => {
          expect(db['_writeStream']).toBeNull();
          done();
        });
      });
    });
  });
});