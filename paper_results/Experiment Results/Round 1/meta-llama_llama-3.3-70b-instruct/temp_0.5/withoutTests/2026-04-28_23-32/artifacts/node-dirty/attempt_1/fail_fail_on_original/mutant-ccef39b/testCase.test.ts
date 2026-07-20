import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should close the db file streams correctly when there are pending writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.set('key', 'value', () => {
      dirty.close();
    });

    dirty.once('drain', () => {
      dirty.close();
    });

    dirty.once('close', () => {
      fs.access(dbPath, fs.constants.W_OK, (err) => {
        if (err) {
          // File is closed
          rimraf.sync(dbPath);
          done();
        } else {
          // File is still open
          done(new Error('File is still open'));
        }
      });
    });
  });
});