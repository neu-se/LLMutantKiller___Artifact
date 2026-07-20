import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit "drain" event after writing data to the file', (done) => {
    const filePath = path.join(__dirname, 'test.db');
    const dirty = new Dirty(filePath);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          rimraf.sync(filePath);
          done();
        });
      });
    });
  });
});