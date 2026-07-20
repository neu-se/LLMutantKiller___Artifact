import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', () => {
  it('should emit an error when loading a file with empty lines', (done) => {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    fs.writeFileSync(tmpFile, '\n{"key":"x","val":"y"}\n');
    const dbWithFile = new Dirty(tmpFile);
    dbWithFile.on('load', () => {
      done.fail('Expected an error to be emitted');
    });
    dbWithFile.on('error', (err: any) => {
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      fs.unlinkSync(tmpFile);
      done();
    });
  });
});