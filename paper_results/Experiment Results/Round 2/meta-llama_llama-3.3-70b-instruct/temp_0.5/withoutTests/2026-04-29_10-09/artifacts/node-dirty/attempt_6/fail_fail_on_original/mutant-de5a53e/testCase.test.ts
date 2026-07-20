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
          fs.access(dbPath, fs.constants.W_OK, (err) => {
            if (err) {
              done();
            } else {
              fs.appendFile(dbPath, 'test', (err) => {
                if (err) {
                  done();
                } else {
                  done(new Error('Write stream not properly closed'));
                }
              });
            }
          });
        });
      });
    });
  });
});