import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { tmpdir } from 'os';

describe('Dirty', () => {
  it('should close write stream correctly', (done) => {
    const path = `${tmpdir()}/test-dirty.db`;
    const dirty = new Dirty(path);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.close();
        dirty.on('write_close', () => {
          fs.open(path, 'r+', (err, fd) => {
            if (err) {
              // file should be closed
              done();
            } else {
              fs.ftruncate(fd, 0, (err) => {
                fs.close(fd, (err) => {
                  if (err) {
                    // file should be closed
                    done();
                  } else {
                    // file should be closed, but it's not
                    done(new Error('File is still open after close'));
                  }
                });
              });
            }
          });
        });
      });
    });
  });
});