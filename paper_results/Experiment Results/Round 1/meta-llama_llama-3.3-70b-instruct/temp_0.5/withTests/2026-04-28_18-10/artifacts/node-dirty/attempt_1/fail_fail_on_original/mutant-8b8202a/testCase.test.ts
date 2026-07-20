import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('dirty db', () => {
  it('should trigger drain event with correct number of in-flight writes', (done) => {
    const file = 'test.dirty';
    rimraf.sync(file);
    const db = new Dirty(file);

    db.set('key1', 'value1');
    db.set('key2', 'value2');

    db.on('drain', () => {
      db.set('key3', 'value3');
      db.on('drain', () => {
        db.close();
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) throw err;
          const lines = data.split('\n');
          expect(lines.length).toBe(4); // 3 data lines + 1 empty line at the end
          done();
        });
      });
    });
  });
});