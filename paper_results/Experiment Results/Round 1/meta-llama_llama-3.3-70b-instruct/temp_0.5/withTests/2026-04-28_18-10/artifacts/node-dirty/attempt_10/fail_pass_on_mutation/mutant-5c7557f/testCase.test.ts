import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should emit drain event after queue is empty when setting multiple values with callbacks', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', undefined);
      db.on('drain', () => {
        if (db.get('key2')!== undefined) {
          throw new Error('Value not deleted');
        }
        db.close();
        fs.unlinkSync(filePath);
        done();
      });
    });
  }, 60000);
});