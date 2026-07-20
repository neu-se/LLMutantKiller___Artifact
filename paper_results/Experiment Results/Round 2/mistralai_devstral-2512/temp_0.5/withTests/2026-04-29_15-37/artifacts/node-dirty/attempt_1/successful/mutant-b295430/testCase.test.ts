// testCase.test.ts
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('read_close event emission', () => {
  const testFile = path.join(__dirname, 'test.dirty');

  it('should emit "read_close" event when read stream closes', (done) => {
    const db = new Dirty(testFile);
    let readCloseEmitted = false;

    db.on('read_close', () => {
      readCloseEmitted = true;
    });

    db.on('load', () => {
      // Close the read stream to trigger the 'close' event
      if (db._readStream) {
        db._readStream.destroy();
      }
    });

    // Wait a bit for the event to be emitted
    setTimeout(() => {
      if (!readCloseEmitted) {
        done(new Error('read_close event was not emitted'));
      } else {
        done();
      }
    }, 100);
  });
});