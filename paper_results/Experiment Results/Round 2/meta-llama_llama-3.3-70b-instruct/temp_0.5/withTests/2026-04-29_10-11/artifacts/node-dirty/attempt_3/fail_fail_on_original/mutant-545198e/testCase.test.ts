import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should correctly load data from file', function (done) {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.on('drain', () => {
        db.close();
        const db2 = new Dirty(filePath);
        db2.on('load', (length) => {
          const data = fs.readFileSync(filePath, 'utf8');
          const lines = data.split('\n');
          const expectedLines = [
            JSON.stringify({ key: 'key1', val: 'value1' }),
            JSON.stringify({ key: 'key2', val: 'value2' }),
          ];
          assert.deepStrictEqual(lines.slice(0, -1), expectedLines);
          done();
        });
      });
    });
  });
});