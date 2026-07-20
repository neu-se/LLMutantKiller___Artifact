import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty database error handling', () => {
  it('should emit error when writing to disk fails and no callbacks are present', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      // Make the write stream fail by making the file unwritable
      fs.chmodSync(filePath, 0o444);

      db.on('error', (err) => {
        expect(err).toBeInstanceOf(Error);
        done();
      });

      db.set('key', 'value');
    });
  });
});