import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should destroy the read stream when closing', (done) => {
    const tempFile = 'temp-test-file.txt';
    const dirty = new Dirty(tempFile);

    dirty.on('load', () => {
      dirty.close();
      fs.unlink(tempFile, (err) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
  });
});