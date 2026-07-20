import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rimraf } from 'rimraf';
import { promises as fsp } from 'fs';

describe('dirty api', function () {
  it('should emit drain event when queue is empty', function (done) {
    const file = 'tmp/test.dirty';
    rimraf.sync(file);
    const db = new Dirty(file);
    db.set('key', 'value');
    db.on('drain', () => {
      db.set('key2', 'value2');
      db.on('drain', () => {
        db.set('key3', 'value3');
        db.on('drain', () => {
          assert.strictEqual(db._queue.size, 0);
          db.set('key4', 'value4');
          db.on('drain', () => {
            assert.strictEqual(db._queue.size, 0);
            done();
          });
        });
      });
    });
  });
});