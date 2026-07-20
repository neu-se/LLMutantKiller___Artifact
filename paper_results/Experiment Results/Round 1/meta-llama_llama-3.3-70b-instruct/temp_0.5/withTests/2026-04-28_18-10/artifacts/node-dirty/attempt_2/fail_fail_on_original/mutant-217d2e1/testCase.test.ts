import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit an error when loading corrupted rows', (done) => {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    fs.writeFileSync(tmpFile, '{"key":"x"}\n{"key":"y"}\nStryker was here!\n');
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      done.fail('Expected an error to be emitted');
    });
    db.on('error', (err) => {
      if (err.message.includes('Could not load corrupted row')) {
        done();
      } else {
        done.fail('Expected an error with a specific message');
      }
    });
  });
});