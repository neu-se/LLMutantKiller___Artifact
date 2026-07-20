import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty database error handling', () => {
  it('should not emit error when writing to disk fails and a callback is present in the original code', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      // Make the write stream fail by making the file unwritable
      fs.chmodSync(filePath, 0o444);

      db.on('error', () => {
        done.fail('Error event should not be emitted in the original code');
      });

      db.set('key', 'value', () => {
        fs.chmodSync(filePath, 0o644);
        done();
      });
    });
  });
});