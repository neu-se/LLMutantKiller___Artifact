import { Dirty } from '../../../../../../../lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', function () {
  it('should correctly handle data chunks with newline', function (done) {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.on('drain', () => {
        db.close();
        const data = '{"key":"key1","val":"value1"}\n{"key":"key2","val":"value2"}\n';
        fs.writeFileSync(filePath, data);
        const db2 = new Dirty(filePath);
        db2.on('load', (length: number) => {
          assert.strictEqual(length, 2); 
          done();
        });
      });
    });
  });
});