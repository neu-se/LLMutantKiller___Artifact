import { Dirty } from '../../../lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', function () {
  it('should correctly handle data chunks without newline', function (done) {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key1', 'value1');
      db.on('drain', () => {
        db.close();
        const data = 'key2,value2';
        fs.appendFileSync(filePath, data);
        const db2 = new Dirty(filePath);
        db2.on('load', (length) => {
          assert.strictEqual(length, 1); // This should fail on the mutated code
          done();
        });
      });
    });
  });
});