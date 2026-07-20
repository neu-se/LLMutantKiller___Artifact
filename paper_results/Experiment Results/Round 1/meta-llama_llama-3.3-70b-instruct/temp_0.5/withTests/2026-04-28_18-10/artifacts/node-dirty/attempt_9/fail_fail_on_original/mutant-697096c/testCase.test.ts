import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty database', () => {
  it('should handle empty lines in the database file', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    fs.writeFileSync(filePath, '{"key":"x","val":"y"}\n\n{"key":"p","val":"q"}\n');
    const db = new Dirty(filePath);

    db.on('error', (err) => {
      if (err.message === 'Empty lines never appear in a healthy database') {
        throw new Error('Expected no error');
      }
    });

    db.on('load', (length) => {
      if (length !== 2) {
        throw new Error('Expected length to be 2');
      }
      if (db.get('x') !== 'y') {
        throw new Error('Expected value of x to be y');
      }
      if (db.get('p') !== 'q') {
        throw new Error('Expected value of p to be q');
      }
      fs.unlinkSync(filePath);
      done();
    });
  });
});