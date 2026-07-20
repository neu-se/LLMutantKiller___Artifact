import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should close streams when there are no pending writes', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value', () => {
        db.once('drain', () => {
          db.close();
          db.on('write_close', () => {
            try {
              fs.accessSync(file);
              done(new Error('Write stream was not closed'));
            } catch (err) {
              done();
            }
          });
        });
      });
    });
  });
});