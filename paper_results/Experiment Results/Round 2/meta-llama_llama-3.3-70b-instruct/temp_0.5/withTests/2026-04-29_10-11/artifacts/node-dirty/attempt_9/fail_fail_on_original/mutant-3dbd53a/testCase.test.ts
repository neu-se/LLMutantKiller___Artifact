import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write to disk with correct encoding', (done) => {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.set('key', 'value');
    db.on('drain', () => {
      const stats = fs.statSync(file);
      if (stats.size === 0) {
        throw new Error('File is empty');
      }
      done();
    });
  });
});