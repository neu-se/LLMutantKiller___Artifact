import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('read stream close event', () => {
  const testFile = path.join(__dirname, 'test.dirty');
  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit read_close event when read stream closes', (done) => {
    const db = new Dirty(testFile);
    let loadFired = false;
    let readCloseFired = false;

    db.on('load', (length) => {
      loadFired = true;
    });

    db.on('read_close', () => {
      readCloseFired = true;
      if (loadFired) {
        expect(readCloseFired).toBe(true);
        done();
      }
    });

    // Force the read stream to close by writing and then closing
    db.set('key', 'value', () => {
      db.close();
    });
  });
});