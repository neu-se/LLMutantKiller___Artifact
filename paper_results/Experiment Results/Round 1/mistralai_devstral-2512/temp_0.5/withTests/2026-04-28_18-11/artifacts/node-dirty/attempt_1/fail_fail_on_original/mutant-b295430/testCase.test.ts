import { Dirty } from "../../../../../../../../../../../lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('read_close event emission', () => {
  const testFile = path.join(__dirname, 'test_read_close.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit read_close event with correct event name', (done) => {
    db = new Dirty(testFile);
    let loadFired = false;

    db.on('load', () => {
      loadFired = true;
      db.close();
    });

    db.on('read_close', () => {
      if (loadFired) {
        done();
      }
    });

    // Ensure cleanup happens even if test fails
    setTimeout(() => {
      db.removeAllListeners();
      done(new Error('Test timed out - read_close event not emitted correctly'));
    }, 2000);
  });
});