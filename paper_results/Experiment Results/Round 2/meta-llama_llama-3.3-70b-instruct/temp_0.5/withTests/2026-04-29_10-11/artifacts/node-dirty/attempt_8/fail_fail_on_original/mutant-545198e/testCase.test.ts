import { Dirty } from '../../../lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', function () {
  it('should correctly handle data chunks with newline', function (done) {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key1', 'value1\n');
      db.on('drain', () => {
        db.close();
        const db2 = new Dirty(filePath);
        db2.on('load', (length: number) => {
          const data = fs.readFileSync(filePath, 'utf8');
          const lines = data.split('\n');
          assert.strictEqual(lines.length, 2); 
          done();
        });
      });
    });
  });
});