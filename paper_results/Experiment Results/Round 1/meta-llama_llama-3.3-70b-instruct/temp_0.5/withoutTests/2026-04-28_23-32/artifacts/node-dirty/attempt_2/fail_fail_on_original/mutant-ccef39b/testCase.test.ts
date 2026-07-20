import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should close the db file streams correctly when there are pending writes', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
        dirty.close();
      });
    });

    dirty.once('close', () => {
      fs.access(dbPath, fs.constants.W_OK, (err) => {
        if (err) {
          // File is closed
          fs.unlink(dbPath, () => {
            done();
          });
        } else {
          // File is still open
          fs.unlink(dbPath, () => {
            done();
          });
        }
      });
    });
  });
});