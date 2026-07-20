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
          fs.fstat(path, (err, stats) => {
            if (err) {
              done(new Error('File not found after close'));
            } else {
              // check if the file is still open
              fs.ftruncate(path, stats.size, (err) => {
                if (err) {
                  // file should be closed
                  done();
                } else {
                  // file should be closed, but it's not
                  fs.unlinkSync(path);
                  done(new Error('File is still open after close'));
                }
              });
            }
          });
        });
      });
    });
  });
});