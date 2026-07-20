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

  it('should destroy read stream when close is called', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        const readStream = (db as any)._readStream;
        expect(readStream).not.toBeNull();
        db.close();
        setImmediate(() => {
          expect((db as any)._readStream).toBeNull();
          done();
        });
      });
    });
  });
});