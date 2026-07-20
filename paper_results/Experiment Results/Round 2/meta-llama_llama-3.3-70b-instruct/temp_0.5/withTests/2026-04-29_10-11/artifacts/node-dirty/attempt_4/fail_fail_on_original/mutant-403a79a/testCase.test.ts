import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit an error with a specific message when encountering an empty line', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.on('error', (err) => {
        if (err.message.includes('Empty lines never appear in a healthy database')) {
          fs.unlinkSync(filePath);
          done();
        } else if (err.message === '') {
          assert.fail('Expected error message to not be empty');
        } else {
          assert.fail('Expected error message "Empty lines never appear in a healthy database"');
        }
      });

      fs.appendFileSync(filePath, '{}\n\n');
    });
  });
});