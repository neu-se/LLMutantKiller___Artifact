import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not write to disk when _flush is called with _waitForDrain set to true', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2', () => {
        db._waitForDrain = true;
        db._flush();
        setTimeout(() => {
          const stats = fs.statSync(filePath);
          const fileSize = stats.size;
          // If the mutation is present, the file size should be larger than the original size
          // because the _flush method will write to disk even when _waitForDrain is true
          if (fileSize > 0) {
            done(new Error('File size increased unexpectedly'));
          } else {
            done();
          }
        }, 100);
      });
    });
  });
});