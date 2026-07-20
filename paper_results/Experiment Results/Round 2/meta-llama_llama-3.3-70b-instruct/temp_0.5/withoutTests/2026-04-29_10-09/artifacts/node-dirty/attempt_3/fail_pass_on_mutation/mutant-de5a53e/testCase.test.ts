import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should close the write stream properly', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.close();
        dirty.on('write_close', () => {
          fs.open(dbPath, 'r+', (err, fd) => {
            if (err) {
              done();
            } else {
              fs.fstat(fd, (err, stats) => {
                if (err) {
                  fs.close(fd, () => done(err));
                } else {
                  fs.close(fd, () => done());
                }
              });
            }
          });
        });
      });
    });
  });
});