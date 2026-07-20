import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method behavior', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should properly emit write_close event after closing', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      db.set('key1', 'value1');
      db.on('drain', () => {
        const writeStream = (db as any)._writeStream;
        const originalEnd = writeStream.end;
        let endCalled = false;

        writeStream.end = function(...args: any[]) {
          endCalled = true;
          return originalEnd.apply(this, args);
        };

        db.close();

        db.on('write_close', () => {
          expect(endCalled).toBe(true);
          // Check that the stream was actually destroyed
          expect((db as any)._writeStream).toBeNull();
          done();
        });
      });
    });
  });
});