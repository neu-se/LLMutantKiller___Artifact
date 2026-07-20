import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import { mkdirSync } from 'fs';
import { join } from 'path';

describe('Dirty db', function () {
  it('should close correctly', function (done) {
    const tmpDir = join(__dirname, 'tmp');
    mkdirSync(tmpDir);
    const file = join(tmpDir, 'test.dirty');
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          rimraf(tmpDir, () => {
            done();
          });
        });
      });
    });
  });
});