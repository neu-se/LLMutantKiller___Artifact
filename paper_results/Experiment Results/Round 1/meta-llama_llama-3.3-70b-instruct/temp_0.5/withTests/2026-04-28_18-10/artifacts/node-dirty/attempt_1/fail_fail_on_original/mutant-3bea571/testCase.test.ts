import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit error event when empty line is encountered', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.on('error', (err) => {
        fs.unlinkSync(filePath);
        done();
      });
      fs.appendFileSync(filePath, '\n');
    });
  });
});