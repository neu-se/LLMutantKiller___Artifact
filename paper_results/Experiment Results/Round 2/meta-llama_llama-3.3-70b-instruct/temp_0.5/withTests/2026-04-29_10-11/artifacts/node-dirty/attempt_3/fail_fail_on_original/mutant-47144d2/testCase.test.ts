import { Dirty } from "../../../../../../lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', () => {
  it('should emit error for empty lines', (done) => {
    const db = new Dirty();
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    fs.writeFileSync(tmpFile, '\n{"key":"x","val":"y"}\n');
    const dbWithFile = new Dirty(tmpFile);
    dbWithFile.on('load', () => {
      dbWithFile.on('error', (err: any) => {
        fs.unlinkSync(tmpFile);
        expect(err.message).toBe('Empty lines never appear in a healthy database');
        done();
      });
    });
  });
});