import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('dirty api', function () {
  it('should fire drain event after write when queue is empty', function (done) {
    const file = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(file);

    db.set('key', 'value');
    db.on('load', () => {
      db._queue.clear();
      db._writeStream.emit('drain');
    });
    db.on('drain', () => {
      db.close();
      fs.unlink(file, () => {
        done();
      });
    });
  });
});