import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rmSync } from 'fs';

describe('dirty', function () {
  it('should not emit drain event when queue is not empty', function (done) {
    const db = new Dirty('test.dirty');
    let drainCount = 0;
    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 2) {
          done();
        }
      });
    });
  });
});