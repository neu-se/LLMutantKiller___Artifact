import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('dirty api', function () {
  it('should fire drain event after write', function (done) {
    const file = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(file);

    db.set('key', 'value');
    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
      if (drainCount === 2) {
        db.close();
        fs.unlink(file, () => {
          done();
        });
      }
    });
    db.set('key2', 'value2');
  }, 10000);
});