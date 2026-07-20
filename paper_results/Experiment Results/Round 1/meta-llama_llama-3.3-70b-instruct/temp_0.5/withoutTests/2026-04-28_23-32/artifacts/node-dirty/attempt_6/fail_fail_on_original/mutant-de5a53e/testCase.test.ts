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
          fs.open(path, 'a', (err, fd) => {
            if (err) {
              // file should be closed
              done();
            } else {
              fs.fsync(fd, (err) => {
                if (err) {
                  // file should be closed
                  fs.close(fd, () => {
                    done();
                  });
                } else {
                  // file should not be writable after close, but it is
                  fs.close(fd, () => {
                    done(new Error('File is still writable after close'));
                  });
                }
              });
            }
          });
        });
      });
    });
  });
});