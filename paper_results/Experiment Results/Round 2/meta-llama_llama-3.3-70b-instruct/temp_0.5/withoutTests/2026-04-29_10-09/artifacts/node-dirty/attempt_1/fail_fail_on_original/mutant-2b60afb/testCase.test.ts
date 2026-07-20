import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit drain event when queue is empty', (done) => {
    const path = 'test.db';
    const dirty = new Dirty(path);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          rimraf.sync(path);
          done();
        });
      });
    });
  });
});