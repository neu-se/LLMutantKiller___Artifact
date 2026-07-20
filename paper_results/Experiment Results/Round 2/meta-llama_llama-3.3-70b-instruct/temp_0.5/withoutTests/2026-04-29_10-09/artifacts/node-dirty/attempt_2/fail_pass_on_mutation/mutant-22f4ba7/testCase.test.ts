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

      // Wait for the 'write_close' event to ensure the write stream is closed
      dirty.once('write_close', () => {
        // Check if the write stream is closed
        setTimeout(() => {
          try {
            fs.accessSync(filePath, fs.constants.W_OK);
            done.fail('Write stream is not closed');
          } catch (err) {
            done();
          }
        }, 100);
      });
    });
  });
});