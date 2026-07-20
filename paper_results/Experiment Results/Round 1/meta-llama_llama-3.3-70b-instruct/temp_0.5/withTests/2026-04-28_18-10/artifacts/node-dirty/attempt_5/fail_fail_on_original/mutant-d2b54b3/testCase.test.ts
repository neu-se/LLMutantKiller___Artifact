import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('dirty api', function () {
  it('should fire drain event after write when inFlightWrites is 0 and queue is empty', function (done) {
    const file = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(file);

    db.set('key', 'value');
    db.on('load', () => {
      db._inFlightWrites = 0;
      db._queue.clear();
      db._writeStream.emit('drain');
      setTimeout(() => {
        if (db.listenerCount('drain') === 0) {
          done(new Error('Drain event not fired'));
        }
      }, 100);
    });
  });
});