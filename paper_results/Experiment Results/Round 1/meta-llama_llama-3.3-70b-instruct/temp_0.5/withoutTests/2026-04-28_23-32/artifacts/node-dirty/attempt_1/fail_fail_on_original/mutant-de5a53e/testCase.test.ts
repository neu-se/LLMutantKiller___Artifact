import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import rimraf from 'rimraf';
import { tmpdir } from 'os';

describe('Dirty', () => {
  it('should close write stream correctly', (done) => {
    const path = `${tmpdir()}/test-dirty.db`;
    const dirty = new Dirty(path);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.close();
        dirty.on('write_close', () => {
          fs.access(path, fs.constants.W_OK, (err) => {
            if (err) {
              // file should be closed and not writable
              done();
            } else {
              // file should be closed and not writable
              done(new Error('File is still writable after close'));
            }
          });
        });
      });
    });
  });
});