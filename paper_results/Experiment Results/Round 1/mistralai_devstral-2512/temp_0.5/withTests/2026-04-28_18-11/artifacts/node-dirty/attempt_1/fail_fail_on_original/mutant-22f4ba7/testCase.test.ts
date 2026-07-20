import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close behavior with pending writes', () => {
  const testFile = path.join(__dirname, 'test-close-pending.dirty');
  let db: Dirty;

  beforeEach(() => {
    // Clean up before each test
    try {
      rimraf.sync(testFile);
    } catch (err) {
      // Ignore errors
    }
  });

  afterEach(() => {
    // Clean up after each test
    try {
      rimraf.sync(testFile);
    } catch (err) {
      // Ignore errors
    }
  });

  it('should delay close until all writes are drained', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Set a value with callback to ensure it's queued
      db.set('testKey', 'testValue', (err) => {
        if (err) {
          done(err);
          return;
        }

        // Immediately call close while there are pending writes
        let closeCalled = false;
        let writeCloseEmitted = false;

        // Override close to track when it's called
        const originalClose = db.close.bind(db);
        db.close = () => {
          closeCalled = true;
          originalClose();
        };

        db.on('write_close', () => {
          writeCloseEmitted = true;
        });

        db.close();

        // In the original code, close should be delayed until drain
        // In the mutated code, close will be called immediately
        setImmediate(() => {
          if (closeCalled && !writeCloseEmitted) {
            // This indicates the mutated behavior where close doesn't wait for drain
            done(new Error('Close was called before writes were drained'));
          } else {
            // Original behavior: close waits for drain
            done();
          }
        });
      });
    });
  });
});