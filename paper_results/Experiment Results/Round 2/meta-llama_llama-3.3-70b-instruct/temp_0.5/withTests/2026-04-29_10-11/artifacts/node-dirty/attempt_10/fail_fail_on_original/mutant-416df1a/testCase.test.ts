import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty database error handling', () => {
  it('should call the callback with an error when writing to disk fails and a callback is not present in the original code, but is present in the mutated code', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      // Make the write stream fail by making the file unwritable
      fs.chmodSync(filePath, 0o444);

      db.on('error', (err) => {
        expect(err).toBeInstanceOf(Error);
        fs.chmodSync(filePath, 0o644);
        done();
      });

      db.set('key', 'value');
    });
  });
});