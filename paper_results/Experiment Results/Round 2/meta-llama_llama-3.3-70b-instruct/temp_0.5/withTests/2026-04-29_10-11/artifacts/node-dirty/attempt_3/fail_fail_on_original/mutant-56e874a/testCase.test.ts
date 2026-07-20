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
        db._flush();
        setTimeout(() => {
          const stats = fs.statSync(filePath);
          const fileSize = stats.size;
          // If the mutation is present, the file size should be larger than the original size
          // because the _flush method will write to disk even when the queue is empty
          const originalFileSize = `${JSON.stringify({key: 'key', val: 'value'})}\n`.length;
          if (fileSize > originalFileSize) {
            done(new Error('File size increased unexpectedly'));
          } else {
            done();
          }
        }, 100);
      });
    });
  });
});