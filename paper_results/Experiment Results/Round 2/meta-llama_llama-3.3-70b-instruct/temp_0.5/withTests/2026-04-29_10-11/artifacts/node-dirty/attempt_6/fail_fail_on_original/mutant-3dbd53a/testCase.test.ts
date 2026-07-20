import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write to disk with correct encoding', (done) => {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.set('key', 'value');
    db.on('drain', () => {
      const contents = fs.readFileSync(file, 'utf-8');
      try {
        const json = JSON.parse(contents);
        if (json.key !== 'key' || json.val !== 'value') {
          throw new Error('Encoding is not utf-8');
        }
      } catch (e) {
        throw new Error('Encoding is not utf-8');
      }
      done();
    });
  });
});