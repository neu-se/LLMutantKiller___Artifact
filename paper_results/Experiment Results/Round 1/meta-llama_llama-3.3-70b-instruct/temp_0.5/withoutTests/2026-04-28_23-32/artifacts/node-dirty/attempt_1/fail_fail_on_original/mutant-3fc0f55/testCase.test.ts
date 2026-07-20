import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty class', () => {
  it('should emit drain event after writing to file', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key', 'value', () => {
        dirty.on('drain', () => {
          fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) {
              done(err);
            } else {
              expect(data).toBe('{"key":"key","val":"value"}\n');
              rimraf.sync(dbPath);
              done();
            }
          });
        });
      });
    });
  });
});