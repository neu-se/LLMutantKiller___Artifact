import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit error event with a string when empty line is encountered', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('error', (err) => {
      if (err instanceof Error && err.message === 'Empty lines never appear in a healthy database') {
        fs.unlinkSync(filePath);
        done();
      } else {
        fs.unlinkSync(filePath);
        done(new Error('Expected error to be an instance of Error'));
      }
    });
    fs.appendFileSync(filePath, '\n');
  });
});