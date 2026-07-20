import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';

describe('Dirty', function () {
  it('should not return a string when parsing a row', async function (done) {
    const file = `${path.join(__dirname, 'tmp')}/test.dirty`;
    rimraf.sync(file);

    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        const data = fs.readFileSync(file, 'utf-8');
        const rows = data.split('\n');
        rows.forEach((row) => {
          try {
            const parsedRow = JSON.parse(row);
            if (typeof parsedRow !== 'object') {
              throw new Error('Parsed row is not an object');
            }
          } catch (e) {
            done(e);
          }
        });
        done();
      });
    });
  });
});