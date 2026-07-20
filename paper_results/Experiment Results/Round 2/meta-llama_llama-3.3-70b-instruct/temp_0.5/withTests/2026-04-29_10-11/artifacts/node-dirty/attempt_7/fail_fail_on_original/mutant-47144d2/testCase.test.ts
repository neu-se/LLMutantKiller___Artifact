import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', () => {
  it('should load file with empty lines and have size 2', (done) => {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    fs.writeFileSync(tmpFile, '\n{"key":"x","val":"y"}\n');
    const dbWithFile = new Dirty(tmpFile);
    dbWithFile.on('load', (size: number) => {
      expect(size).toBe(2);
      fs.unlinkSync(tmpFile);
      done();
    });
  });
});