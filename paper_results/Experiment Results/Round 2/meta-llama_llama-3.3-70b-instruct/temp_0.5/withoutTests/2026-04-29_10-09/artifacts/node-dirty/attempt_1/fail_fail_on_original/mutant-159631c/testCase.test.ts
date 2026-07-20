import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import rimraf from 'rimraf';

describe('Dirty', () => {
  it('should emit "read_close" event when read stream is closed', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('read_close', () => {
      done();
    });
    dirty.on('load', () => {
      dirty.close();
    });
    dirty.on('error', (err) => {
      done.fail(err);
    });
  });
});