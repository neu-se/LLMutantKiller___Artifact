import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db close', () => {
  it('should throw an error when trying to close with pending writes', (done) => {
    const tmpPath = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpPath);

    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2', () => {
        db.close();
        db.on('error', (err) => {
          done();
        });
      });
    });
  });
});