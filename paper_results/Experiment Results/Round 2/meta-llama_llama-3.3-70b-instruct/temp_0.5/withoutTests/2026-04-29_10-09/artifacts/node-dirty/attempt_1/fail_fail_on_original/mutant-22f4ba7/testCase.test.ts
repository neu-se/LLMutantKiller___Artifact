import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';

describe('Dirty', () => {
  it('should close the file streams when close is called', (done) => {
    const filePath = 'test.db';
    const dirty = new Dirty(filePath);

    dirty.set('key', 'value', () => {
      dirty.close();

      // Wait for the 'drain' event to ensure the close operation is complete
      dirty.once('drain', () => {
        // Check if the file is still open
        fs.fstatSync(fs.openSync(filePath, 'r')).fd.should.be.undefined;
        done();
      });
    });
  });
});