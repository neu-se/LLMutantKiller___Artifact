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
          setTimeout(() => {
            fs.access(path, fs.constants.W_OK, (err) => {
              if (err) {
                // file should be closed
                done();
              } else {
                // file should not be writable after close, but it is
                fs.open(path, 'a', (err, fd) => {
                  if (err) {
                    // file should not be writable after close
                    done();
                  } else {
                    fs.close(fd, () => {
                      // file should not be writable after close, but it is
                      done(new Error('File is still writable after close'));
                    });
                  }
                });
              }
            });
          }, 100);
        });
      });
    });

    dirty.on('error', (err) => {
      done(new Error('Error occurred during test: ' + err.message));
    });
  }, 10000);
});