import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', () => {
  it('should load data from file correctly', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
      db.on('drain', () => {
        db.close();
        const db2 = new Dirty(filePath);
        db2.on('load', (length) => {
          const data = fs.readFileSync(filePath, 'utf-8');
          const lines = data.split('\n');
          lines.pop(); // Remove the last empty line
          const expectedData = [
            JSON.stringify({ key: 'key', val: 'value' }) + '\n',
            JSON.stringify({ key: 'key2', val: 'value2' }) + '\n',
          ].join('');
          expect(data).toBe(expectedData);
          done();
        });
      });
    });
  });
});