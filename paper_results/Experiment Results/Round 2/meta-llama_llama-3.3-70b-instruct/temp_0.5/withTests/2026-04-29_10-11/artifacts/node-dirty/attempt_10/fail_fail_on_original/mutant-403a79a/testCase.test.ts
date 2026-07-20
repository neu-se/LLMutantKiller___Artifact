import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not emit an error with an empty message when encountering an empty line', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.on('error', (err) => {
        if (err.message === '') {
          assert.fail('Error message should not be empty');
        } else {
          fs.unlinkSync(filePath);
          done();
        }
      });

      fs.appendFileSync(filePath, '\n');
    });
  });
});