import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rmSync } from 'fs';

describe('dirty', function () {
  it('should emit drain event when queue is empty', function (done) {
    const db = new Dirty('test.dirty');
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.set('key', 'value');
        db.on('drain', () => {
          rmSync('test.dirty');
          done();
        });
      });
    });
  });
});