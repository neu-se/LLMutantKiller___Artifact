import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should wait for pending writes to finish before closing streams', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value', () => {
        db.set('key2', 'value2', () => {
          db.close();
          setTimeout(() => {
            try {
              fs.accessSync(file);
              done();
            } catch (err) {
              done(new Error('Write stream was not closed'));
            }
          }, 100);
        });
      });
    });
  });
});