import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', () => {
  it('should not emit error for empty lines in mutated code', (done) => {
    const db = new Dirty();
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    fs.writeFileSync(tmpFile, '\n{"key":"x","val":"y"}\n');
    const dbWithFile = new Dirty(tmpFile);
    dbWithFile.on('load', () => {
      dbWithFile.on('error', (err) => {
        fs.unlinkSync(tmpFile);
        done.fail('Error should not be emitted for empty lines in mutated code');
      });
      done();
    });
  });
});