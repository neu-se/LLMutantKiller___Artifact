import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit an error with a message when encountering an empty line', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.on('error', (err) => {
        fs.unlinkSync(filePath);
        assert.ok(err.message);
        done();
      });

      fs.appendFileSync(filePath, '\n');
    });
  });
});