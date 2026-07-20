import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not load corrupted rows', (done) => {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    fs.writeFileSync(tmpFile, '{"key":"x"}\n{"key":"y"}\nStryker was here!\n');
    const db = new Dirty(tmpFile);
    db.on('load', (size) => {
      expect(size).toBe(2);
      done();
    });
    db.on('error', (err) => {
      done.fail(err);
    });
  });
});