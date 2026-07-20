import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', function () {
  it('should not close streams immediately when close is called with pending writes', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.close();
      db.on('write_close', () => {
        done(new Error('Write stream was closed too early'));
      });
      setTimeout(() => {
        done();
      }, 100);
    });
  });
});