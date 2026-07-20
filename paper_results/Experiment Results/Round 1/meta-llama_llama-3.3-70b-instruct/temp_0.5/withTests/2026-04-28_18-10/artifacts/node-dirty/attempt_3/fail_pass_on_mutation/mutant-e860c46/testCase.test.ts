import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db close', () => {
  it('should wait for pending writes to finish before closing', (done) => {
    const tmpPath = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpPath);

    db.on('load', () => {
      db.set('key', 'value', () => {
        db.set('key2', 'value2');
        db.once('drain', () => {
          db.close();
          db.on('write_close', () => {
            done();
          });
        });
      });
    });
  });
});