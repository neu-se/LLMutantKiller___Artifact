import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty database error handling', () => {
  it('should emit error when writing to disk fails and callbacks are present', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      // Make the write stream fail by making the file unwritable
      fs.chmodSync(filePath, 0o444);

      db.set('key', 'value', (err) => {
        // Restore the file permissions
        fs.chmodSync(filePath, 0o644);

        // Check if the error was emitted
        db.once('error', (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });

        // Trigger the error emission
        db._flush();
      });
    });
  });
});