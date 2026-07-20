import { Dirty } from '../../../lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

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
              // File should not be writable after close
              done();
            } else {
              done(new Error('Write stream not properly closed'));
            }
          });
        });
      });
    });
  });
});