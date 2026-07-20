import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db', function () {
  it('should emit drain event when queue is empty after writing to file', function (done) {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    const key = 'testKey';
    const value = 'testValue';

    db.set(key, value);

    db.on('drain', () => {
      db.close();
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          done(err);
        } else {
          const lines = data.split('\n');
          if (lines.length === 2 && lines[0] === JSON.stringify({ key, val: value })) {
            done();
          } else {
            done(new Error('Drain event not emitted correctly'));
          }
        }
      });
    });
  });
});