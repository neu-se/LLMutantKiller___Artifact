import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should not throw an error when closing and then trying to read from the file', (done) => {
    const tempFile = 'temp-test-file.txt';
    fs.writeFileSync(tempFile, 'test');
    const dirty = new Dirty(tempFile);

    dirty.on('load', () => {
      dirty.close();
      try {
        fs.readFileSync(tempFile);
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});