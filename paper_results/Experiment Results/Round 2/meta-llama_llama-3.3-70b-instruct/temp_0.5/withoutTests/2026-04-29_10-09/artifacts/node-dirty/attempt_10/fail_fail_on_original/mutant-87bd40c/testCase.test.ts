import { Dirty } from "../../../lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit read_close event after closing', (done) => {
    const tempFile = 'temp-test-file.txt';
    fs.writeFileSync(tempFile, 'test');
    const dirty = new Dirty(tempFile);

    dirty.on('load', () => {
      dirty.close();
      dirty.on('read_close', () => {
        done();
      });
    });
  });
});