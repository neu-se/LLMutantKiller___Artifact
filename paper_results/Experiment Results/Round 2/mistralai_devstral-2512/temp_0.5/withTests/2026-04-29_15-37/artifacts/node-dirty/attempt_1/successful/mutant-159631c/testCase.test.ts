import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('read stream close event', () => {
  const testFile = path.join(__dirname, 'test-read-close.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit read_close event when read stream closes', (done) => {
    db = new Dirty(testFile);
    let loadFired = false;
    let readCloseFired = false;

    db.on('load', (length) => {
      loadFired = true;
    });

    db.on('read_close', () => {
      readCloseFired = true;
    });

    // Write some data to trigger the read stream to close
    db.set('key', 'value', () => {
      // Force close the write stream to trigger read stream close
      db.close();
    });

    // Check after a small delay to ensure events have time to fire
    setTimeout(() => {
      expect(loadFired).toBe(true);
      expect(readCloseFired).toBe(true);
      done();
    }, 100);
  });
});