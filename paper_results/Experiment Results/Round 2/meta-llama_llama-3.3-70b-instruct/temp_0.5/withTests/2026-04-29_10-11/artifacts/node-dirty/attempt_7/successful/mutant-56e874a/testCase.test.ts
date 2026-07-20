import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not write to disk when _waitForDrain is true', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db._waitForDrain = true;
        db.set('key2', 'value2');
        let initialFileSize = fs.statSync(filePath).size;
        db._flush();
        setTimeout(() => {
          let newFileSize = fs.statSync(filePath).size;
          // If the mutation is present, the file size should increase
          // because the _flush method will write to disk even when _waitForDrain is true
          if (newFileSize > initialFileSize) {
            done(new Error('File size increased unexpectedly'));
          } else {
            done();
          }
        }, 100);
      });
    });
  });
});