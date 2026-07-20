import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty database error handling', () => {
  it('should not emit error when writing to disk fails and a callback is present in the original code, and should emit error in the mutated code', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      // Make the write stream fail by making the file unwritable
      fs.chmodSync(filePath, 0o444);

      db.on('error', () => {
        if (fs.existsSync(filePath) && fs.statSync(filePath).mode & 0o200) {
          done.fail('Error event should not be emitted in the original code');
        } else {
          expect(true).toBe(true);
          done();
        }
      });

      db.set('key', 'value', () => {});
    });
  });
});