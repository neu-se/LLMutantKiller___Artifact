import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db test', function () {
  it('should emit drain only once after all writes are complete', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    let drainCount = 0;

    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          db.close();
          done();
        }
      });
    });

    db.on('write_close', () => {
      if (drainCount !== 1) {
        done(new Error('Drain event not emitted once'));
      }
      fs.unlink(file, () => {
        // do nothing
      });
    });
  });
});