import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should emit drain event after queue is empty when setting multiple values with callbacks', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value', () => {
        db.set('key2', 'value2', () => {
          db.on('drain', () => {
            db.set('key3', 'value3');
            db.on('drain', () => {
              db.close();
              fs.unlinkSync(filePath);
              done();
            });
          });
        });
      });
    });
  }, 10000);
});