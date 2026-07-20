import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import { promises as fsp } from 'fs';
import { join } from 'path';

describe('dirty', function () {
  it('should emit drain event after write and flush', async function (done) {
    const file = join(__dirname, 'test.dirty');
    const db = new Dirty(file);

    db.set('key', 'value');
    db.set('key2', 'value2');

    db.on('drain', () => {
      db.close();
      rimraf(file, () => {
        done();
      });
    });

    db.on('load', () => {
      db.set('key3', 'value3');
    });
  });
});