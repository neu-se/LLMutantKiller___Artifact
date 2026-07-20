import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';

describe('Dirty close behavior', () => {
  it('should close the db file streams after drain event', (done) => {
    const tmpPath = path.join(__dirname, 'tmp');
    rimraf.sync(tmpPath);
    fs.mkdirSync(tmpPath);

    const file = path.join(tmpPath, 'close.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          try {
            fs.accessSync(file, fs.constants.W_OK);
            throw new Error('File should be closed');
          } catch (err) {
            if (err.code !== 'EACCES') {
              throw err;
            }
            done();
          }
        });
      });
    });
  });
});