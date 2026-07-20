import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';
import { promises as fsp } from 'fs';

describe('dirty api', function () {
  it('should fire drain event after write', async function (done) {
    const file = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(file);

    db.set('key', 'value');
    db.on('drain', () => {
      db.close();
      fsp.unlink(file).then(() => {
        done();
      });
    });
  });
});