import { Dirty } from '../../../../../lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should correctly load data from file', function (done) {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key1', 'value1');
      db.set('key2', 'value2\n');
      db.on('drain', () => {
        db.close();
        const db2 = new Dirty(filePath);
        db2.on('load', (length) => {
          assert.strictEqual(length, 2);
          assert.strictEqual(db2.get('key1'), 'value1');
          assert.strictEqual(db2.get('key2'), 'value2');
          done();
        });
      });
    });
  });
});