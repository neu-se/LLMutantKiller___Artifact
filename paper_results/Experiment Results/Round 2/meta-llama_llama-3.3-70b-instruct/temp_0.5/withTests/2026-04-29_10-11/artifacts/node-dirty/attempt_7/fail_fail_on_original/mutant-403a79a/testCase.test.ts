import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit an error when encountering an empty line', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.on('error', (err) => {
        if (err.message) {
          fs.unlinkSync(filePath);
          done();
        } else {
          assert.fail('Expected error message to not be empty');
        }
      });

      fs.appendFileSync(filePath, '{}\n\n');
    });
  });
});