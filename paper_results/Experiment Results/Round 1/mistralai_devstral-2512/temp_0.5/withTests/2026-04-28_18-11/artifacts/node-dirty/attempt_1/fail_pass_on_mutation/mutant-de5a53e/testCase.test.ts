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

  it('should properly destroy write stream after closing', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      db.set('key1', 'value1');
      db.on('drain', () => {
        const writeStream = (db as any)._writeStream;
        const originalDestroy = writeStream.destroy;
        let destroyCalled = false;

        writeStream.destroy = function(...args: any[]) {
          destroyCalled = true;
          return originalDestroy.apply(this, args);
        };

        db.close();

        setImmediate(() => {
          expect(destroyCalled).toBe(true);
          done();
        });
      });
    });
  });
});