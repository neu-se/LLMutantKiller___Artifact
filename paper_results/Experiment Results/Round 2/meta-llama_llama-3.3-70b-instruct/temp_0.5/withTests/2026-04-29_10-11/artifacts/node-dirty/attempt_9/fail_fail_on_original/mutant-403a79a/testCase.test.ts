import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit an error with a specific message when encountering an empty line', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.on('error', (err) => {
        if (err.message === 'Empty lines never appear in a healthy database') {
          fs.unlinkSync(filePath);
          done();
        } else {
          assert.fail('Expected error message "Empty lines never appear in a healthy database"');
        }
      });

      fs.appendFileSync(filePath, '\n');
    });
  });
});