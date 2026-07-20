import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty db', function () {
  it('should flush after write to disk', function (done) {
    const db = new Dirty('test.dirty');
    db.set('foo', 'bar');
    db.on('drain', () => {
      db.set('foo2', 'bar2');
      db.on('drain', () => {
        db.close();
        const db2 = new Dirty('test.dirty');
        db2.on('load', (length) => {
          if (length !== 2 || db2.get('foo') !== 'bar' || db2.get('foo2') !== 'bar2') {
            throw new Error('Flush failed');
          }
          db2.close();
          fs.unlink('test.dirty', () => {
            done();
          });
        });
      });
    });
  });
});