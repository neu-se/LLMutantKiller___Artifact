import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty database', function () {
  it('should handle empty lines in the database file', function (done) {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '{"key":"x","val":"y"}\n\n{"key":"p","val":"q"}\n');
    const db = new Dirty(filePath);
    db.on('load', (length: number) => {
      if (length !== 2) {
        throw new Error('Length is not 2');
      }
      if (db.get('x') !== 'y') {
        throw new Error('Value for key "x" is not "y"');
      }
      if (db.get('p') !== 'q') {
        throw new Error('Value for key "p" is not "q"');
      }
      fs.unlinkSync(filePath);
      done();
    });
    db.on('error', (err: any) => {
      throw new Error('Error event emitted');
    });
  });
});