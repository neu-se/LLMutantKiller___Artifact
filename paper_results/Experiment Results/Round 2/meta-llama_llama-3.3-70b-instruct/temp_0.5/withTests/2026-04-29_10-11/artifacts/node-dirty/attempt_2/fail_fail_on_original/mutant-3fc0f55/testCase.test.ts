import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should emit drain event after writing to disk and then write another value', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.set('key2', 'value2');
        db.on('drain', () => {
          db.close();
          const contents = fs.readFileSync(file, 'utf-8');
          if (!contents.includes('{"key":"key2","val":"value2"}')) {
            throw new Error('Expected value not found in file');
          }
          fs.unlinkSync(file);
          done();
        });
      });
    });
  });
});