import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db close', () => {
  it('should close db file streams when there are no pending writes', (done) => {
    const tmpPath = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpPath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          fs.access(tmpPath, fs.constants.W_OK, (err) => {
            if (err) {
              done();
            } else {
              done(new Error('File is still writable after close'));
            }
          });
        });
      });
    });
  });
});