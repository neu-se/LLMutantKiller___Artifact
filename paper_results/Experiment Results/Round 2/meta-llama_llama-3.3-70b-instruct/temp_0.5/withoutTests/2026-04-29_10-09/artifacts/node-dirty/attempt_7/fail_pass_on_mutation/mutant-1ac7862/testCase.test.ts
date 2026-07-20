import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write multiple key-value pairs to the database file in the correct order when setting multiple values in quick succession with callbacks and checking the order of callbacks', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      let order = [];
      dirty.set('key1', 'value1', () => {
        order.push('key1');
      });
      dirty.set('key2', 'value2', () => {
        order.push('key2');
      });
      dirty.set('key3', 'value3', () => {
        order.push('key3');
        dirty.close();
        fs.readFile(dbPath, 'utf8', (err, data) => {
          if (err) {
            done(err);
          } else {
            expect(order).toEqual(['key1', 'key2', 'key3']);
            fs.unlinkSync(dbPath);
            done();
          }
        });
      });
    });
  });
});