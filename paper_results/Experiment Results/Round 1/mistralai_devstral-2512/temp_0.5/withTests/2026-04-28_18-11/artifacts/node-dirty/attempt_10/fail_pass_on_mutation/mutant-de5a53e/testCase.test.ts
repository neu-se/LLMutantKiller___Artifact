import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('close method behavior', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: any;

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

  it('should properly destroy write stream when close is called', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      db.set('key1', 'value1');
      db.on('drain', () => {
        const writeStream = db._writeStream;
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
  }, 10000);
});