import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not write to disk when queue is empty', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db._queue.clear();
        let initialFileSize = fs.statSync(filePath).size;
        db._flush();
        setTimeout(() => {
          let newFileSize = fs.statSync(filePath).size;
          // If the mutation is present, the file size should increase
          // because the _flush method will write to disk even when the queue is empty
          if (newFileSize === initialFileSize) {
            done();
          } else {
            done(new Error('File size increased unexpectedly'));
          }
        }, 100);
      });
    });
  });
});