import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not write to disk when queue is empty or waiting for drain', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        const stats = fs.statSync(filePath);
        const fileSize = stats.size;
        db.set('key2', 'value2');
        db.on('drain', () => {
          const newStats = fs.statSync(filePath);
          const newFileSize = newStats.size;
          // If the mutation is present, the file size should not increase
          // because the _flush method will not write to disk when the queue is empty or waiting for drain
          if (fileSize === newFileSize) {
            done();
          } else {
            done(new Error('File size increased unexpectedly'));
          }
        });
      });
    });
  });
});