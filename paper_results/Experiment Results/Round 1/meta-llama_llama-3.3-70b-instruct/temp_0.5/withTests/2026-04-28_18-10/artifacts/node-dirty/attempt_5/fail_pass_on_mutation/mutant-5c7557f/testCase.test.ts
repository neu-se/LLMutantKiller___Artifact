import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should emit drain event after queue is empty and then emit drain again after setting another value', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    let drainCount = 0;
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          db.set('key2', 'value2');
        } else if (drainCount === 2) {
          db.close();
          fs.unlinkSync(filePath);
          done();
        }
      });
    });
  }, 10000);
});