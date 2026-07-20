import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty db', function () {
  it('should flush after write to disk', function (done) {
    const filename = 'test.dirty';
    try {
      fs.unlinkSync(filename);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw err;
      }
    }
    const db = new Dirty(filename);
    db.on('error', (err) => {
      throw err;
    });
    db.set('foo', 'bar');
    db.on('drain', () => {
      db.set('foo2', 'bar2');
      db.on('drain', () => {
        db.close();
        setTimeout(() => {
          const db2 = new Dirty(filename);
          db2.on('error', (err) => {
            throw err;
          });
          db2.on('load', (length) => {
            if (length !== 2 || db2.get('foo') !== 'bar' || db2.get('foo2') !== 'bar2') {
              throw new Error('Flush failed');
            }
            db2.close();
            fs.unlink(filename, () => {
              done();
            });
          });
        }, 100);
      });
    });
  }, 20000);
});