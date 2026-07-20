import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', () => {
  it('should not load empty lines', (done) => {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    fs.writeFileSync(tmpFile, '\n{"key":"x","val":"y"}\n');
    const dbWithFile = new Dirty(tmpFile);
    dbWithFile.on('load', (size) => {
      expect(size).toBe(1);
      fs.unlinkSync(tmpFile);
      done();
    });
  });
});