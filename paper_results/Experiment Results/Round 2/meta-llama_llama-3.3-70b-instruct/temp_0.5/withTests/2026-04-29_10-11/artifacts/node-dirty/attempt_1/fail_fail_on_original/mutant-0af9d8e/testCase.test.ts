import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import { promises as fs } from 'fs';

describe('dirty db', function () {
  it('should not emit drain when there are in-flight writes', async function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        // This should not be called immediately
        db.set('key2', 'value2', () => {
          db.on('drain', () => {
            fs.unlink(file).then(() => done());
          });
        });
      });
    });
  });
});