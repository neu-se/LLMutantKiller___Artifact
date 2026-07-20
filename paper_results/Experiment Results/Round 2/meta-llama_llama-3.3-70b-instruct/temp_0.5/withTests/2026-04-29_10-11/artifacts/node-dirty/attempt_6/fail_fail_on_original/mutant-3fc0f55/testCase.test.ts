import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should emit drain event after writing to disk', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
      db.on('drain', () => {
        db.close();
        const contents = fs.readFileSync(file, 'utf-8');
        const lines = contents.split('\n');
        if (lines.length < 2 || lines[0] !== '{"key":"key","val":"value"}' || lines[1] !== '{"key":"key2","val":"value2"}') {
          throw new Error('Expected values not found in file');
        }
        fs.unlinkSync(file);
        done();
      });
    });
  });
});